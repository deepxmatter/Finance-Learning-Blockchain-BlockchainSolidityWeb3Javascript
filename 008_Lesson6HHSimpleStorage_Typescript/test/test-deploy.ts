import { ethers } from "hardhat";
import { assert, expect } from "chai";

//#region Types
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types/";
//#endregion Types

describe("SimpleStorage", () => {
	let simpleStorageFactory: SimpleStorage__factory;
	let simpleStorage: SimpleStorage;

	beforeEach(async () => {
		simpleStorageFactory = (await ethers.getContractFactory(
			"SimpleStorage"
		)) as SimpleStorage__factory;
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
