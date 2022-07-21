# 015_Lesson13_HardhatDefiAndAave

-   defi has room to grow (at least patrick thinks)

-   [defi lama](https://defillama.com/) is a good resource to see how much value is in defi

-   Aave is one of the biggest organizations, along with MakerDAO

    ## Interacting With Aave

    -   our goals are the following:
        1. deposit collateral
        2. Borrow another asset: DAI
        3. Repay the DAI
    -   to start we make a new file called `aaveBorrow.js` in `./scripts` directory

    -   we setup a normal `main` function:

        ```js
        const main = async () => {};

        main()
        	.then(() => {
        		console.log("running...");
        		process.exit(0);
        	})
        	.catch((err) => {
        		console.error(err);
        		process.exit(1);
        	});
        ```

    -   to make life easier, Aave treats everything that interacts with it as an ERC-20 token, which is kind of a problem because we are starting with ETH, which isn't an ERC-20 token (it's an L1)

        -   to solve this problem, many defi protocols send your `ETH` through a gateway to transform it into `WETH` or `Wrapped Ethereum`, which IS an ERC-20 token

        -   in our tutorial, we are going to skip using the gateway and just get the `WETH` directly to use as collateral

    ## ./scripts/GetWeth.js

    -   the `WETH` contract address on Rinkeby is: `0xc778417e063141139fce010982780140aa0cd5ab` which you can see on [rinkeby etherscan](https://rinkeby.etherscan.io/token/0xc778417e063141139fce010982780140aa0cd5ab)

    -   you can see the functions in this contract and interact with them by going to the contract section and writing to the deposit function
        -   make sure you import the token if you don't see weth in your wallet (metamask)

    <br>

    > **always remember that to interact with a smart contract you need an ABI & ADDRESS**

    -   so to interact with the `WETH` contract, we need to get the ABI and address of the contract

    -   in this video, patrick, without explanation, just grabbed a interface instead, not sure how you do this, but it works...tried to figure it out and it seems like getting an interface is harder than getting an ABI and he did this simply so you could run `hh compile` and have it be in `artifacts` folder

    -   now we are going to start here by getting the contract and using our compiled interface to interact with it:

        ```ts
        const { getNamedAccounts, ethers } = require("hardhat");

        const GetWeth = async () => {
        	const { deployer } = await getNamedAccounts();

        	// will need abi and contract address to interact with anything
        	const iWeth = await ethers.getContractAt(
        		"IWeth",
        		"0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        		deployer
        	);
        };

        module.exports = { GetWeth };
        ```

        -   we are using the actual mainnet address for the Wrapped Ether, which we will learn about in a min

    -   next we deposit an amount, and wait for that then console what we have in the deployer address (our address)

    ## MainNet Forking

    -   why we are using the actual mainnet contract address is because we can actually fork the mainnet with hardhat pretty easily

    -   forking is the process of taking the mainnet and making a copy of it locally -- we control entirely our local blockchain

        -   this doesn't mean we are going to download the whole entire chain into our local environment (that would be a ton of data)

        -   pros:
            1. quick
            2. ez
            3. resembles mainnet
        -   cons:
            1. need api
            2. some contracts are complex

    -   for this tutorial we are using the mainnet and made a new app on [alchemy](https://www.alchemy.com/)

    > just got stuck for a minute because my `hardat.config.js` was missing a few dependencies and named accounts...dear god make sure this file is complete if you are running into errors

    ## ./scripts/AaveBorrow.js

    -   now we need to work with the Aave protocol, where we will need an ABI and address to interact with the contract

    -   the contract we will be working with is the `LendingPool` contract which you can find in the [aave docs](https://docs.aave.com/developers/v/2.0/the-core-protocol/protocol-overview)

        -   you can see we actually need to get the `LendingPoolAddressProvider` to actually get the address of the contract

            -   Lending Pool Address Provider: `0xb53c1a33016b2dc2ff3653530bff1848a515c8c5`

                -   we will implement this in the `getLendingPool()` function in our `AaveBorrow.js` file

            -   we get the abi directly on the [aave website](https://docs.aave.com/developers/v/2.0/the-core-protocol/addresses-provider/ilendingpooladdressesprovider)

    -   as you can see we pull the address of the lending pool from the lendingPoolAddressProvider, but still need the interface

        ```ts
        const getLendingPool = async (account) => {
        	const lendingPoolAddressProvider = await ethers.getContractAt(
        		"ILendingPoolAddressesProvider",
        		"0xb53c1a33016b2dc2ff3653530bff1848a515c8c5",
        		account
        	);

        	const lendingPoolAddress =
        		await lendingPoolAddressProvider.getLendingPool();
        	const lendingPool = await ethers.getContractAt(
        		"ILendingPool",
        		lendingPoolAddress,
        		account
        	);

        	return lendingPool;
        };
        ```

    -   i stopped shortly after this as the process just continues

        -   one thing to note is when exchanging with something like aave, you will receieve tokens that need to be switched back in order to get your money back (u need to burn them to get your money back)
