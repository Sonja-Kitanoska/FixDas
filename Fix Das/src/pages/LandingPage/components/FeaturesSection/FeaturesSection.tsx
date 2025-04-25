import styles from "./FeaturesSection.module.css";

const FeaturesSection = () => {
	return (
		<section className="container py-5">
			<div className="position-relative">
				<h2 className={`text-center ${styles.secondTitle}`}>
					Warum Menschen <br /> uns mögen
				</h2>
				<img
					src="LandingPage//blue-underline.png"
					alt="blue-underline"
					className={styles.blueUnderline}
				/>
			</div>
			<div className="d-flex flex-column gap-2 mt-5">
				<div className="d-flex gap-2">
					<img src="/LandingPage/check-circle-icon.svg" alt="Check icon" />
					<p className="mb-0">Kalenderbuchung und einfache Kommunikation.</p>
				</div>
				<div className="d-flex gap-2">
					<img src="/LandingPage/check-circle-icon.svg" alt="Check icon" />
					<p className="mb-0">Zertifizierte Profis für höchste Qualität.</p>
				</div>
				<div className="d-flex gap-2">
					<img src="/LandingPage/check-circle-icon.svg" alt="Check icon" />
					<p className="mb-0">
						Verfügbare Handwerker für dringende Reparaturen.
					</p>
				</div>
			</div>
		</section>
	);
};

export default FeaturesSection;
