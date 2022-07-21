const { ethers, getNamedAccounts, network } = require("hardhat");
// const { networkConfig } = require("../helper-hardhat-config");

const AMOUNT = ethers.utils.parseEther("0.02");

async function GetWeth() {
	const { deployer } = await getNamedAccounts();
	const IWeth = await ethers.getContractAt(
		"IWeth",
		"0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
		deployer
	);
	const txResponse = await IWeth.deposit({
		value: AMOUNT,
	});
	await txResponse.wait(1);
	const wethBalance = await IWeth.balanceOf(deployer);
	console.log(`Got ${wethBalance.toString()} WETH`);
}

module.exports = { GetWeth, AMOUNT };
