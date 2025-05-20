import { MdVerified } from "react-icons/md";
import { Handyman } from "../../../../types/types";
import { FaRegBookmark, FaStar } from "react-icons/fa6";
import { LuMapPin } from "react-icons/lu";
import styles from "../../Homepage.module.css";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../../store/userStore";
import { formatDistanceToNow } from "date-fns";

const HomepageHandymanCard = ({ handyman }: { handyman: Handyman }) => {
	const navigate = useNavigate();
	const user = useUserStore((state) => state.user);
	return (
		<div key={handyman.id} className="border-bottom border-top py-4">
			<div className="d-flex justify-content-between mb-4">
				<div className="d-flex gap-1 align-items-center">
					<div style={{ width: "36px", height: "36px" }}>
						<img
							src={handyman.image}
							alt="User image"
							className="w-100 h-100 rounded-circle object-fit-cover"
						/>
					</div>

					<div>
						<div className="d-flex gap-2 align-items-center mb-2">
							<p
								className="font-size-14 font-weight-700 mb-0"
								style={{ color: "#080808" }}
							>
								{handyman.name}
								<span>
									<MdVerified color="#1461F0" />
								</span>
							</p>
						</div>
						<div className="d-flex gap-2 align-items-center">
							<FaStar color="#F5CE47" />
							<p className="font-size-10 font-weight-600 mb-0">
								{handyman.stars}
							</p>
							<p
								style={{ color: "#939393" }}
								className="font-size-10 font-weight-600 mb-0"
							>
								{handyman.numberReviews} reviews
							</p>
						</div>
					</div>
				</div>

				<div className="d-flex gap-2">
					<div>
						<p
							className="mb-0 font-size-10 font-weight-600 rounded p-1"
							style={{
								color: "#38830A",
								backgroundColor: "#C3E2B0",
							}}
						>
							Now available
						</p>
					</div>
					<div>
						<FaRegBookmark color="#1461F0" />
					</div>
				</div>
			</div>

			<div className="d-flex justify-content-between border-bottom">
				<p className="font-weight-700 font-size-14 w-75 px-2">
					{handyman.profession} available for work
				</p>
				<p style={{ color: "#939393", fontSize: "10px" }} className="w-25 px-2">
					{formatDistanceToNow(new Date(handyman.createdAt), {
						addSuffix: true,
					})}
				</p>
			</div>

			<p className="font-size-12 font-weight-400 pt-3">
				{handyman.description}
			</p>

			<div className="d-flex gap-1">
				<LuMapPin color="#5584E5" />
				<p className="font-size-12 font-weight-400 mb-0">{handyman.location}</p>
			</div>

			<div className={styles.scrollContainer}>
				{handyman.workImages.map((image, index) => (
					<img
						key={index}
						src={image}
						alt="Image of the work"
						className={styles.scrollItem}
					/>
				))}
			</div>

			<div className="d-flex justify-content-between font-size-12 font-weight-600 pt-3">
				<a
					className="orange mb-0 text-decoration-none align-self-end"
					style={{ cursor: "pointer" }}
					onClick={() => {
						navigate(`/homepage/handyman-public-profile/${handyman.id}`, {
							state: { handyman: handyman },
						});
					}}
				>
					Show profile
				</a>
				<button
					onClick={() => {
						const id = `${user?.id}_${handyman.id}`;
						navigate(`/chat/${id}`, {
							state: { handyman: handyman },
						});
					}}
					className="orange-btn "
					style={{ width: "110px" }}
				>
					Contact
				</button>
			</div>
		</div>
	);
};

export default HomepageHandymanCard;
