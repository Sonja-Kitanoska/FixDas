import { IoChevronBack } from "react-icons/io5";
import Navbar from "../../../components/Navbar/Navbar";
import styles from "./PostAdd.module.css";
import { LuMapPin } from "react-icons/lu";
import { TbCurrentLocation } from "react-icons/tb";
import { MdCloudUpload } from "react-icons/md";

const PostAdd = () => {
	const handleFileUploadClick = () => {
		const fileInput = document.getElementById("photoUpload");
		if (fileInput) {
			fileInput.click();
		}
	};
	return (
		<>
			<div className="container pt-3" style={{ paddingBottom: "80px" }}>
				<div className="d-flex justify-content-between align-items-center">
					<IoChevronBack style={{ fontSize: "20px" }} />
					<p className="orange mb-0 font-weight-700">Stelle ausschreiben</p>
					<img src="/notification-icon.svg" alt="Notifications icon" />
				</div>

				<form className="font-size-14 pt-5">
					{/* Title */}
					<div className="mb-3">
						<label htmlFor="title" className="mb-2">
							Welche Dienstleistung benötigen Sie?
							<span className="orange">*</span>
						</label>
						{/* <input
							type="text"
							id="title"
							name="title"
							placeholder="Ein Rohrleck reparieren..."
							className={`form-control input-field ${styles.inputField}`}
						/> */}
					</div>
					{/* Description */}
					<div className="mb-3">
						<label htmlFor="description" className="mb-2">
							Beschreibung:
						</label>
						<textarea
							rows={5}
							id="description"
							name="description"
							placeholder="Ein Rohr unter dem Waschbecken leckt Wasser. Ich habe bemerkt, dass sich Wasser auf dem Boden darum sammelt..."
							className="form-control"
						/>
					</div>
					{/* Location */}
					<div className="mb-3">
						<label htmlFor="location" className="mb-2">
							Standort:
							<span className="orange">*</span>
						</label>
						<div className={styles.inputWrapper}>
							<LuMapPin className={styles.icon} />
							<input
								type="text"
								id="location"
								name="location"
								placeholder="Gib deine Adresse ein"
								className={`form-control input-field ${styles.inputField} ${styles.inputFieldPaddingLeft}`}
							/>
							<span className={styles.locationIcon} role="button">
								<TbCurrentLocation color="#939393" />
							</span>
						</div>
					</div>
					{/* Uploade photos */}
					<div className="mb-3">
						<label htmlFor="photoUpload" className="mb-2">
							Fotos hochladen:
						</label>
						<div onClick={handleFileUploadClick}>
							<input
								type="file"
								id="photoUpload"
								name="photoUpload"
								accept="image/*"
								multiple
								style={{ display: "none" }}
							/>
							<div className={styles.uploadContent}>
								<span>
									<MdCloudUpload color="#FB8133" size={50} />
								</span>
								<p className="font-weight-600 font-size-10">
									Klicken Sie hier, um hochzuladen
								</p>
							</div>
						</div>
					</div>
					<button className="orange-btn">Post a job</button>
				</form>
			</div>

			<Navbar />
		</>
	);
};

export default PostAdd;
