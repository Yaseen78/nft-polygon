/* eslint-disable @next/next/no-img-element */
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import EthIcon from "../assets/eth.png";
import Image from "next/image";
import MarketPlace from "../components/MarketPlace";

import { nftaddress, nftmarketaddress } from "../config";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/Market.sol/NFTMarket.json";

export default function Home() {
	// const [nfts, setNfts] = useState([]);
	const [loadingState, setLoadingState] = useState("not-loaded");
	// useEffect(() => {
	// 	loadNFTs();
	// }, []);
	// async function loadNFTs() {
	// 	try {
	// 		const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint);
	// 		const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
	// 		const marketContract = new ethers.Contract(
	// 			nftmarketaddress,
	// 			Market.abi,
	// 			provider,
	// 		);
	// 		const data = await marketContract.fetchMarketItems();

	// 		console.log("data ", data);

	// 		const items = await Promise.all(
	// 			data.map(async (i) => {
	// 				const tokenUri = await tokenContract.tokenURI(i.tokenId);
	// 				console.log("ak47", tokenUri);
	// 				const meta = await axios.get(tokenUri);
	// 				let price = ethers.utils.formatUnits(i.price.toString(), "ether");
	// 				let item = {
	// 					price,
	// 					itemId: i.itemId.toNumber(),
	// 					seller: i.seller,
	// 					owner: i.owner,
	// 					image: meta.data.image,
	// 					name: meta.data.name,
	// 					description: meta.data.description,
	// 				};
	// 				console.log("image item", item);
	// 				return item;
	// 			}),
	// 		);
	// 		setNfts(items);
	// 		setLoadingState("loaded");
	// 	} catch (error) {
	// 		console.error("errrrrrrrrrrrrr", error);
	// 	}
	// }
	// async function buyNft(nft) {
	// 	const web3Modal = new Web3Modal();
	// 	const connection = await web3Modal.connect();
	// 	const provider = new ethers.providers.Web3Provider(connection);
	// 	const signer = provider.getSigner();
	// 	const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

	// 	const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
	// 	const transaction = await contract.createMarketSale(
	// 		nftaddress,
	// 		nft.itemId,
	// 		{
	// 			value: price,
	// 		},
	// 	);
	// 	await transaction.wait();
	// 	loadNFTs();
	// }
	if (loadingState === "loaded" && !nfts.length)
		return (
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					marginLeft: "378px",
					marginRight: "378px",
				}}
			>
				<div
					style={{
						fontSize: "33px",
						fontWeight: 700,
						marginTop: 50,
					}}
				>
					Marketplace
				</div>
				<div
					style={{
						width: "1165px",
						height: "2px",
						background: "#686868",
						marginBottom: "50px",
					}}
				></div>
				<p>No items in marketplace</p>
			</div>
		);
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				marginLeft: "378px",
				marginRight: "378px",
			}}
		>
			<div
				style={{
					fontSize: "33px",
					fontWeight: 700,
					marginTop: 50,
				}}
			>
				Marketplace
			</div>
			<div
				style={{
					width: "1165px",
					height: "2px",
					background: "#686868",
					marginBottom: "50px",
				}}
			></div>

			<MarketPlace />
		</div>
	);
}
