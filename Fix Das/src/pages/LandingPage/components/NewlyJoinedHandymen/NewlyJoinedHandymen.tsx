import { useNavigate } from "react-router-dom";
import styles from "./NewlyJoinedHandymen.module.css";
import { useEffect, useState } from "react";
import { fetchHandymen } from "../../../../api/handymen";
import { Handyman } from "../../../../types/types";

const NewlyJoinedHandymen = () => {
	const navigate = useNavigate();
	const [handymen, setHandymen] = useState<Handyman[]>();

	useEffect(() => {
		const fetchData = async () => {
			const handymenData = await fetchHandymen();
			const sorted = handymenData
				.slice()
				.sort((a, b) => {
					return (
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
					);
				})
				.slice(0, 5);

			setHandymen(sorted);
		};
		fetchData();
	}, []);

	return (
		<div className="container pb-4">
			<h2 className={styles.title}>
				Neu beigetreten, bereit zu{" "}
				<span className={styles.fasthandRegular}>helfen</span> !
			</h2>

			<div className={styles.scrollContainer}>
				{handymen?.map((handyman) => (
					<div key={handyman.id} className={`${styles.scrollItem}`}>
						<div
							className="d-flex flex-column justify-content-center align-items-center"
							style={{ width: "135px" }}
						>
							<div className={styles.imgContainer}>
								<img
									src={handyman.image}
									alt="Handyman image"
									className="w-100 h-100 rounded-circle object-fit-cover"
									style={{ objectPosition: "center" }}
								/>
							</div>
							<div className="d-flex justify-content-center gap-2">
								<p className={styles.nameParagraph}>{handyman.name}</p>
								<img
									src="/LandingPage/new-handymen/verified-icon.svg"
									alt="Verified icon"
								/>
							</div>
							<p
								className="font-size-14 text-wrap"
								style={{ wordBreak: "break-word" }}
							>
								{handyman.profession}
							</p>
						</div>
					</div>
				))}
			</div>

			<button
				onClick={() => navigate("/find-handyman")}
				className="orange-btn font-size-12 border-0 mt-2"
			>
				Hausmeister Finden
			</button>
		</div>
	);
};

export default NewlyJoinedHandymen;
