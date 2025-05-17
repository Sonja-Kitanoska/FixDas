import { FaStar } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import { LuMapPin } from "react-icons/lu";
import { PiSuitcaseSimpleBold } from "react-icons/pi";
import { Handyman } from "../../../../types/types";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../../store/userStore";

const HandymanInfo = ({ handyman }: { handyman: Handyman }) => {
	const navigate = useNavigate();
	const user = useUserStore((state) => state.user);
	return (
		<div>
			<div className="py-3">
				<div style={{ height: "230px" }}>
					<img
						src={handyman.image}
						alt="Profile picture of the handyman"
						className="w-100 h-100 object-fit-cover"
					/>
				</div>

				<div className="d-flex justify-content-between py-3">
					<div className="d-flex flex-column gap-2  mb-1">
						<p
							className="font-size-14 font-weight-700 mb-0"
							style={{ color: "#080808" }}
						>
							{handyman.name}
							<span>
								<MdVerified color="#1461F0" />
							</span>
						</p>
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
					<div>
						<p
							className="mb-0 font-size-10 font-weight-600 rounded p-1"
							style={{ color: "#38830A", backgroundColor: "#C3E2B0" }}
						>
							Now available
						</p>
					</div>
				</div>
				<div
					className="d-flex flex-wrap gap-2 font-size-12 font-weight-700"
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
			</div>

			<div className="d-flex gap-1 mb-2">
				<LuMapPin color="#FA6100" />
				<p className="font-size-12 font-weight-400 mb-0">{handyman.location}</p>
			</div>
			<div className="d-flex align-items-center gap-1">
				<PiSuitcaseSimpleBold color="#FA6100" />
				<p className="font-size-12 font-weight-400 mb-0">
					{handyman.jobsDone} Abgeschlossene Aufträge
				</p>
			</div>
			<div className="d-flex gap-2 py-3">
				<button
					className="orange-border-btn"
					onClick={() => {
						localStorage.removeItem("formData");
						navigate(`/bookings/calendar/${handyman.id}`, {
							state: { handyman: handyman },
						});
					}}
				>
					Buchen
				</button>
				<button
					className="orange-btn"
					onClick={() => {
						const id = `${user?.id}_${handyman.id}`;
						navigate(`/chat/${id}`, {
							state: { handyman: handyman },
						});
					}}
				>
					Jetzt chatten
				</button>
			</div>

			<div>
				<h2 style={{ fontSize: "20px" }} className="font-weight-700">
					Über mich
				</h2>
				<p className="font-size-14 fnt-weight-400">
					Lorem ipsum dolor sit amet consectetur. Elit eget donec ipsum a
					bibendum fermentum velit. Vitae tincidunt curabitur dolor ipsum ipsum
					accumsan commodo. Amet vestibulum aliquam quisque mauris amet mauris
					ultrices. Consectetur eget at elit amet non tellus sit.
				</p>
			</div>
			<div>
				<h2 style={{ fontSize: "20px" }} className="font-weight-700">
					Dienstleistungsbeschreibung
				</h2>
				<p className="font-size-14 fnt-weight-400">
					Lorem ipsum dolor sit amet consectetur. Elit eget donec ipsum a
					bibendum fermentum velit. Vitae tincidunt curabitur dolor ipsum ipsum
					accumsan commodo. Amet vestibulum aliquam quisque mauris amet mauris
					ultrices. Consectetur eget at elit amet non tellus sit.
				</p>
			</div>
		</div>
	);
};

export default HandymanInfo;
