const { ethers } = require("hardhat");

describe("SimpleStorage", () => {
	let simpleStorageFactory;
	let simpleStorage;

	beforeEach(async () => {
		simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
		simpleStorage = await simpleStorageFactory.deploy();
	});

	it("should start with a favorite number of 0");
});
