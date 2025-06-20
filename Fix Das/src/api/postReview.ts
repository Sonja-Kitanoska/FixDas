import { ReviewFormData } from "../types/types";

const BASE_URL = "http://localhost:5000";

const resizeAndConvertToBase64 = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = () => {
			const img = new Image();
			img.src = reader.result as string;

			img.onload = () => {
				const canvas = document.createElement("canvas");
				const MAX_WIDTH = 800;
				const scaleSize = MAX_WIDTH / img.width;

				canvas.width = MAX_WIDTH;
				canvas.height = img.height * scaleSize;

				const ctx = canvas.getContext("2d");
				if (!ctx) return reject("Canvas context not available");

				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

				// Quality from 0.0 to 1.0
				const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
				resolve(compressedBase64);
			};

			img.onerror = (error) => reject(error);
		};

		reader.onerror = (error) => reject(error);
	});
};

export const postReview = async (data: ReviewFormData) => {
	const base64Images = await Promise.all(
		data.photos.map((img) => {
			if (img instanceof File) {
				return resizeAndConvertToBase64(img);
			} else {
				return Promise.resolve(img);
			}
		})
	);
	const body = {
		handymanId: data.handymanId,
		proposalId: data.proposalId,
		rating: data.rating,
		comment: data.comment,
		photos: base64Images,
		agreedToPublish: data.agreedToPublish,
		from: {
			name: data.from.name,
			image: data.from.image,
			id: data.from.id,
			location: data.from.location,
		},
	};

	try {
		const response = await fetch(`${BASE_URL}/reviews`, {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(body),
		});
		if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
		return await response.json();
	} catch (err) {
		console.error("Error posting review:", err);
		throw err;
	}
};
