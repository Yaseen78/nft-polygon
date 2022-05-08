/* eslint-disable @next/next/no-img-element */
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";

import { nftmarketaddress, nftaddress } from "../config";

import Market from "../artifacts/contracts/Market.sol/NFTMarket.json";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";

export default function CreatorDashboard() {
	const [nfts, setNfts] = useState([]);
	const [sold, setSold] = useState([]);
	const [loadingState, setLoadingState] = useState("not-loaded");
	useEffect(() => {
		loadNFTs();
	}, []);
	async function loadNFTs() {
		const web3Modal = new Web3Modal({
			network: "mainnet",
			cacheProvider: true,
		});
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();

		const marketContract = new ethers.Contract(
			nftmarketaddress,
			Market.abi,
			signer,
		);
		const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
		const data = await marketContract.fetchItemsCreated();

		const items = await Promise.all(
			data.map(async (i) => {
				const tokenUri = await tokenContract.tokenURI(i.tokenId);
				const meta = await axios.get(tokenUri);
				let price = ethers.utils.formatUnits(i.price.toString(), "ether");
				let item = {
					price,
					tokenId: i.tokenId.toNumber(),
					seller: i.seller,
					owner: i.owner,
					sold: i.sold,
					image: meta.data.image,
				};
				return item;
			}),
		);
		/* create a filtered array of items that have been sold */
		const soldItems = items.filter((i) => i.sold);
		setSold(soldItems);
		setNfts(items);
		setLoadingState("loaded");
	}
	if (loadingState === "loaded" && !nfts.length)
		return <h1 className="py-10 px-20 text-3xl">No assets created</h1>;
	return (
		<div
			style={{
				marginLeft: 370,
				marginRight: 370,
			}}
		>
			<div>
				<div
					style={{
						fontSize: "33px",
						fontWeight: 700,
						marginTop: 50,
						// marginLeft: 370
					}}
				>
					Items Created
				</div>
				<div
					style={{
						width: "1165px",
						height: "2px",
						background: "#686868",
						// marginLeft: 370,
						marginBottom: "50px",
					}}
				></div>
				{/* <p>Items Created</p> */}
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(3, 1fr)",
						gap: 58,
					}}
				>
					{nfts.map((nft, i) => (
						<div
							key={i}
							style={{
								width: 350,
								height: 350,
								borderRadius: 16,
								background:
									"linear-gradient(148.82deg, rgba(196, 196, 196, 0.16) 0%, rgba(196, 196, 196, 0.4) 98.79%)",
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<img
								src={nft.image}
								style={{
									width: 350,
									height: 350,
									borderRadius: "16px 16px 0px 0px",
									// margin: 23
								}}
							/>
							<div
								style={{
									borderRadius: "0px 0px 16px 16px",
									color: "black",
									fontSize: 22,
									background: "#F4CF49",
									fontWeight: 600,
									padding: 10,
									width: "100%",
								}}
							>
								<p>Price - {nft.price} ETH</p>
							</div>
						</div>
					))}
				</div>
			</div>
			<div>
				{Boolean(sold.length) && (
					<div>
						<div
							style={{
								fontSize: "33px",
								fontWeight: 700,
								marginTop: 50,
								// marginLeft: 370
							}}
						>
							Items Sold
						</div>
						<div
							style={{
								width: "1165px",
								height: "2px",
								background: "#686868",
								// marginLeft: 370,
								marginBottom: "50px",
							}}
						></div>
						<div
							style={{
								display: "grid",
								gridTemplateColumns: "repeat(3, 1fr)",
								gap: 58,
							}}
						>
							{sold.map((nft, i) => (
								<div
									key={i}
									style={{
										width: 350,
										height: 350,
										borderRadius: 16,
										background:
											"linear-gradient(148.82deg, rgba(196, 196, 196, 0.16) 0%, rgba(196, 196, 196, 0.4) 98.79%)",
										display: "flex",
										flexDirection: "column",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<img
										src={nft.image}
										style={{
											width: 350,
											height: 350,
											borderRadius: "16px 16px 0px 0px",
											// margin: 23
										}}
									/>
									<div
										style={{
											borderRadius: "0px 0px 16px 16px",
											color: "black",
											fontSize: 22,
											background: "#F4CF49",
											fontWeight: 600,
											padding: 10,
											width: "100%",
										}}
									>
										<p>Price - {nft.price} Eth</p>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
