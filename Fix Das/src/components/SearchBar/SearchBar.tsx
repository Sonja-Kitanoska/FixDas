import styles from "./SearchBar.module.css";
import { IoSearch } from "react-icons/io5";

type SearchBarProps = {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
};
const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
	return (
		<div className={styles.inputWrapper}>
			{<IoSearch className={styles.icon} />}

			<input
				type="text"
				name="password"
				placeholder="Search"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				className={`form-control input-field ${styles.inputField}`}
			/>
			<img
				src="/LandingPage/filter-icon.svg"
				alt="filter icon"
				className={styles.filterIcon}
			/>
		</div>
	);
};

export default SearchBar;
