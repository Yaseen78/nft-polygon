import React from "react";
// import './home.module.css'
import HomeImg from "../assets/home.png";
import Link from "next/link";
import Image from "next/image";
import Home from "./index";
import MarketPlace from "../components/MarketPlace";

const home = () => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
			}}
		>
			{" "}
			<div
				className="container"
				style={{
					display: "flex",
					flexDirection: "row",
					maxWidth: "1205px",
					justifyContent: "space-between",
					alignItems: "center",
					margin: "162px 350px 0px 358px",
				}}
			>
				<div
					className="left-container"
					style={{
						display: "flex",
						flexDirection: "column",
						maxWidth: "600px",
						height: "275px",
						justifyContent: "space-between",
					}}
				>
					<span
						className="heading"
						style={{
							fontSize: "58px",
							lineHeight: "70px",
							fontWeight: 700,
						}}
					>
						NFT MARKETPLACE
					</span>

					<span
						className="desc"
						style={{
							color: "#AAAFB5",
							fontSize: "24px",
							lineHeight: "36px",
							fontWeight: 500,
						}}
					>
						Picking the perfect UI font for your website or app has its
						challenges.
					</span>
					<div
						className="buttons"
						style={{
							display: "flex",
							flexDirection: "row",
						}}
					>
						<Link href="/create-item">
							<button
								className="button"
								style={{
									width: "206px",
									height: "72px",
									display: "flex",
									flexDirection: "row",
									justifyContent: "center",
									alignItems: "center",
									fontSize: 22,
									fontWeight: 600,
									color: "#FFFFFF",
									backgroundColor: "#252B3D",
									border: "1.54581px solid #AAAFB5",
									borderRadius: "15px",
								}}
							>
								{" "}
								Create{" "}
							</button>
						</Link>

						<Link href="/">
							<button
								className="button"
								style={{
									width: "206px",
									height: "72px",
									display: "flex",
									flexDirection: "row",
									justifyContent: "center",
									alignItems: "center",
									fontSize: 22,
									fontWeight: 600,
									color: "#000000",
									backgroundColor: "#F4CF49",
									// border: '1.54581px solid #AAAFB5',
									marginLeft: 25,
									borderRadius: "15px",
								}}
							>
								Explore
							</button>
						</Link>
					</div>
				</div>

				<div className="right-container">
					<Image src={HomeImg} className="img"></Image>
				</div>
			</div>
			<div
				style={{
					marginLeft: 350,
					// marginRight: 350,
				}}
			>
				<div
					style={{
						fontSize: "33px",
						fontWeight: 700,
						marginTop: 120,
					}}
				>
					Latest Items
				</div>
				<div
					style={{
						maxWidth: "1165px",
						width: "100%",
						height: "2px",
						background: "#686868",
						marginBottom: "50px",
						// marginLeft: 350,
						marginRight: 350,
					}}
				></div>

				<MarketPlace limit={3} />
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Link href="/">
						<button
							style={{
								width: "205px",
								height: "62.19px",
								border: "1.53558px solid #AAAFB5",
								background: "#252B3D",
								borderRadius: 15,
								marginTop: 57,
								fontSize: 22,
								fontWeight: 600,
							}}
						>
							{" "}
							More{" "}
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default home;
