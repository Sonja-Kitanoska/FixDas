import { useLocation, useNavigate } from "react-router-dom";
import styles from "./SearchBar.module.css";
import { IoSearch } from "react-icons/io5";

type SearchBarProps = {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	redirectOnEnter?: boolean;
};
const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
	const navigate = useNavigate();
	const location = useLocation();

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			const encodedQuery = encodeURIComponent(searchQuery);

			if (location.pathname === "/") {
				navigate(`/find-handyman?query=${encodedQuery}`);
			} else if (location.pathname === "/homepage") {
				navigate(`/homepage?query=${encodedQuery}`, { replace: true });
			} else {
				navigate(`/find-handyman?query=${encodedQuery}`);
			}
		}
	};
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const handleFilterClick = () => {
		navigate("/filter", { state: { from: location.pathname } });
	};

	return (
		<div className={styles.inputWrapper}>
			{<IoSearch className={styles.icon} />}

			<input
				type="text"
				name="password"
				placeholder="Search"
				value={searchQuery}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				className={`form-control input-field ${styles.inputField}`}
			/>
			<img
				src="/LandingPage/filter-icon.svg"
				alt="filter icon"
				className={styles.filterIcon}
				onClick={handleFilterClick}
			/>
		</div>
	);
};

export default SearchBar;
