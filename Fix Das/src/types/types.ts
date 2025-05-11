export type Role = "client" | "handyman";

export type User = {
	id: string;
	email: string | null;
	username: string | null;
	phone: string | null;
	location?: string;
	password?: string;
	role: Role;
	image?: string;
	createdAt?: string;
};

export interface UserState {
	user: User | null;
	setUser: (user: User | null) => void;
	selectedRole: Role;
	setSelectedRole: (role: Role) => void;
	loading: boolean;
	setLoading: (loading: boolean) => void;
	logout: () => void;
}

export type Handyman = {
	id: string;
	image: string;
	name: string;
	location: string;
	stars: number;
	numberJobs?: number;
	numberReviews: number;
	categories: string[];
	specialties: string[];
	description: string;
	workImages: string[];
	createdAt: string;
};

export type Specialty = {
	id: number;
	name: string;
};

export type Category = {
	id: number;
	name: string;
	image: string;
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
	id: string;
	title: string;
	description: string;
	location: string;
	images: (File | string)[];
	userId: string;
	createdAt: string;
};

export type ReviewFormData = {
	id: string;
	handymanId: string;
	proposalId: number | null;
	rating: string | null;
	comment: string | null;
	photos: (File | string)[];
	agreedToPublish: boolean;
	from: { name: string; id: string; location: string };
};

export type Proposal = {
	id: number;
	from: {
		id: string;
		name: string;
		role: Role;
	};
	to: {
		id: string;
		role: Role;
	};
	title: string;
	description: string;
	location: string;
	time: string;
	status: "pending" | "accepted" | "completed";
};

export type Request = {
	id: string;
	from: {
		id: string;
		name: string;
		role: Role;
	};
	to: {
		id: string;
		role: Role;
	};
	message: string;
	location: { address: string; lat: string; lon: string };
	time: string;
	date: string;
};
