# 007_HardHatEnvironment

- starts around **00:06:19**
    - should line up with `Lesson 5: Ethers.js Simple Storage` on the github
    - so far a toooooooooooooooooon of this is wasted time
        - only learned really about formatting extensions for solidity
        
    
    
## Node, NPM and Windows
- patrick decides to use yarn and linux (totally fine) but I'm just gonna run on Windows Git Bash and NPM (just easier than connecting remote and NPM is probably going to out-scale Yarn with Microsoft and Github Integration)

- we install `solc` -- i think the versions of solc line up with current sol compiler
    - it seems `solc` and `solc-js` are the same thing
    
- again, patrick is setting up a little different, I chose to install solc globally (which is what they suggest in documentation -- `npm i -G solc`) to use command line commands
    - in your cli, type `solcjs --help` to ensure this is in your `PATH`
    
    ## SolcJS CLI
    
    - to compile with solcjs, type:
        - `solcjs --bin --abi --include-path ./node_modules/ --base-path . -o ./output ./contracts/SimpleStorage.sol` where:
            - `--bin`               creates the binary
            - `--abi`               creates an abi
            - `--include-path`      includes your local node modules
            - `--base-path`         sets your current directory as the root of this command
            - `-o`                  sets where the files will be output
            - `SimpleStorage.sol`then finally we put what file to compile
            
    
    
## SimpleStorage.sol

- we are just copying the same `contract` from several sessions ago