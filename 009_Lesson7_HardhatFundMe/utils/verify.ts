import { run } from "hardhat";

export const verify = async (contractAddress, args) => {
	console.log(`verifying contract...`);

	try {
		await run("verify:verify", {
			address: contractAddress,
			constructorArguments: args,
		});
	} catch (err) {
		if (
			err instanceof Error &&
			err.message.toLowerCase().includes("already verified")
		) {
			console.log("already verified this contract...");
		} else {
			console.error(err);
		}
	}
};
