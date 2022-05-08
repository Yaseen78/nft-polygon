/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import { nftaddress, nftmarketaddress } from "../config";

import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import EthIcon from "../assets/eth.png";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/Market.sol/NFTMarket.json";

let rpcEndpoint = null;

if (process.env.NEXT_PUBLIC_WORKSPACE_URL) {
	rpcEndpoint = process.env.NEXT_PUBLIC_WORKSPACE_URL;
}

const MarketPlace = ({ limit = -1 }) => {
	const [nfts, setNfts] = useState([]);
	const [loadingState, setLoadingState] = useState("not-loaded");
	useEffect(() => {
		loadNFTs();
	}, []);
	async function loadNFTs() {
		try {
			const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint);
			const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
			const marketContract = new ethers.Contract(
				nftmarketaddress,
				Market.abi,
				provider,
			);
			const data = await marketContract.fetchMarketItems();

			console.log("data ", data);

			const items = await Promise.all(
				data.map(async (i) => {
					const tokenUri = await tokenContract.tokenURI(i.tokenId);
					console.log("ak47", tokenUri);
					const meta = await axios.get(tokenUri);
					let price = ethers.utils.formatUnits(i.price.toString(), "ether");
					let item = {
						price,
						itemId: i.itemId.toNumber(),
						seller: i.seller,
						owner: i.owner,
						image: meta.data.image,
						name: meta.data.name,
						description: meta.data.description,
					};
					console.log("image item", item);
					return item;
				}),
			);
			setNfts(items);
			setLoadingState("loaded");
		} catch (error) {
			console.error("errrrrrrrrrrrrr", error);
		}
	}
	async function buyNft(nft) {
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

		const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
		const transaction = await contract.createMarketSale(
			nftaddress,
			nft.itemId,
			{
				value: price,
			},
		);
		await transaction.wait();
		loadNFTs();
	}

	limit = limit == -1 ? nfts.length : limit;
	return (
		<div>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(3, 1fr)",
					gap: "58px",
				}}
			>
				{nfts.slice(0, limit).map((nft, i) => (
					<div
						key={i}
						style={{
							width: "350px",
							height: "400px",
							filter:
								"drop-shadow(0px 3.35577px 3.35577px rgba(0, 0, 0, 0.25))",
							background:
								"linear-gradient(148.82deg, rgba(196, 196, 196, 0.16) 0%, rgba(196, 196, 196, 0.4) 98.79%)",
							backdropFilter: "blur(33.5577px)",
							borderRadius: "16px",
							paddingTop: "1px",
						}}
					>
						<img
							src={nft.image}
							style={{
								width: "302px",
								height: "247px",
								display: "flex",
								justifyContent: "center",
								borderRadius: "16px",
								margin: "23px",
							}}
							alt="sfdf"
						/>

						<div
							style={{
								display: "flex",
								flexDirection: "column",
								margin: "23px",
							}}
						>
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
								}}
							>
								<div
									style={{
										fontSize: "25px",
										fontWeight: 700,
										lineHeight: "31px",
									}}
								>
									{nft.name}
								</div>

								<div
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<div
										style={{
											fontSize: "21px",
											fontWeight: 500,
											color: "#F4CF49",
											textShadow: "0px 3.35577px 3.35577px rgba(0, 0, 0, 0.25)",
										}}
									>
										{nft.price}
									</div>

									<Image width="25px" height="27px" src={EthIcon} />
								</div>
							</div>

							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<div
									style={{
										overflow: "hidden",
										fontSize: "13px",
										color: "#D6D6D6",
										textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
										fontWeight: 500,
										maxWidth: "180px",
									}}
								>
									{nft.description}
								</div>

								<button
									style={{
										// width: '106px',
										// minHeigth: '32px',
										background: "#F4CF49",
										color: "black",
										borderRadius: "8px",
										fontSize: "15px",
										fontWeight: 700,
										padding: "7px 19px",
									}}
									onClick={() => buyNft(nft)}
								>
									{" "}
									Buy Now
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default MarketPlace;
