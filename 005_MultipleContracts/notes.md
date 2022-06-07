# 005_MultipleContracts

- here we are appending a new contract called "StorageFactory.sol" 
- we are using part of the contract from the last lesson as well in a contract called "SimpleStorage.sol"


## Importing 

- one way we could import a new contract is just by literally having two `contract` keywords in a file, but that would be the same as putting all python functions in something like a `main.py` file -- kinda dirty

- the better way to do it is with a simple `import` statement which you will see at the top of StorageFactory.sol

    - essentially the code is `import [contract location] and then you can use the contract name (i.e. SimpleStorage) to refer to that type
    
        - each solidity file can have it's own version of solidity even if imported
        

## StorageFactory.sol

- note that you need the abi and address to work with other other smart contracts

    - in this contract, we save the addresses as an array and then work with the contract using the index, so essentially we can manage a bunch of contracts with one contract
    
## ExtraStorage.sol

- using "is [ContractName]" after declaring a new function essentially just copies the function over at the beginning (i.e. inheritance)
    - but what if we don't like a function in the initial contract
    - lets say we don't like the `store` function and we want to add `5` to whatever input is given
        - we can use keywords called `virtual` and `override` to fix this
        
        - `virtual` basically makes a function in the original contract editable by other contracts inheriting it
        - `override` allows the contract inheriting it to tell the function that it is indeed overwriting it
            - both of these need to be used in conjunction to work -- `virtual` on the original contract function and `override` on the inheriting contract function with the same name
        
        - you can see how these work in the contract `ExtraStorage.sol` and in the `store` function in `SimpleStorage.sol`
    