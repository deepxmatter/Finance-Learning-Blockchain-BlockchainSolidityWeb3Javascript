//#region AllImports

//#region BasicImports
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ethers";
import { task } from "hardhat/config";
//#endregion BasicImports

//#region PluginImports
import "@typechain/hardhat";
import "@typechain/ethers-v5";
import "hardhat-gas-reporter";
import "solidity-coverage";
//#endregion PluginImports

//#region DotEnvSetup
if (process.env.NODE_ENV !== "PROD") {
	require("dotenv").config();
}
//#endregion DotEnvSetup

//#region TaskImports
import "./tasks/block-number";
//#endregion TaskImports

//#endregion AllImports

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task(
	"accounts",
	"Prints the list of accounts",
	async (taskArgs: any, hre: any) => {
		const accounts = await hre.ethers.getSigners();

		for (const account of accounts) {
			console.log(account.address);
		}
	}
);

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	solidity: "0.8.8",
	defaultNetwork: "hardhat",
	etherscan: {
		apiKey: process.env.ETHERSCAN_API_KEY,
	},
	networks: {
		localhost: {
			url: "http://127.0.0.1:8545",
			chainId: 31337,
		},
		rinkeby: {
			url: process.env.RINKEBY_RPC_URL,
			accounts: [process.env.PRIVATE_KEY_1],
			chainId: 4,
		},
	},
	gasReporter: {
		enabled: false,
		outputFile: "./tmp/GasReport.txt",
		noColors: true,
		currency: "USD",
		coinmarketcap: process.env.COINMARKETCAP_API_KEY,
	},
};
