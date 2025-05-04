import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Role, User, UserState } from "../types/types";

export const useUserStore = create<UserState>()(
	persist(
		(set) => ({
			user: null as User | null,
			setUser: (user: User | null) => set({ user }),
			selectedRole: "client",
			setSelectedRole: (role: Role) => set({ selectedRole: role }),
			loading: false,
			setLoading: (loading) => set({ loading }),
			logout: () => set({ user: null }),
		}),
		{
			name: "user-storage",
		}
	)
);
