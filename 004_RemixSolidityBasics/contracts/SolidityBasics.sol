// include license (e.g. MIT or UNLICENSED)
// SPDX-License-Identifier: UNLICENSED

//info: specifiy solidity version
pragma solidity ^0.8.8;

//info: this is a contract, each solidity file will have this and it IS the smart contract
contract SolidityBasics{
  
//#region Primitives 

  //info: you can initialize variables without specifying data:
  bool aBool;
  uint256 aUnsignedInt;
  int256 aSignedInt;
  string aString;
  address aAddress;
  // & more...


  //info: boolean
  bool hasFavoriteNumber = true;
  
  //info: unsigned integer
  uint8 favoriteNumberSmall = 8;
  uint256 favoriteNumberBig = 256;
  // uint256 is default if only specifying uint
  
  //info: string
  string favoriteNumberText = "eight";
  
  //info: ethereum address type
  address testAddress = 0x71C7656EC7ab88b098defB751B7401B5f6d8976F;
  
  //info: bytes can be anything
  bytes2 favoriteBytesSmall = "hi";
  bytes32 favoriteBytesBig = "suppers";

//#endregion Primitives

//#region Functions 
  
  //info: by adding public keyword, we will be able to see this value from the contract
  uint256 public setThisNumber;

  //info: public makes this function callable to the public
  //info: notice we use _ at start to name params to avoid confusion
  function exampleFunction(uint256 _setThisNumber) public {
    setThisNumber = _setThisNumber;
  }
  
  //info: to return a type you must specify it in the function:
  
  function returningAType() public returns(bool) {
    return true;
  }
  
  //info: if the language is still the same as when writing this, then the line above this will have a warning saying this can be made gas-free
  
  //#region GasFreeFunctions
  
    uint256 viewNumber = 5;
  
    //info: a view function modifier allows us to read state but not modify it
    function gasFreeView() public view returns(uint256) {
      return viewNumber;
    }
    
    //info: a pure function is a view function but ALSO restricts reading from the contract, so the above wouldn't work, but something like this would:
    function gasFreePure() public pure returns(uint256) {
      return 1 + 1;
    }
  
  //#endregion GasFreeFunctions

//#endregion Functions 

//#region Structs

  //info: this is essentially defining an object
  struct People {
    string personName;
    uint256 personFavoriteNumber;
  }
  
  //info: now we have an object "person"
  People public matt = People({
    personName: "Matt",
    personFavoriteNumber: 1
  });

//#endregion Structs

//#region Arrays

//info: lets use the same struct we created in the "Structs" Section (shown again below)

/*
  struct People {
    string personName;
    uint256 personFavoriteNumber;
  }
*/
 
//info: because this is public it will automatically have a getter function which takes an index (i.e. 0, 1, 2, ...)
People[] public allPeople;
//info: right now its empty, but lets add a new person

People public john = People({
  personName: "John",
  personFavoriteNumber: 2
});

//info: notice when we define this function we have to put "memory" in front of string
//info: check notes.md on this in the storage section, where each memory location is explained
//info: basically, with dynamic (non-primitive) data types, you can choose where to hold the memory (i.e. strings, arrays, etc)
//info: we use memory here because we only want the _personName variable saved during function execution -- we could also use calldata considering the name won't change and it's cheaper
//info: we are also going to introduce mappings here in a subsection which help to retrieve people with a setter and getter


  //#region Mappings
  //info: this makes it so we can actually find a favorite number based on person name
  mapping(string => uint256) public nameToFavoriteNumber;
  //info: we still have to add this to a function where we want it to work
  //#endregion Mappings
  
  
function addPerson(string memory _personName, uint256 _personFavoriteNumber) public {
  allPeople.push(People({personName: _personName, personFavoriteNumber: _personFavoriteNumber}));
  
  //info: here we initialize the mapping we created earlier
  nameToFavoriteNumber[_personName] = _personFavoriteNumber;
}




//#endregion Arrays



//#region Visibility

  //info: four visibility settings:
    //info: public: visable externally and internally (with getter function)
    //info: private: only visible in current contract
    //info: external: only visible externally (i.e. this.func)
    //info: internal: only visible internally (this contract and children contract can read this only)
    
    //info: the default is internal if you don't specify a visibility preference
    
    uint256 private privateNumber = 3;
    uint256 public publicNumber = 3;
    //info: this one defaults to internal without specification
    uint256 internalNumber = 3;

//#endregion Visibility

//#region Scope

  //info: scope in solidity works much like javascript, variables inside of functions and limited to that function and variables in the contract (basically the "Main" function) are available globally

//#endregion Scope

//#region Other

  //info: calling a function from another function may cost gas from processing power even if the function that is getting called is pure or view (i.e. a gas-free function)

//#endregion Other


}