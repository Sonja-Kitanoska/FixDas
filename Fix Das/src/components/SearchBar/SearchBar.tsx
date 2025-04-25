import styles from "./SearchBar.module.css";

import { IoSearch } from "react-icons/io5";
const SearchBar = () => {
	return (
		<div className="container">
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
		</div>
	);
};

export default SearchBar;
