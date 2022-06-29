# 009_Lesson7_HardhatFundMe

- starts around **10:00:00**

- starting with a fresh advanced project (typescript version which differs from video)

- first delete the `.eslint*` files
- also delete the `.npmignore` file, as we aren't publishing to NPM

- you will also see a `.solhint.json` and `.solhintignore` file which are for a `solidity` linter

    ## Contracts

    - we are going to start by getting the contracts from [Lesson 4](https://github.com/PatrickAlphaC/fund-me-fcc)

    - as soon as you try to run, you will get an error suggesting you need to install `@chainlink/contracts`
        
        - in solidity remix, this is done automatically for you (auto importing other contracts), but we need to do it manually here
        
        - for this one, we can just do `npm install -d @chainlink/contracts`
        
            - hardhat will now know that that points to the package in our `node_modules` folder
            
            
    ## Deploying

    - writing your own deploy scripts is kind of a challenge, so instead lets use a plugin called `hardhat-deploy`

        - to install it just use `npm install -d hardhat-deploy`
        
        - import it in your `hardhat.config.ts` file
        
    - now running `npx hardhat` also gives us a bunch of new tasks like `deploy` and `flatten`
        
    - note that with `hardhat-deploy` they want you to install another superset of `ethers.js` called `hardhat-deploy-ethers`, which is a fork of `@nomiclabs/hardhat-ethers`

        - to override a package using `npm` you can do this:
        
            - `npm i -d @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers`
            
                - this basically says, take our package `@nomiclabs/hardhat-ethers` and install `hardhat-deploy-ethers` over it
        
                    - now if you go into your `package.json` you will see instead of `@nomiclabs/hardhat-ethers` pointing to a version, it's actually pointing to another package:
                        ```json
                        {
                            devDependencies: {
                                "hardhat": "^2.9.9",
                                "@nomiclabs/hardhat-ethers": "npm:hardhat-deploy-ethers@^0.3.0-beta.13",
                            }
                        }
                        ```

    - now when deploying, we can keep track of our deployments so it doesn't get messy

        
        ### Deploying with Hardhat-Deploy
        
        - we make a new folder called `deploy`
        
        - we number our deploy scripts like `01-deploy-contract.ts`
        
        - our new deploy script should take in the hardhat-runtime-environment (hre) and should be the main export:
            ```ts
            module.exports = async (hre) => {
                const { getNamedAccounts, deployments } = hre;
                const { deploy, log } = deployments;
                const { deployer } = await getNamedAccounts();
            };

            ```
            
            - named accounts refers to the section in the `hardhat.config.ts` called `namedAccounts`, which we are going to create rn
                ```json
                namedAccounts: {
                    deployer: {
                        default: 0
                    },
                }
                ```
                
            - now the deployer "namedAccount" is the account is the first listed in the `accounts` array of any network in the `hardhat.config.ts` file
           
           <br>
            
    ## Mocks
    
    - when deploying our contracts, we want to use a mock version of the blockchain (more on this hopefully because me no understand why no use local hardhat blockchain node)
    
    - we basically just create a new folder called `tests` in our contracts, where we simulate a contract
    
        ### Multiple Solidity Versions
        
        - sometimes like right now we need to compile solidity contracts that have different versions, this will continue to be the case for the foreseeable future as new versions of solidity come out
        
        - to fix this, you can update your config with more versions like so:
            ```ts
            const config: HardhatUserConfig = {
            solidity: {
                compilers:[
                {version: "0.8.8"},
                {version: "0.6.0"} 
                ]
            },
            defaultNetwork: "hardhat",
            moreOptions: "etc, etc, etc"
            }
            ```


    ##
    
    - kinda had some errors here so took an L on writing the rest of this section, just going to focus on doing better next section 
    
    - gotta revist this section starting at 11:30:00 or so because it has toooooons of info on how memory functions (assembly, opcodes, stack, heap, storage, kinda stuff, really important in terms of getting down to the nitty gritty and optimizing)