const { ethers } = require("hardhat");
const { assert, expect } = require("chai");

describe("SimpleStorage", () => {
	let simpleStorageFactory;
	let simpleStorage;

	beforeEach(async () => {
		simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
		simpleStorage = await simpleStorageFactory.deploy();
	});

	//#region Its
	it("should start with a favorite number of 0", async () => {
		const currentValue = await simpleStorage.retrieve();
		const expectedValue = "0";

		assert.equal(currentValue.toString(), expectedValue);
	});

	it("should update when we call store", async () => {
		const expectedValue = "7";
		const transactionResponse = await simpleStorage.store(expectedValue);
		await transactionResponse.wait(1);

		const currentValue = await simpleStorage.retrieve();
		assert.equal(currentValue.toString(), expectedValue);
	});
	//#endregion Its
});
