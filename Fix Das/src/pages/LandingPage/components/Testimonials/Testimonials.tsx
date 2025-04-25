import styles from "./Testimonials.module.css";

const testimonials = [
	{
		id: crypto.randomUUID(),
		image: "/LandingPage/testimonials/client1.svg",
		name: "Barack Obama",
		location: "Dresden",
		stars: 5,
		comment:
			"Die App hat es einfach gemacht, einen Tischler zu finden. Er hat meinen Kleiderschrank und meinen Badezimmer-Schrank gebaut, und sie sehen fantastisch aus!",
		workImages: [
			"/LandingPage/testimonials/work-images/work1.svg",
			"/LandingPage/testimonials/work-images/work2.svg",
			"/LandingPage/testimonials/work-images/work3.svg",
			"/LandingPage/testimonials/work-images/work4.svg",
		],
	},
	{
		id: crypto.randomUUID(),
		image: "/LandingPage/testimonials/client3.svg",
		name: "Angela Merkel",
		location: "Hamburg",
		stars: 4,
		comment:
			"Die App hat es einfach gemacht, einen Tischler zu finden. Er hat meinen Kleiderschrank und meinen Badezimmer-Schrank gebaut, und sie sehen fantastisch aus!",
		workImages: [
			"/LandingPage/testimonials/work-images/work1.svg",
			"/LandingPage/testimonials/work-images/work2.svg",
		],
	},
	{
		id: crypto.randomUUID(),
		image: "/LandingPage/testimonials/client2.svg",
		name: "Gerhard Schröder",
		location: "Berlin",
		stars: 5,
		comment:
			"Die App hat es einfach gemacht, einen Tischler zu finden. Er hat meinen Kleiderschrank und meinen Badezimmer-Schrank gebaut, und sie sehen fantastisch aus!",
		workImages: [
			"/LandingPage/testimonials/work-images/work1.svg",
			"/LandingPage/testimonials/work-images/work2.svg",
			"/LandingPage/testimonials/work-images/work3.svg",
		],
	},
];
const Testimonials = () => {
	return (
		<div className={`${styles.lightOrangeBg} container py-3 pb-5`}>
			<div className="position-relative">
				<div className={styles.quatationImgWrapper}>
					<img
						src="/LandingPage/quotation-marks.svg"
						alt="Quotation marks"
						className={styles.quotationMarksImg}
					/>
				</div>
				<div className={styles.heading}>
					<h2 className={styles.title}>Echte Erfahrungen, echte Ergebnisse</h2>
					<p className="font-size-18">
						Erfahren Sie, wie unsere App Reparaturen und Verbesserungen für
						Menschen wie Sie erleichtert.
					</p>
				</div>
			</div>

			<div className={styles.testimonialCards}>
				{testimonials.map((testimonial) => (
					<div key={testimonial.id} className="bg-white p-3 rounded-3">
						<div className="d-flex gap-4 align-items-center">
							<div style={{ width: "60px", height: "60px" }}>
								<img
									src={testimonial.image}
									alt="User image"
									className="w-100 h-100 rounded-circle"
								/>
							</div>
							<div>
								<p
									className="font-size-14 font-weight-700 mb-0"
									style={{ color: "#2C2C2C" }}
								>
									{testimonial.name}
								</p>
								<p className="blue font-size-12 font-weight-400 mb-0">
									{testimonial.location}
								</p>
							</div>
						</div>
						<div className="d-flex my-2">
							{[...Array(testimonial.stars)].map((_, index) => (
								<img
									key={index}
									src="/LandingPage/testimonials/star.svg"
									alt="Star"
									style={{ width: "24px", height: "24px", marginRight: "2px" }}
								/>
							))}
						</div>
						<p>{testimonial.comment}</p>
						<div className={styles.scrollContainer}>
							{testimonial.workImages.map((image, index) => (
								<img
									key={index}
									src={image}
									alt="Image of the work"
									className={styles.scrollItem}
								/>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Testimonials;
