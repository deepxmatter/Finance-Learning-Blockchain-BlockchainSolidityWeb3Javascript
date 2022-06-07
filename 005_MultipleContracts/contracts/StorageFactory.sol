// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.8;

import './SimpleStorage.sol';

contract StorageFactory {
    SimpleStorage[] public simpleStorageAddresses;
    
    function createSimpleStorageContract() public {
        SimpleStorage simpleStorage = new SimpleStorage();
        
        simpleStorageAddresses.push(simpleStorage);
    }
    
    function sfStore(uint256 _simpleStorageIndex, uint256 _simpleStorageNumber) public {
        simpleStorageArray[_simpleStorageIndex].store(simpleStorageNumber);
    }
    
    function sfGet(uint256 _simpleStorageIndex) public view returns (uint256) {
        return simpleStorageArray[_simpleStorageIndex].retrieve();
    }
    
}