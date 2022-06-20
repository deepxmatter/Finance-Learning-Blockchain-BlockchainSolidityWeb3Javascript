const fs = require("fs-extra");
const ethers = require("ethers");

if (process.env.NODE_ENV !== "PROD") {
	require("dotenv").config();
}

const main = async () => {
	console.log("running...");

	const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
	const wallet = new ethers.Wallet(process.env.PRIVATE_KEY_1, provider);

	const abi = fs.readFileSync(
		"./output/contracts_SimpleStorage_sol_SimpleStorage.abi",
		"utf8"
	);

	const bin = fs.readFileSync(
		"./output/contracts_SimpleStorage_sol_SimpleStorage.bin",
		"utf8"
	);

	const contractFactory = new ethers.ContractFactory(abi, bin, wallet);
	const contract = await contractFactory.deploy();

	await contract.deployTransaction.wait(1);

	console.log(`Contract Address: ${contract.address}`);

	//#region FavoriteNumber
	const currentFavoriteNumber = await contract.retrieve();
	console.log(`Current Favorite Number: ${currentFavoriteNumber.toString()}`);

	const transactionResponse = await contract.store("7");

	const transactionReceipt = await transactionResponse.wait(1);

	const updatedFavoriteNumber = await contract.retrieve();
	console.log(`New Favorite Number: ${updatedFavoriteNumber}`);
	//#endregion FavoriteNumber
};

main()
	.then(() => process.exit(0))
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
