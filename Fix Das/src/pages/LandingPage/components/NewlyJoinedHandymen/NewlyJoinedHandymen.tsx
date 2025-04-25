import styles from "./NewlyJoinedHandymen.module.css";

const newHandymen = [
	{
		id: 1,
		profession: "Elektriker",
		image: "/LandingPage/new-handymen/new-handyman1.svg",
		name: "Brad Pitt",
		workDone: "38",
		location: "Ingolstadt",
	},
	{
		id: 2,
		profession: "Schlosser",
		image: "/LandingPage/new-handymen/new-handyman2.svg",
		name: "George Clooney",
		workDone: "38",
		location: "Ingolstadt",
	},
	{
		id: 3,
		profession: "Elektriker",
		image: "/LandingPage/new-handymen/new-handyman1.svg",
		name: "Marcus Schmidt",
		workDone: "38",
		location: "Ingolstadt",
	},
];

const NewlyJoinedHandymen = () => {
	return (
		<div className="container pb-4">
			<h2 className={styles.title}>
				Neu beigetreten, bereit zu{" "}
				<span className={styles.fasthandRegular}>helfen</span> !
			</h2>

			<div className={styles.scrollContainer}>
				{newHandymen.map((handyman) => (
					<div key={handyman.id} className={`${styles.scrollItem} `}>
						<div className="">
							<div className={styles.imgContainer}>
								<img
									src={handyman.image}
									alt="Handyman image"
									className="w-100 h-100"
								/>
							</div>
							<div className="d-flex justify-content-center gap-2">
								<p className={styles.nameParagraph}>{handyman.name}</p>
								<img
									src="/LandingPage/new-handymen/verified-icon.svg"
									alt="Verified icon"
								/>
							</div>
							<p className="font-size-14">{handyman.profession}</p>
						</div>
					</div>
				))}
			</div>

			<button className="orange-btn font-size-12 border-0 mt-2">
				Hausmeister Finden
			</button>
		</div>
	);
};

export default NewlyJoinedHandymen;
