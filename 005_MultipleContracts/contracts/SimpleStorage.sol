// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.8;


contract SimpleStorage {
	//info: just created a simple function here which only took part of the last lesson
	
	struct Person {
		string personName;
		uint256 personFavoriteNumber;
	}
	
	mapping(string => uint256) public nameToFavoriteNumber;
	
	Person[] public people;
	
	function newPerson(string memory _personName, uint256 _personFavoriteNumber) public {
		Person memory aPerson = Person({personName: _personName, personFavoriteNumber: _personFavoriteNumber});
		
		people.push(aPerson);
		nameToFavoriteNumber[_personName] = _personFavoriteNumber;
	}
	
	
}