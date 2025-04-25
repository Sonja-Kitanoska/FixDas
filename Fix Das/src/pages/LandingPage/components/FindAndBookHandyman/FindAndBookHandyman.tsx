import styles from "./FindAndBookHandyman.module.css";

const images = [
	"/LandingPage/testimonials/client1.svg",
	"/LandingPage/testimonials/client2.svg",
	"/LandingPage/testimonials/client3.svg",
	"/LandingPage/testimonials/client1.svg",
	"/LandingPage/avatar.svg",
];

const FindAndBookHandyman = () => {
	return (
		<div
			className="container py-3 text-center"
			style={{ backgroundColor: "#FAFAFA" }}
		>
			<div className="position-relative">
				<h2 className="font-size-32 font-weight-500 line-height-40">
					Finde und buche zuverlässige Handwerker
				</h2>
				<img
					src="/LandingPage/blue-underline.png"
					alt="Blue paint"
					className={styles.image}
				/>
			</div>
			<div className="d-flex justify-content-center py-2">
				{images.map((image, index) => (
					<div
						key={index}
						style={{
							width: "64px",
							height: "64px",
							marginLeft: index === 0 ? "0" : "-10px",
						}}
					>
						<img
							key={index}
							src={image}
							alt="User image"
							className="w-100 h-100 rounded-circle object-fit-cover"
							style={{
								border: "2px solid white",
							}}
						/>
					</div>
				))}
			</div>
			<p className="py-2">
				Schließe dich über 10.000 zufriedenen Haushalten und Unternehmen an, die
				uns vertrauen, um erfahrene Profis zu finden. Chatten, planen und
				erledigen – alles an einem Ort.
			</p>

			<button className="orange-btn">Jetz anmelden</button>
		</div>
	);
};

export default FindAndBookHandyman;
