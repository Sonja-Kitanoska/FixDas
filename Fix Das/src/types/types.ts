export type Role = "client" | "handyman";

export type User = {
	id: string;
	email: string | null;
	username: string | null;
	phone: string | null;
	location?: string;
	password?: string;
	oldPassword?: string;
	role: Role;
	image?: string;
	createdAt?: string;
	profileImage?: string | File;
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
	profession: string;
	location: string;
	stars: number;
	jobsDone: number;
	numberReviews: number;
	categories: string[];
	specialties: string[];
	description: string;
	workImages: string[];
	unavailableDates?: string[];
	createdAt: string;
};

export interface HandymanAd {
	id: string;
	image: string;
	name: string;
	profession: string;
	location: string;
	stars: number;
	jobsDone: number;
	numberReviews: number;
	categories: string[];
	specialties: string[];
	description: string;
	workImages: string[];
	createdAt: string;
}

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
	image?: string;
	description: string;
	location: {
		address: string;
		lat: number;
		lon: number;
	};
	images: (File | string)[];
	isUrgent?: boolean;
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
	from: {
		name: string;
		image: string;
		id: string;
		location: string | undefined;
	};
};

export type Proposal = {
	id: number;
	from: {
		id: string;
		name: string;
		role: Role;
		lat: number;
		lon: number;
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

export type ClientRequest = {
	id: string;
	from: {
		id: string | undefined;
		name: string | null | undefined;
		role: Role;
	};
	to: {
		id: string | undefined;
		role: Role;
	};
	message: string;
	location: { address: string; lat: number | null; lon: number | null };
	time: string;
	date: string;
};

export interface Place {
	display_name: string;
	place_id: string;
	lat: string;
	lon: string;
}
