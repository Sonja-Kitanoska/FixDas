import ServicesHorizontalScroll from "../ServicesHorizontalScroll/ServicesHorizontalScroll";
import styles from "./ClientLandingPage.module.css";
import { IoSearch } from "react-icons/io5";

const ClientLandingPage = () => {
	return (
		<>
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
				<div className={styles.inputWrapper}>
					{<IoSearch className={styles.icon} />}

					<input
						type="text"
						name="password"
						placeholder="Search"
						className={`form-control input-field mb-3 ${styles.inputField}`}
					/>
					<img
						src="/LandingPage/filter-icon.svg"
						alt="filter icon"
						className={styles.filterIcon}
					/>
				</div>
			</section>
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

			<ServicesHorizontalScroll />
		</>
	);
};

export default ClientLandingPage;
