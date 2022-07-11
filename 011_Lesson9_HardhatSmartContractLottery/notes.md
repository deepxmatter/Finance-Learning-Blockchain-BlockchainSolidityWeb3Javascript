# 011_Lesson9_HardhatSmartContractLottery

- here we are doing a smart contract lottery

- we are starting with a single smart contract called `Raffle.sol`

    ## Raffle.sol
    
    - remember variables starting with `i` are immutable and variables starting with `s_` are storage
    
        - if it is both immutable AND storage -- use `i_` over `s_`
        
    - remember `error` statments go at the top above the contract with the syntax: `error <ContractName>__<ErrorCode>`
    
        in our example so far: `error Raffle__NotEnoughEther` for the `Raffle.sol` contract when someone tries to buy a ticket without enough ether
        
    - we set our `i_entranceFee` in our `constructor`
    
    - notice we create `getter` functions for many of our private variables:
        ```ts
        function getEntranceFee() public view returns (uint256) {
		    return i_entranceFee;
        }
        
        function getPlayer(uint256 addressIndex) public view returns (address) {
            return s_players[addressIndex];
        }
        ```
        
    - make sure you make the appropriate contracts `payable` and notice how are array for payable players is created like: `address payable[] private storage s_players;`
    
    - we begin to add a new concept to our smart contract called events, `event` keyword is used to create these and these help front-ends understand what is going on among other things -- you can kind of think of them as a log/or trigger so that other things watching for the event can be made aware when the event is fired
    
        ### Logging and Events
        
        - the EVM generates logs -- if you run a node you could call `"eth_getLogs"` to see the logs
        
        - events allow you to print to these logs
        
        - the logs data structure cannot be accessed by smart contracts
        
        - so basically we can print information thats important to us without having to save it to a storage variable (so this saves gas)
        
        - mostly events are used by backends and frontends as they listen for an event -- once triggered, they are able to process that information and do something with it (e.g. update a front end or recalculate some data)
        
            - this is much like a front end listening for a backend to send a message off the chain
            
            - the `graph token` actually saves all this data and indexes it so that it can be accessed quickly by users
            
        - an event looks like this:
        
            ```ts
            event storedNumber(
                uint256 indexed oldNumber,
                uint256 indexed newNumber,
                uint256 addedNumber,
                uint256 sender
            );
            ```
            
            - to actually call this and store it in the logs, you call `emit storedNumber(params...)` and it will be stored in the logs
            
            - a good syntax for events is the function call reversed, 
                
                - i.e. enterRaffle() has an event fired at the end called raffleEnter()
                
        ### Chinlink VRF (Randomness) And Keepers
        
        - lets start with the Chainlink VRF (Verifiable Random Function) [here](https://docs.chain.link/docs/get-a-random-number/)
        
        - they have a sample contract that you can use to generate a random number:
        
            ```ts
            // SPDX-License-Identifier: MIT
            // An example of a consumer contract that relies on a subscription for funding.
            pragma solidity ^0.8.7;

            import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
            import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

            contract VRFv2Consumer is VRFConsumerBaseV2 {
            VRFCoordinatorV2Interface COORDINATOR;

            // Your subscription ID.
            uint64 s_subscriptionId;

            // Rinkeby coordinator. For other networks,
            // see https://docs.chain.link/docs/vrf-contracts/#configurations
            address vrfCoordinator = 0x6168499c0cFfCaCD319c818142124B7A15E857ab;

            // The gas lane to use, which specifies the maximum gas price to bump to.
            // For a list of available gas lanes on each network,
            // see https://docs.chain.link/docs/vrf-contracts/#configurations
            bytes32 keyHash = 0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc;

            // Depends on the number of requested values that you want sent to the
            // fulfillRandomWords() function. Storing each word costs about 20,000 gas,
            // so 100,000 is a safe default for this example contract. Test and adjust
            // this limit based on the network that you select, the size of the request,
            // and the processing of the callback request in the fulfillRandomWords()
            // function.
            uint32 callbackGasLimit = 100000;

            // The default is 3, but you can set this higher.
            uint16 requestConfirmations = 3;

            // For this example, retrieve 2 random values in one request.
            // Cannot exceed VRFCoordinatorV2.MAX_NUM_WORDS.
            uint32 numWords =  2;

            uint256[] public s_randomWords;
            uint256 public s_requestId;
            address s_owner;

            constructor(uint64 subscriptionId) VRFConsumerBaseV2(vrfCoordinator) {
                COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
                s_owner = msg.sender;
                s_subscriptionId = subscriptionId;
            }

            // Assumes the subscription is funded sufficiently.
            function requestRandomWords() external onlyOwner {
                // Will revert if subscription is not set and funded.
                s_requestId = COORDINATOR.requestRandomWords(
                keyHash,
                s_subscriptionId,
                requestConfirmations,
                callbackGasLimit,
                numWords
                );
            }
            
            function fulfillRandomWords(
                uint256, /* requestId */
                uint256[] memory randomWords
            ) internal override {
                s_randomWords = randomWords;
            }

            modifier onlyOwner() {
                require(msg.sender == s_owner);
                _;
            }
            }
            ```
            
        - you can use this to get started and we will be importing the chainlink contracts into our `Raffle.sol` with: 
            - `import @chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol;`
            
        - if you want to read it you can now go to your node modules and find it:
            - `./node_modules/@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol`
            
                - inside of it you will find a function called `fulfillRandomWords` which is what we are overriding in our contract
                
                - when you see the keyword `virtual` on a function, it means it EXPECTS to be overwritten
                
        
        ### Keepers
        
        - keepers allow you to automate contracts, like picking a winner based on a certain amount of money collected or time passed, etc
        
    - kinda get everything we are doing here so just silently watching at this point as opposed to writing
    
    - only part that seems odd is the VRF stuff, but I can always use the documentation to understand it later -- not really important to understanding solidity best practices