import { FaChevronDown, FaRegBookmark } from "react-icons/fa6";
import styles from "./PostRequest.module.css";
import { LuMapPin } from "react-icons/lu";

const PostRequest = () => {
	return (
		<div className="pt-5">
			<div className="text-center container">
				<div className="position-relative">
					<h2 className="text-size-32 font-weight-400">
						Are you looking for the right craftsman?
					</h2>
					<img
						src="/blue-underline-thiner.svg"
						alt="Blue paint"
						className={styles.bluePrint}
					/>
				</div>
				<p className="font-size-14">
					Let me know how to help you - publish a free advertisement now!
				</p>
			</div>

			<div className={styles.backgroundImage}>
				<div className="container">
					<div className="card p-2">
						<div className="d-flex justify-content-between">
							<div className="d-flex gap-2">
								<div style={{ width: "36px", height: "36px" }}>
									<img
										src="/Profile/ProfilePicture.svg"
										alt="ClientImage"
										className="w-100 h-100"
									/>
								</div>
								<div>
									<p className="mb-0">Anna Muller</p>
									<p style={{ fontSize: "10px", color: "#939393" }}>
										Thrustworthy
									</p>
								</div>
							</div>
							<div className="d-flex gap-1">
								<div>
									<p
										className="font-size-12 font-weight-700 mb-0 px-2 rounded"
										style={{ color: "#FE2414", backgroundColor: "#FFDEDE" }}
									>
										URGENT
									</p>
								</div>
								<FaRegBookmark color="#1461F0" />
							</div>
						</div>
						<div className="d-flex justify-content-between align-items-center border-bottom pb-2">
							<p className="font-weight-700 font-size-14 mb-0">
								Repair a leaky tube
							</p>
							<p className="font-size-10 mb-0" style={{ color: "#939393" }}>
								3 days ago
							</p>
						</div>
						<div>
							<p className="mb-0 py-2 font-size-12">
								Localize the source of the leak, place the water supply from...
							</p>
							<div className="d-flex align-items-center gap-1">
								<LuMapPin color="#5584E5" />
								<p className="mb-0 font-size-12">Berlin, Germany</p>
							</div>
							<div className="d-flex">
								<p
									style={{ color: "#1461F0" }}
									className="font-size-10 ms-auto"
								>
									Show on the map
								</p>
							</div>
							<div className="d-flex">
								<button
									className="orange-btn py-2 rounded-3 ms-auto"
									style={{ width: "100px" }}
								>
									Contact
								</button>
							</div>
							<div className="d-flex py-2 justify-content-center">
								<FaChevronDown color="#939393" size={10} />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container py-4">
				<button className="orange-border-btn">Post request</button>
			</div>
		</div>
	);
};

export default PostRequest;
