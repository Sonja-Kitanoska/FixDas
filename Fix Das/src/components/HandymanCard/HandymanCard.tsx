import { FaStar } from "react-icons/fa6";
import { LuMapPin } from "react-icons/lu";
import { MdVerified } from "react-icons/md";
import { Handyman } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";

const HandymanCard = ({ handyman }: { handyman: Handyman }) => {
	const navigate = useNavigate();
	const user = useUserStore((state) => state.user);
	return (
		<div key={handyman.id} className="border-bottom py-4">
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
						<div className="d-flex gap-2 align-items-center mb-1">
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

						<div className="d-flex gap-1">
							<LuMapPin color="#5584E5" />
							<p className="font-size-12 fontt-weight-400 mb-0">
								{handyman.location}
							</p>
						</div>
					</div>
				</div>

				<div className="d-flex gap-2">
					<div>
						<p
							className="mb-0 font-size-10 font-weight-600 rounded p-1"
							style={{ color: "#38830A", backgroundColor: "#C3E2B0" }}
						>
							Now available
						</p>
					</div>
				</div>
			</div>
			<div className="d-flex gap-2 align-items-center">
				<FaStar color="#F5CE47" />
				<p className="font-size-10 font-weight-600 mb-0">{handyman.stars}</p>
				<p
					style={{ color: "#939393" }}
					className="font-size-10 font-weight-600 mb-0"
				>
					{handyman.numberReviews} reviews
				</p>
			</div>
			<div
				className="d-flex flex-wrap gap-2 font-size-12 font-weight-700 py-3"
				style={{ color: "#5584E5" }}
			>
				{handyman.categories.map((category) => (
					<p
						key={crypto.randomUUID()}
						style={{ backgroundColor: "#E8EFFE" }}
						className="p-1 mb-0"
					>
						{category}
					</p>
				))}
			</div>

			<p className="font-size-12 font-weight-400">{handyman.description}</p>

			<div className="d-flex justify-content-between font-size-12 font-weight-600 mb-3">
				<p
					className="orange mb-0 text-decoration-none align-self-end"
					style={{ cursor: "pointer" }}
					onClick={() => {
						if (user) {
							navigate(`/homepage/handyman-public-profile/${handyman.id}`, {
								state: { handyman: handyman },
							});
						} else {
							navigate("/sign-up");
						}
					}}
				>
					Show profile
				</p>
				<button
					onClick={() => {
						if (user) {
							const id = `${user.id}_${handyman.id}`;
							navigate(`/chat/${id}`, {
								state: { handyman: handyman },
							});
						} else {
							navigate("/sign-up");
						}
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

export default HandymanCard;
