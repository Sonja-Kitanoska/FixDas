import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

export default function BasicRating({
	rating,
	setRating,
}: {
	rating: number | null;
	setRating: React.Dispatch<React.SetStateAction<number | null>>;
}) {
	return (
		<Box sx={{ "& > legend": { mt: 2 } }}>
			<Rating
				name="half-rating"
				defaultValue={0}
				precision={0.5}
				style={{ fontSize: "30px", color: "#fa6100" }}
				value={rating}
				onChange={(_event, newValue) => {
					setRating(newValue);
				}}
				sx={{
					"& .MuiRating-label": {
						display: "block",
					},
				}}
			/>
		</Box>
	);
}
