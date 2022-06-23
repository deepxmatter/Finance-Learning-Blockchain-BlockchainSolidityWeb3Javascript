// imports
const { ethers, run, network } = require("hardhat");

if (process.env.NODE_ENV !== "PROD") {
	require("dotenv").config();
}

// var
// let -> can be changed
// const -> can't be changed
// import -> const for modules
// async main
const main = async () => {
	console.log("running...");
	const SimpleStorageFactory = await ethers.getContractFactory(
		"SimpleStorage"
	);

	console.log("deploying contract...");
	const simpleStorage = await SimpleStorageFactory.deploy();
	await simpleStorage.deployed();

	console.log(`deployed contract to: ${simpleStorage.address}`);

	if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
		await simpleStorage.deployTransaction.wait(6);
		await verify(simpleStorage.address, []);
	}

	//#region GetFavoriteNumber
	const currentValue = await simpleStorage.retrieve();
	console.log(`current value is: ${currentValue}`);
	//#endregion GetFavoriteNumber

	//#region UpdateFavoriteNumber
	const transactionResponse = await simpleStorage.store("7");
	await transactionResponse.wait(1);
	const updatedValue = await simpleStorage.retrieve();
	console.log(`updated value is: ${updatedValue}`);
	//#endregion UpdateFavoriteNumber
};

const verify = async (contractAddress, args) => {
	console.log("verifying contract...");

	try {
		await run("verify:verify", {
			address: contractAddress,
			constructorArguments: args,
		});
	} catch (err) {
		if (err.message.toLowerCase().includes("already verified")) {
			console.log("contract already verified...");
		} else {
			console.error(
				`error verifying contract: ${err.message}; code: ${err.code}`
			);
		}
	}
};

// run
main()
	.then(() => {
		process.exit(0);
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
