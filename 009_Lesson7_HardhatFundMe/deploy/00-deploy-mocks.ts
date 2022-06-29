// basically fake data for the tests

import { network } from "hardhat";

import {
	DECIMALS,
	developmentChains,
	INITIAL_ANSWER,
} from "../helper-hardhat-config";

module.exports = async (hre: any) => {
	const {
		getNamedAccounts,
		deployments,
	}: { getNamedAccounts: any; deployments: any } = hre;
	const { deploy, log }: { deploy: any; log: any } = deployments;
	const { deployer }: { deployer: any } = await getNamedAccounts();

	if (developmentChains.includes(network.name)) {
		log("found local network...deploying mocks...");
		await deploy("MockV3Aggregator", {
			contract: "MockV3Aggregator",
			from: deployer,
			log: true,
			args: [DECIMALS, INITIAL_ANSWER],
		});
		log("mocks deployed...");
		log("-------------------------");
	}
};

module.exports.tags = ["all", "mocks"];
