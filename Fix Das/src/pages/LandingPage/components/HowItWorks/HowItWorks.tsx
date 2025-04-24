import styles from "./HowItWorks.module.css";

const HowItWorks = () => {
	return (
		<div className="container">
			<h2 className={styles.title}>Instant Messaging für mühelose Buchunge</h2>

			<div className="ps-4">
				<img
					src="/LandingPage/iPhone 12 Pro mockup.svg"
					alt="Chat screenshot"
					className="w-100"
				/>
			</div>

			<div className="text-center py-4 px-3">
				<div className="mb-4">
					<img
						src="LandingPage/howItWorks/Checkmark1.svg"
						alt="Checkmark"
						className="mb-3"
					/>
					<h6>Beschreiben Sie Ihr Projekt</h6>
					<p>Teilen Sie die Details des Auftrags und Ihre Wünsche mit.</p>
				</div>
				<div className="mb-4">
					<img
						src="LandingPage/howItWorks/Checkmark2.svg"
						alt="Checkmark"
						className="mb-3"
					/>
					<h6>Stellen Sie Fragen & Senden Sie Fotos</h6>
					<p>
						Klären Sie offene Fragen und senden Sie Fotos für ein besseres
						Verständnis.
					</p>
				</div>
				<div className="mb-4">
					<img
						src="LandingPage/howItWorks/Checkmark3.svg"
						alt="Checkmark"
						className="mb-3"
					/>
					<h6>Bestätigen & Buchen</h6>
					<p>
						Finalisieren Sie die Details und vereinbaren Sie sofort einen
						Termin.
					</p>
				</div>
			</div>
		</div>
	);
};

export default HowItWorks;
