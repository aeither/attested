// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AttestEd is ERC721, Ownable {
    // Custom counter implementation
    struct Counter {
        uint256 _value;
    }
    
    Counter private _tokenIds;
    
    function current(Counter storage counter) private view returns (uint256) {
        return counter._value;
    }
    
    function increment(Counter storage counter) private {
        counter._value += 1;
    }

    // Structs
    struct Skill {
        string name;
        string description;
        string evidenceUri;
        uint256 requiredAttestations;
        bool isActive;
    }

    struct Attestation {
        uint256 skillId;
        address learner;
        uint256 attestationCount;
        mapping(address => bool) attestors;
        bool isCertified;
        uint256 tokenId; // NFT token ID once certified
    }

    // State variables
    mapping(uint256 => Skill) public skills;
    mapping(address => bool) public communityReviewers;
    mapping(bytes32 => Attestation) public attestations;
    uint256 public skillCount;
    uint256 public minimumAttestations = 3;
    
    // Events
    event SkillCreated(uint256 indexed skillId, string name);
    event AttestationRequested(address indexed learner, uint256 indexed skillId);
    event AttestationProvided(address indexed attestor, address indexed learner, uint256 skillId);
    event CertificateIssued(address indexed learner, uint256 indexed tokenId, uint256 skillId);

    constructor() ERC721("AttestEd Certificate", "ATED") Ownable(msg.sender) {}

    // Modifiers
    modifier onlyReviewer() {
        require(communityReviewers[msg.sender], "Not authorized as reviewer");
        _;
    }

    // Admin functions
    function addReviewer(address reviewer) external onlyOwner {
        communityReviewers[reviewer] = true;
    }

    function removeReviewer(address reviewer) external onlyOwner {
        communityReviewers[reviewer] = false;
    }

    function createSkill(
        string memory name,
        string memory description,
        uint256 requiredAttestations
    ) external onlyOwner {
        skillCount++;
        skills[skillCount] = Skill({
            name: name,
            description: description,
            evidenceUri: "",
            requiredAttestations: requiredAttestations,
            isActive: true
        });
        
        emit SkillCreated(skillCount, name);
    }

    // Core functions
    function requestAttestation(uint256 skillId, string memory evidenceUri) external {
        require(skills[skillId].isActive, "Skill not active");
        
        bytes32 attestationId = keccak256(abi.encodePacked(msg.sender, skillId));
        Attestation storage attestation = attestations[attestationId];
        
        require(!attestation.isCertified, "Already certified");
        
        if (attestation.skillId == 0) {
            attestation.skillId = skillId;
            attestation.learner = msg.sender;
        }
        
        emit AttestationRequested(msg.sender, skillId);
    }

    function provideAttestation(address learner, uint256 skillId) external onlyReviewer {
        bytes32 attestationId = keccak256(abi.encodePacked(learner, skillId));
        Attestation storage attestation = attestations[attestationId];
        
        require(attestation.skillId == skillId, "Invalid attestation request");
        require(!attestation.attestors[msg.sender], "Already attested");
        require(!attestation.isCertified, "Already certified");
        
        attestation.attestors[msg.sender] = true;
        attestation.attestationCount++;
        
        emit AttestationProvided(msg.sender, learner, skillId);
        
        // Check if enough attestations to mint certificate
        if (attestation.attestationCount >= skills[skillId].requiredAttestations) {
            _mintCertificate(attestationId);
        }
    }

    function _mintCertificate(bytes32 attestationId) internal {
        Attestation storage attestation = attestations[attestationId];
        require(!attestation.isCertified, "Already certified");
        
        increment(_tokenIds);
        uint256 newTokenId = current(_tokenIds);
        
        _safeMint(attestation.learner, newTokenId);
        attestation.isCertified = true;
        attestation.tokenId = newTokenId;
        
        emit CertificateIssued(attestation.learner, newTokenId, attestation.skillId);
    }

    // View functions
    function getAttestationStatus(address learner, uint256 skillId) 
        external 
        view 
        returns (
            uint256 attestationCount,
            bool isCertified,
            uint256 tokenId
        ) 
    {
        bytes32 attestationId = keccak256(abi.encodePacked(learner, skillId));
        Attestation storage attestation = attestations[attestationId];
        return (
            attestation.attestationCount,
            attestation.isCertified,
            attestation.tokenId
        );
    }

    // Override required function
    function _baseURI() internal pure override returns (string memory) {
        return "https://attested.example.com/metadata/";
    }
}