import styles from "./TopHandymen.module.css";

const topHandymen = [
	{
		id: 1,
		profession: "SANITÄRREPARATUREN",
		image: "/LandingPage/handyman-img.png",
		name: "Marcus Schmidt",
		workDone: "38",
		location: "Ingolstadt",
	},
	{
		id: 1,
		profession: "SANITÄRREPARATUREN",
		image: "/LandingPage/handyman-img.png",
		name: "Marcus Schmidt",
		workDone: "38",
		location: "Ingolstadt",
	},
	{
		id: 1,
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
				{topHandymen.map((handyman) => (
					<div key={handyman.id} className={`${styles.scrollItem} `}>
						<div className={`${styles.handymanCard} card `}>
							<h5 className="card-title">{handyman.profession}</h5>
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
								<button className={` btn ${styles.grayBtn}`}>
									{handyman.location}
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default TopHandymen;
