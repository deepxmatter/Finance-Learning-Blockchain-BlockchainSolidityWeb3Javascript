const path = require("path");
const { GetWeth, AMOUNT } = require("../scripts/GetWeth");
const { getNamedAccounts, ethers } = require("hardhat");

const getLendingPool = async (account) => {
	const lendingPoolAddressProvider = await ethers.getContractAt(
		"contracts/interface/ILendingPoolAddressesProvider.sol:ILendingPoolAddressesProvider",
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

const approveERC20 = async (
	erc20Address,
	spenderAddress,
	amountToSpend,
	account
) => {
	const erc20Token = await ethers.getContractAt(
		"IERC20",
		erc20Address,
		account
	);

	const tx = await erc20Token.approve(spenderAddress, amountToSpend);
	await tx.wait(1);
	console.log("APPROVED");
};

const getBorrowUserData = async (lendingPool, account) => {
	const { totalCollateralETH, totalDebtETH, availableBorrowsETH } =
		await lendingPool.getUserAccountData(account);
	console.log(`Total collateral: ${totalCollateralETH}`);
	console.log(`Total debt: ${totalDebtETH}`);
	console.log(`Available borrows: ${availableBorrowsETH}`);

	return { totalCollateralETH, totalDebtETH, availableBorrowsETH };
};

const getDaiPrice = async () => {
	const daiEthPriceFeed = await ethers.getContractAt(
		"AggregatorV3Interface",
		"0x773616e4d11a78f511299002da57a0a94577f1f4"
	);

	const price = (await daiEthPriceFeed.latestRoundData())[1];

	// console.log(`DAI/ETH price: ${price.toString()}`);

	return price;
};

const main = async () => {
	await GetWeth();
	const { deployer } = await getNamedAccounts();

	const lendingPool = await getLendingPool(deployer);

	const wethTokenAddress = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";

	await approveERC20(wethTokenAddress, lendingPool.address, AMOUNT, deployer);

	console.log("depositing...");

	await lendingPool.deposit(wethTokenAddress, AMOUNT, deployer, 0);

	console.log("deposited");

	let { availableBorrowsETH, totalDebtETH } = await getBorrowUserData(
		lendingPool,
		deployer
	);

	const daiPrice = await getDaiPrice();

	const amountDaiToBorrow =
		availableBorrowsETH.toString() * 0.95 * (1 / daiPrice.toNumber());

	console.log(`You can Borrow ${amountDaiToBorrow} DAI`);

	const amountDaiToBorrowWei = ethers.utils.parseEther(
		amountDaiToBorrow.toString()
	);

	console.log(`You can Borrow ${amountDaiToBorrowWei} Wei of Dai`);
};

async 

console.log(`running ${path.basename(__filename)}`);
main()
	.then(() => {
		process.exit(0);
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
