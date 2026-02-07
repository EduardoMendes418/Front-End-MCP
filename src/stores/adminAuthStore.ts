import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AdminAuthState {
	isAdminAuthenticated: boolean;
	adminLogin: () => void;
	adminLogout: () => void;
}

export const useAdminAuthStore = create<AdminAuthState>()(
	persist(
		(set) => ({
			isAdminAuthenticated: false,
			adminLogin: () => set({ isAdminAuthenticated: true }),
			adminLogout: () => {
				set({ isAdminAuthenticated: false });
				window.localStorage.removeItem("admin-auth-storage");
			},
		}),
		{
			name: "admin-auth-storage", // name of the item in the storage (must be unique)
		},
	),
);
