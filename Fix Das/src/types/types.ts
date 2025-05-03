export type Handyman = {
	id: `${string}-${string}-${string}-${string}-${string}`;
	image: string;
	name: string;
	location: string;
	stars: number;
	numberJobs?: number;
	numberReviews: number;
	categories: string[];
	description: string;
	workImages: string[];
	createdAt: string;
};

export type Testimonial = {
	id: number;
	name: string;
	location: string;
	image: string;
	stars: number;
	comment: string;
	workImages: string[];
};

export type ClientAddData = {
	title: string;
	description: string;
	location: string;
	images: (File | string)[];
	userId: string;
};
