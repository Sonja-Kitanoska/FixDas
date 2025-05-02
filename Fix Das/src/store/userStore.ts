import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Role = "client" | "handyman";

type User = {
	id: string;
	email: string | null;
	username: string | null;
	role: Role;
};

export interface UserState {
	user: User | null;
	setUser: (user: User | null) => void;
	selectedRole: Role;
	setSelectedRole: (role: Role) => void;
	// loading: boolean;
	// setLoading: (loading: boolean) => void;
	logout: () => void;
}

export const useUserStore = create<UserState>()(
	persist(
		(set) => ({
			user: null as User | null,
			setUser: (user: User | null) => set({ user }),
			selectedRole: "client",
			setSelectedRole: (role: Role) => set({ selectedRole: role }),
			// loading: true,
			// setLoading: (loading) => set({ loading }),
			logout: () => set({ user: null }),
		}),
		{
			name: "user-storage",
		}
	)
);
