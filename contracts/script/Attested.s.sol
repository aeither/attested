// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {AttestEd} from "../src/Attested.sol";

contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Deploy AttestEd
        AttestEd attestEd = new AttestEd();
        console.log("AttestEd deployed at:", address(attestEd));

        // Add initial reviewers
        address[] memory reviewers = new address[](3);
        reviewers[0] = 0x1234567890123456789012345678901234567890;
        reviewers[1] = 0x2345678901234567890123456789012345678901;
        reviewers[2] = 0x3456789012345678901234567890123456789012;

        for (uint256 i = 0; i < reviewers.length; i++) {
            attestEd.addReviewer(reviewers[i]);
            console.log("Added reviewer:", reviewers[i]);
        }

        // Create initial skill
        attestEd.createSkill("Solidity Development", "Advanced smart contract development", 3);
        console.log("Initial skill created");

        vm.stopBroadcast();
    }
}
