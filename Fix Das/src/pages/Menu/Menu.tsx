import { IoCloseSharp } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Menu.module.css";
import { useEffect, useState } from "react";
import { fetchCategories } from "../../api/categories";
import { Category } from "../../types/types";

const Menu = () => {
	const navigate = useNavigate();
	const [categories, setCategories] = useState<Category[]>([]);
	const [query, setQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");

	useEffect(() => {
		const getCategories = async () => {
			const data: Category[] = await fetchCategories();
			setCategories(data);
		};

		getCategories();
	}, []);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const params = new URLSearchParams();
		if (query) params.set("query", query);
		if (selectedCategory) params.set("categories", selectedCategory);
		navigate(`/find-handyman?${params.toString()}`);
	};
	return (
		<div className="container py-2 vh-100">
			<div className="d-flex justify-content-between align-items-center">
				<img src="/small-logo.svg" alt="Logo" />
				<IoCloseSharp
					style={{ fontSize: "30px" }}
					onClick={() => navigate("/")}
				/>
			</div>
			<div className="font-size-32 d-flex flex-column align-items-center">
				<NavLink
					to={"/menu"}
					className={({ isActive }) =>
						`text-decoration-none ${isActive ? "orange" : styles.grayColor}`
					}
				>
					<p>Suchen</p>
				</NavLink>
				<NavLink
					to={"/find-handyman"}
					className={({ isActive }) =>
						`text-decoration-none ${isActive ? "orange" : styles.grayColor}`
					}
				>
					<p>Inserent</p>
				</NavLink>
				<NavLink
					to={"/sign-in"}
					className={({ isActive }) =>
						`text-decoration-none ${isActive ? "orange" : styles.grayColor}`
					}
				>
					<p>Anmelden</p>
				</NavLink>
				<NavLink
					to={"/sign-up"}
					className={({ isActive }) =>
						`text-decoration-none ${isActive ? "orange" : styles.grayColor}`
					}
				>
					<p>Registrieren</p>
				</NavLink>
			</div>

			<form className="py-4" onSubmit={handleSubmit}>
				<div>
					<input
						type="text"
						className={`form-control input-field ${styles.inputField} mb-3`}
						placeholder="Seek"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
				</div>
				<div className="mb-4">
					<select
						className={`${styles.inputField} form-select`}
						value={selectedCategory}
						onChange={(e) => setSelectedCategory(e.target.value)}
					>
						<option value="" style={{ color: "#939393" }}>
							Kategorie
						</option>
						{categories.map((category) => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))}
					</select>
				</div>
				<button className="orange-btn" style={{ padding: "18px 10px" }}>
					Suchen
				</button>
			</form>
		</div>
	);
};

export default Menu;
