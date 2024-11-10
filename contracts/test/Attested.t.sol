// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import {AttestEd} from "../src/Attested.sol";

contract AttestEdTest is Test {
    AttestEd public attestEd;
    address public owner;
    address public reviewer1;
    address public reviewer2;
    address public reviewer3;
    address public learner;

    event SkillCreated(uint256 indexed skillId, string name);
    event AttestationRequested(address indexed learner, uint256 indexed skillId);
    event AttestationProvided(address indexed attestor, address indexed learner, uint256 skillId);
    event CertificateIssued(address indexed learner, uint256 indexed tokenId, uint256 skillId);

    function setUp() public {
        owner = address(this);
        reviewer1 = makeAddr("reviewer1");
        reviewer2 = makeAddr("reviewer2");
        reviewer3 = makeAddr("reviewer3");
        learner = makeAddr("learner");
        
        attestEd = new AttestEd();
    }

    function test_InitialState() public {
        assertEq(attestEd.skillCount(), 0);
        assertEq(attestEd.minimumAttestations(), 3);
    }

    function test_CreateSkill() public {
        vm.expectEmit(true, false, false, true);
        emit SkillCreated(1, "Solidity Development");
        
        attestEd.createSkill(
            "Solidity Development",
            "Advanced smart contract development",
            3
        );

        (string memory name, string memory description, , uint256 requiredAttestations, bool isActive) = 
            attestEd.skills(1);

        assertEq(name, "Solidity Development");
        assertEq(description, "Advanced smart contract development");
        assertEq(requiredAttestations, 3);
        assertTrue(isActive);
        assertEq(attestEd.skillCount(), 1);
    }

    function test_AddReviewer() public {
        attestEd.addReviewer(reviewer1);
        assertTrue(attestEd.communityReviewers(reviewer1));
    }

    function test_RemoveReviewer() public {
        attestEd.addReviewer(reviewer1);
        attestEd.removeReviewer(reviewer1);
        assertFalse(attestEd.communityReviewers(reviewer1));
    }

    function test_RequestAttestation() public {
        // Create skill first
        attestEd.createSkill(
            "Solidity Development",
            "Advanced smart contract development",
            3
        );

        vm.prank(learner);
        vm.expectEmit(true, true, false, true);
        emit AttestationRequested(learner, 1);
        
        attestEd.requestAttestation(1, "evidence-uri");

        (uint256 attestationCount, bool isCertified,) = attestEd.getAttestationStatus(learner, 1);
        assertEq(attestationCount, 0);
        assertFalse(isCertified);
    }

    function test_ProvideAttestation() public {
        // Setup
        attestEd.createSkill(
            "Solidity Development",
            "Advanced smart contract development",
            3
        );
        
        attestEd.addReviewer(reviewer1);
        attestEd.addReviewer(reviewer2);
        attestEd.addReviewer(reviewer3);

        vm.prank(learner);
        attestEd.requestAttestation(1, "evidence-uri");

        // First attestation
        vm.prank(reviewer1);
        vm.expectEmit(true, true, false, true);
        emit AttestationProvided(reviewer1, learner, 1);
        attestEd.provideAttestation(learner, 1);

        (uint256 attestationCount,,) = attestEd.getAttestationStatus(learner, 1);
        assertEq(attestationCount, 1);
    }

    function test_CompleteCertification() public {
        // Setup
        attestEd.createSkill(
            "Solidity Development",
            "Advanced smart contract development",
            3
        );
        
        attestEd.addReviewer(reviewer1);
        attestEd.addReviewer(reviewer2);
        attestEd.addReviewer(reviewer3);

        vm.prank(learner);
        attestEd.requestAttestation(1, "evidence-uri");

        // Provide three attestations
        vm.prank(reviewer1);
        attestEd.provideAttestation(learner, 1);
        
        vm.prank(reviewer2);
        attestEd.provideAttestation(learner, 1);
        
        vm.prank(reviewer3);
        vm.expectEmit(true, true, false, true);
        emit CertificateIssued(learner, 1, 1);
        attestEd.provideAttestation(learner, 1);

        (uint256 attestationCount, bool isCertified, uint256 tokenId) = 
            attestEd.getAttestationStatus(learner, 1);
        
        assertEq(attestationCount, 3);
        assertTrue(isCertified);
        assertEq(tokenId, 1);
        assertEq(attestEd.ownerOf(1), learner);
    }

    function testFail_RequestAttestationInvalidSkill() public {
        vm.prank(learner);
        attestEd.requestAttestation(1, "evidence-uri");
    }

    function testFail_AttestationByNonReviewer() public {
        attestEd.createSkill(
            "Solidity Development",
            "Advanced smart contract development",
            3
        );

        vm.prank(learner);
        attestEd.requestAttestation(1, "evidence-uri");

        vm.prank(makeAddr("nonReviewer"));
        attestEd.provideAttestation(learner, 1);
    }

    function testFail_DuplicateAttestation() public {
        attestEd.createSkill(
            "Solidity Development",
            "Advanced smart contract development",
            3
        );
        
        attestEd.addReviewer(reviewer1);

        vm.prank(learner);
        attestEd.requestAttestation(1, "evidence-uri");

        vm.startPrank(reviewer1);
        attestEd.provideAttestation(learner, 1);
        attestEd.provideAttestation(learner, 1); // Should fail
        vm.stopPrank();
    }

    function test_OnlyOwnerFunctions() public {
        address nonOwner = makeAddr("nonOwner");
        
        vm.startPrank(nonOwner);
        
        vm.expectRevert();
        attestEd.createSkill(
            "Solidity Development",
            "Advanced smart contract development",
            3
        );

        vm.expectRevert();
        attestEd.addReviewer(reviewer1);

        vm.expectRevert();
        attestEd.removeReviewer(reviewer1);
        
        vm.stopPrank();
    }

    receive() external payable {}
}