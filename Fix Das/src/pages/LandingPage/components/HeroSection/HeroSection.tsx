import styles from "./HeroSection.module.css";

const HeroSection = () => {
	return (
		<section className="container">
			<div className="px-4 text-center">
				<h1 className={styles.title}>
					Handwerker <br />
					leicht <span className={styles.fasthandRegular}>gemacht</span>
				</h1>
				<p className={styles.fontSize18}>
					Alle Dienstleistungen, die Sie brauchen, an einem Ort.
				</p>
				<div className="my-2">
					<img
						src="LandingPage/handyman.svg"
						alt="handymen"
						className="w-100"
					/>
				</div>
			</div>
			<div className="d-flex gap-2 my-4">
				<button className="btn orange-border-btn">Anfrage Posten</button>

				<button className="btn orange-btn">Hausmeister Finden</button>
			</div>
		</section>
	);
};

export default HeroSection;
