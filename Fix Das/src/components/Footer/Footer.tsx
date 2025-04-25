import styles from "./Footer.module.css";

const Footer = () => {
	return (
		<>
			<div className="d-flex flex-column pt-5 container">
				<div className="d-flex justify-content-center align-items-center gap-4">
					<img src="/small-logo.svg" alt="" />
					<h6 className="font-size-18 font-weight-700">Mein Handwerker</h6>
				</div>

				<div
					className={`row justify-content-center text-center py-4 font-size-18 font-weight-400 ${styles.grayFont}`}
				>
					<p className="col-4">Lorem</p>
					<p className="col-4">Lorem</p>
					<p className="col-4">Lorem</p>
					<p className="col-4">Lorem</p>
					<p className="col-4">Lorem</p>
				</div>

				<div className="d-flex justify-content-center align-items-center gap-2 pb-4">
					<img
						src="/footer/social-media-icons/Facebook.svg"
						alt="Facebook logo"
					/>
					<img
						src="/footer/social-media-icons/Twitter.svg"
						alt="Twitter logo"
					/>
					<img
						src="/footer/social-media-icons/Instagram.svg"
						alt="Instagram logo"
					/>

					<img
						src="/footer/social-media-icons/LinkedIn.svg"
						alt="LinkedIn logo"
					/>
				</div>
			</div>
			<p
				className={`${styles.grayFont} text-center font-size-14 font-weight-400 pt-4 border-top`}
			>
				Copyright © {new Date().getFullYear()} Mein Hausmaister <br /> All
				Rights Reserved
			</p>
		</>
	);
};

export default Footer;
