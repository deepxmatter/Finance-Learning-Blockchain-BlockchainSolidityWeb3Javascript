// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.8;

import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";

error Raffle__NotEnoughEther();

contract Raffle is VRFConsumerBaseV2 {
	//#region StateVariables
	uint256 private immutable i_entranceFee;
	address payable[] private s_players;
	VRFCoordinatorV2Interface private immutable i_vrfCoordinator;
	bytes32 private immutable i_gasLane;
	//#endregion StateVariables

	//#region Events
	event raffleEnter(address indexed player);

	//#endregion Events

	constructor(
		address vrfCoordinatorV2,
		uint256 entranceFee,
		bytes32 gasLane
	) VRFConsumerBaseV2(vrfCoordinatorV2) {
		i_entranceFee = entranceFee;
		i_vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinatorV2);
		i_gasLane = gasLane;
	}

	function enterRaffle() public payable {
		if (msg.value < i_entranceFee) {
			revert Raffle__NotEnoughEther();
		}

		s_players.push(payable(msg.sender));
	}

	function requestRandomWinner() external {
        i_vrfCoordinator.requestRandomWords (
            i_gaslane,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        )
    }

	function requestRandom(uint256 requestId, uint256[] memory randomWords) internal override {}

	//#region Getters
	function getEntranceFee() public view returns (uint256) {
		return i_entranceFee;
	}

	function getPlayer(uint256 addressIndex) public view returns (address) {
		return s_players[addressIndex];
	}
	//#endregion Getters
}
