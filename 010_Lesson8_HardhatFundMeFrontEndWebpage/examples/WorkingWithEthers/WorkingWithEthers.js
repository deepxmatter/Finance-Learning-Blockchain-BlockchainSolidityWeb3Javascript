import { ethers } from "./ethers-5.2.esm.min.js";

import { abi, contractAddress } from "./constants.js";

const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");

const listenTX = (transactionResponse, provider) => {
	console.log(`Mining ${transactionResponse.hash}...`);
	return new Promise();
};

const connect = async () => {
	if (typeof window.ethereum !== "undefined") {
		await window.ethereum.request({
			method: "eth_requestAccounts",
		});
		connectButton.innerHTML = "connected...";
		console.log("connected");
	} else {
		connectButton.innerHTML = "no ethereum wallet detected...";
	}
};

const fund = async () => {
	const ethAmount = "0.1";
	console.log(`funding with ${ethAmount} ETH`);
	if (typeof window.ethereum !== "undefined") {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(contractAddress, abi, signer);
		try {
			const transactionResponse = await contract.fund({
				value: ethers.utils.parseEther(ethAmount),
			});
		} catch (err) {
			console.error(err);
		}
	}
};

connectButton.onclick = connect;
fundButton.onclick = fund;
