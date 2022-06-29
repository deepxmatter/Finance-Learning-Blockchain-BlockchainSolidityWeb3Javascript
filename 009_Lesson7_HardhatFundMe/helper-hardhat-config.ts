const networkConfig = {
	4: {
		name: "rinkeby",
		ethUsdPriceFeed: 0x8a753747a1fa494ec906ce90e9f37563a8af630e,
	},
	137: {
		name: "polygon",
		ethUsdPriceFeed: 0xf9680d99d6c9589e2a93a78a04a279e509205945,
	},
};

const developmentChains = ["hardhat", "localhost"];
const DECIMALS = 8;
const INITIAL_ANSWER = 200000000000;

export { networkConfig, developmentChains, DECIMALS, INITIAL_ANSWER };
