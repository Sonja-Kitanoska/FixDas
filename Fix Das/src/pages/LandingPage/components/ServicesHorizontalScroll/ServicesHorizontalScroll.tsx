import { useEffect, useRef, useState } from "react";
import styles from "./ServicesHorizontalScroll.module.css";
import { fetchCategories } from "../../../../api/categories";
import { Category } from "../../../../types/types";

const chunkArray = (
	arr: { name: string; image: string }[],
	size: number
): { name: string; image: string }[][] => {
	const chunks = [];
	for (let i = 0; i < arr.length; i += size) {
		chunks.push(arr.slice(i, i + size));
	}
	return chunks;
};

const ServicesHorizontalScroll = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const chunks = chunkArray(categories, 9);
	const scrollRef = useRef<HTMLDivElement>(null);
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		const getCategories = async () => {
			const fetchedCategories = await fetchCategories();
			setCategories(fetchedCategories);
		};
		getCategories();
	}, []);

	const scrollTo = (index: number) => {
		const scrollContainer = scrollRef.current;
		if (scrollContainer) {
			const scrollWidth = scrollContainer.offsetWidth;
			scrollContainer.scrollTo({
				left: scrollWidth * index,
				behavior: "smooth",
			});
			setActiveIndex(index);
		}
	};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const handleScroll = () => {
		const scrollContainer = scrollRef.current;
		if (scrollContainer) {
			const scrollWidth = scrollContainer.offsetWidth;
			const scrollLeft = scrollContainer.scrollLeft;
			const newIndex = Math.floor(scrollLeft / scrollWidth);
			if (newIndex !== activeIndex) {
				setActiveIndex(newIndex);
			}
		}
	};
	useEffect(() => {
		const scrollContainer = scrollRef.current;
		if (scrollContainer) {
			scrollContainer.addEventListener("scroll", handleScroll);
		}

		return () => {
			if (scrollContainer) {
				scrollContainer.removeEventListener("scroll", handleScroll);
			}
		};
	}, [activeIndex, handleScroll]);
	return (
		<section>
			<h2 className={`text-center ${styles.secondTitle}`}>
				Wir decken alles ab
			</h2>
			<div className={styles.scrollContainer} ref={scrollRef}>
				{chunks.map((group, index) => (
					<div className={styles.scrollItem} key={index}>
						<div className="row justify-content-start gy-2">
							{group.map((service, i) => (
								<div className="col-4 text-center" key={i}>
									<div className="rounded shadow-sm h-100 d-flex flex-column justify-content-center align-items-center gap-1 p-1">
										<div style={{ width: "60px", height: "60px" }}>
											<img
												src={service.image}
												alt={service.name}
												className="w-100 h-100 object-fit-contain"
											/>
										</div>
										<p className={`${styles.serviceName} mb-0`}>
											{service.name}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
			{/* Indicators */}
			<div className="d-flex justify-content-center mt-3 gap-2">
				{chunks.map((_, index) => (
					<button
						key={index}
						className={` ${
							index === activeIndex ? styles.activeIndicator : styles.indicator
						}`}
						onClick={() => scrollTo(index)}
					></button>
				))}
			</div>
		</section>
	);
};

export default ServicesHorizontalScroll;
