// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.8;

import "./SimpleStorage.sol";

//info: this line "is SimpleStorage, essentially just extends ExtraStorage to have all the functionality that SimpleSotrage has, essentially all the code in SimpleStorage is now at the beginning of this contract

contract ExtraStorage is SimpleStorage {
    
    function store(uint256 _favoriteNumber) public override {
        favoriteNumber = _favoriteNumber + 5;
    }

}