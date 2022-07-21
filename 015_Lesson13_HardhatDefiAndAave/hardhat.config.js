require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-etherscan");
require("solidity-coverage");
require("hardhat-deploy");

require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: {
		compilers: [
			{ version: "0.8.8" },
			{ version: "0.6.12" },
			{ version: "0.6.6" },
			{ version: "0.4.19" },
		],
	},
	defaultNetwork: "hardhat",
	networks: {
		hardhat: {
			chainId: 31337,
			forking: {
				url: process.env.MAINNET_URL,
			},
		},
		rinkeby: {
			url: process.env.RINKEBY_URL,
			accounts: [process.env.PRIVATE_KEY],
			chainId: 4,
			blockConfirmations: 6,
		},
	},
	namedAccounts: {
		deployer: {
			default: 0, // here this will by default take the first account as deployer
			1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
		},
	},
};
