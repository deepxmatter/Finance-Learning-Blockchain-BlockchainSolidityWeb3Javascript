// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.7;

contract FallbackExample {
    
    uint256 public result;
    
    receive() external payable {
        result = 1;
    }
    
    fallback() external payable {
        result = 2;
    }

}