/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { ethers } from "ethers";
import { create } from "ipfs-http-client";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";

const ipfsLink = "http://localhost:8080/ipfs";
const client = create("http://localhost:5001/api/v0");

import { nftaddress, nftmarketaddress } from "../config";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/Market.sol/NFTMarket.json";

export default function CreateItem() {
	const [fileUrl, setFileUrl] = useState(null);
	const [formInput, updateFormInput] = useState({
		price: "",
		name: "",
		description: "",
	});
	const router = useRouter();

	async function onChange(e) {
		const file = e.target.files[0];
		try {
			const added = await client.add(file, {
				progress: (prog) => console.log(`received: ${prog}`),
			});
			console.log(added.path);
			const url = `${ipfsLink}/${added.path}`;
			setFileUrl(url);
			console.log("uploaded iamge", added.path);
		} catch (error) {
			console.log("Error uploading file: ", error);
		}
	}
	async function createMarket() {
		const { name, description, price } = formInput;
		if (!name || !description || !price || !fileUrl) return;
		/* first, upload to IPFS */
		const data = JSON.stringify({
			name,
			description,
			image: fileUrl,
		});
		try {
			const added = await client.add(data, {
				progress: (prog) => console.log(`received: ${prog}`),
			});
			const url = `${ipfsLink}/${added.path}`;
			createSale(url);
			console.log("uploaded data", added.path);
		} catch (error) {
			console.log("Error uploading file: ", error);
		}
	}

	async function createSale(url) {
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();

		/* next, create the item */
		let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
		let transaction = await contract.createToken(url);
		let tx = await transaction.wait();
		let event = tx.events[0];
		let value = event.args[2];
		let tokenId = value.toNumber();

		const price = ethers.utils.parseUnits(formInput.price, "ether");

		/* then list the item for sale on the marketplace */
		contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
		let listingPrice = await contract.getListingPrice();
		listingPrice = listingPrice.toString();

		transaction = await contract.createMarketItem(nftaddress, tokenId, price, {
			value: listingPrice,
		});
		await transaction.wait();
		router.push("/");
	}

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<div
				style={{
					fontSize: "33px",
					fontWeight: 700,
					marginTop: 50,
					marginRight: 470,
				}}
			>
				Create your own NFT
			</div>
			<div
				style={{
					width: "1165px",
					height: "2px",
					background: "#686868",
					marginLeft: 370,
					marginBottom: "50px",
				}}
			></div>
			<div
				style={{
					background:
						"linear-gradient(148.82deg, rgba(196, 196, 196, 0.11) 0%, rgba(196, 196, 196, 0.4) 98.79%)",
					backgroundFilter: "blur(68.1731px)",
					borderRadius: 34,
					width: 709,
					minHeight: 811,
					marginLeft: 370,
					display: "flex",
					flexDirection: "column",
					fontSize: 22,
					fontWeight: 600,
					marginBottom: 50,
				}}
			>
				<input
					placeholder="Asset Name"
					onChange={(e) =>
						updateFormInput({ ...formInput, name: e.target.value })
					}
					style={{
						color: "white",
						background: "transparent",
						marginTop: 87,
						marginLeft: 105,
						marginRight: 105,
						borderBottom: "2px solid grey",
					}}
				/>
				<textarea
					placeholder="Asset Description"
					onChange={(e) =>
						updateFormInput({ ...formInput, description: e.target.value })
					}
					style={{
						color: "white",
						background: "transparent",
						marginTop: 87,
						marginLeft: 105,
						marginRight: 105,
						borderBottom: "2px solid grey",
					}}
				/>
				<input
					placeholder="Asset Price in Eth"
					onChange={(e) =>
						updateFormInput({ ...formInput, price: e.target.value })
					}
					style={{
						color: "white",
						background: "transparent",
						marginTop: 110,
						marginLeft: 105,
						borderBottom: "2px solid grey",
						marginRight: 105,
					}}
				/>
				<input
					style={{
						marginTop: 87,
						marginLeft: 105,
						background: "transparent",
					}}
					type="file"
					name="Asset"
					onChange={onChange}
				/>
				{fileUrl && (
					<img
						style={{
							marginLeft: 105,
							borderRadius: 10,
						}}
						width="300"
						src={fileUrl}
					/>
				)}
				<button
					onClick={createMarket}
					style={{
						background: "#F4CF49",
						border: "2px solid #CDBBBB",
						borderRadius: 15,
						color: "black",
						fontSize: 22,
						fontWeight: 600,
						width: 218,
						marginLeft: 105,
						marginTop: 60,
						height: 72,
					}}
				>
					Create
				</button>
			</div>
		</div>
	);
}
