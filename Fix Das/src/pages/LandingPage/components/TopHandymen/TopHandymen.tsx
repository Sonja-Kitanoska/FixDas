import styles from "./TopHandymen.module.css";
import { LuMapPin } from "react-icons/lu";

const topHandymen = [
	{
		id: crypto.randomUUID(),
		profession: "SANITÄRREPARATUREN",
		image: "/LandingPage/handyman-img.png",
		name: "Marcus Schmidt",
		workDone: "38",
		location: "Ingolstadt",
	},
	{
		id: crypto.randomUUID(),
		profession: "SANITÄRREPARATUREN",
		image: "/LandingPage/handyman-img.png",
		name: "Marcus Schmidt",
		workDone: "38",
		location: "Ingolstadt",
	},
	{
		id: crypto.randomUUID(),
		profession: "SANITÄRREPARATUREN",
		image: "/LandingPage/handyman-img.png",
		name: "Marcus Schmidt",
		workDone: "38",
		location: "Ingolstadt",
	},
];

const TopHandymen = () => {
	return (
		<section className="container py-5">
			<h2 className={`${styles.secondTitle} text-center`}>
				Top-bewertete <br /> Handwerker
			</h2>
			<div className={styles.scrollContainer}>
				{topHandymen.map((handyman, index) => (
					<div key={handyman.id} className={`${styles.scrollItem} `}>
						<div className={`${styles.handymanCard} card `}>
							<h5
								className={`${styles.professionHeading} ${
									index % 2 === 0 ? styles.blueBg : styles.yellowBg
								} card-title mb-0 p-2`}
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
									{handyman.workDone} Abgeschlossene Aufträge
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
			<button className="orange-btn font-size-12 border-0 mt-4">
				Hausmeister Finden
			</button>
		</section>
	);
};

export default TopHandymen;
