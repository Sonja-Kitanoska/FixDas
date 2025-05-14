import { useNavigate } from "react-router-dom";
import styles from "./TopHandymen.module.css";
import { LuMapPin } from "react-icons/lu";
import { useEffect, useState } from "react";
import { Handyman } from "../../../../types/types";
import { fetchHandymen } from "../../../../api/handymen";

const TopHandymen = () => {
	const navigate = useNavigate();

	const [handymen, setHandymen] = useState<Handyman[]>();

	useEffect(() => {
		const fetchData = async () => {
			const handymenData = await fetchHandymen();
			const sorted = handymenData
				.slice()
				.sort((a, b) => {
					if (b.stars !== a.stars) {
						return b.stars - a.stars;
					}
					return b.numberReviews - a.numberReviews;
				})
				.slice(0, 5);

			setHandymen(sorted);
		};
		fetchData();
	}, []);

	return (
		<section className="container py-5">
			<h2 className={`${styles.secondTitle} text-center`}>
				Top-bewertete <br /> Handwerker
			</h2>
			<div className={styles.scrollContainer}>
				{handymen?.map((handyman, index) => (
					<div key={handyman.id} className={`${styles.scrollItem} `}>
						<div className={`${styles.handymanCard} card `}>
							<h5
								className={`${styles.professionHeading} ${
									index % 2 === 0 ? styles.blueBg : styles.yellowBg
								} card-title mb-0 p-2 text-uppercase`}
							>
								{handyman.profession}
							</h5>
							<div className={styles.imgContainer}>
								<img
									className={`${styles.cardImg} card-img-top w-100 h-100 object-fit-cover`}
									src={handyman.image}
									alt="Handyman image"
								/>
							</div>
							<div className={styles.contentDiv}>
								<p className={`${styles.nameParagraph} mb-0`}>
									{handyman.name}
								</p>
								<p className={`${styles.orangeFont}`}>
									{handyman.jobsDone} Abgeschlossene Aufträge
								</p>
								<button
									className={` btn d-flex flex-row justify-content-center align-items-center gap-1 ${styles.grayBtn}`}
								>
									<LuMapPin />
									<p className="mb-0">{handyman.location}</p>
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
			<button
				onClick={() => navigate("/find-handyman")}
				className="orange-btn font-size-12 border-0 mt-4"
			>
				Hausmeister Finden
			</button>
		</section>
	);
};

export default TopHandymen;
