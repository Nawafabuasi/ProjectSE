// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;


contract PriceConsumerV3 {

    struct Patient {
        string name;
        uint age;
        uint id;
        uint height; // Added height attribute
    }

    mapping(address => uint256) public funders;
    mapping(uint => Patient) public patients;
    uint256 public goalusd = 50000;
    uint256 public goaleth;
    uint256 public deadline = block.timestamp + (30 days);
    uint public transactionid;
    uint256 public balanceeth;
    uint256 public donleftusd;
    uint256 public donlefteth;

    //--------------------------------------------------------------------------------------
    constructor(string memory patientName, uint patientAge, uint patientId, uint patientHeight) {
        patients[patientId] = Patient(patientName, patientAge, patientId, patientHeight);
    }

    //--------------------------------------------------------------------------------------
    // Returns the real-time value of ETH in USD

    //--------------------------------------------------------------------------------------
    // uint256 goaleth = goalusd / uint256(getLatestPrice());

    function getPatientName(uint patientId) public view returns (string memory) {
        return patients[patientId].name;
    }

    function getPatientAge(uint patientId) public view returns (uint) {
        return patients[patientId].age;
    }

    function getPatientHeight(uint patientId) public view returns (uint) {
        return patients[patientId].height;
    }

    // Additional functions and logic...
}
