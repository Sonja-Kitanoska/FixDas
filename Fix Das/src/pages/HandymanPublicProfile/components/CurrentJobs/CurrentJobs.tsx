import styles from "./CurrentJobs.module.css";

const images = [
	"/PublicProfileHandyman/plumbing-repair-service 1.png",
	"/PublicProfileHandyman/plumbing-repair-service 1.png",
	"/PublicProfileHandyman/plumbing-repair-service 1.png",
];

const CurrentJobs = () => {
	return (
		<div className="py-3">
			<h3 className="font-size-20 font-weight-700">Aktuelle Arbeiten</h3>

			<div className={styles.scrollContainer}>
				{images.map((image) => (
					<div key={crypto.randomUUID()} className={styles.scrollItem}>
						<img src={image} alt="" />
					</div>
				))}
			</div>
		</div>
	);
};

export default CurrentJobs;
