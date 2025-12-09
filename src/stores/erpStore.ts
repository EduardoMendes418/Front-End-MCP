import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ERPState, User, Product, DashboardData, Notification } from "../types";

export const useERPStore = create<ERPState>()(
	persist(
		(set) => ({
			darkMode: false,
			toggleTheme: () => set((state) => ({ darkMode: !state.darkMode })),

			users: [
				{
					id: 1,
					name: "Admin Master",
					email: "admin@erp.com",
					role: "admin",
					avatar: "👨‍💼",
					department: "TI",
				},
				{
					id: 2,
					name: "Gerente Vendas",
					email: "vendas@erp.com",
					role: "manager",
					avatar: "👩‍💼",
					department: "Vendas",
				},
				{
					id: 3,
					name: "Analista Financeiro",
					email: "financeiro@erp.com",
					role: "analyst",
					avatar: "👨‍💻",
					department: "Financeiro",
				},
			] as User[],

			dashboardData: {
				revenue: 125000,
				orders: 284,
				customers: 1562,
				growth: 12.5,
			} as DashboardData,

			products: [
				{
					id: 1,
					name: "Notebook Pro",
					category: "Tecnologia",
					price: 2500,
					stock: 45,
				},
				{
					id: 2,
					name: "Smartphone Max",
					category: "Tecnologia",
					price: 1200,
					stock: 89,
				},
				{
					id: 3,
					name: "Tablet Lite",
					category: "Tecnologia",
					price: 800,
					stock: 23,
				},
				{
					id: 4,
					name: 'Monitor 24"',
					category: "Tecnologia",
					price: 900,
					stock: 15,
				},
				{
					id: 5,
					name: "Teclado Mecânico",
					category: "Periféricos",
					price: 300,
					stock: 67,
				},
			] as Product[],

			notifications: [
				{
					id: 1,
					message: "Novo pedido recebido #00123",
					type: "info",
					read: false,
					timestamp: new Date("2024-01-15T10:30:00"),
				},
				{
					id: 2,
					message: "Estoque baixo: Tablet Lite",
					type: "warning",
					read: false,
					timestamp: new Date("2024-01-15T09:15:00"),
				},
				{
					id: 3,
					message: "Meta de vendas atingida!",
					type: "success",
					read: true,
					timestamp: new Date("2024-01-14T16:45:00"),
				},
			] as Notification[],

			addUser: (user) =>
				set((state) => ({
					users: [
						...state.users,
						{
							...user,
							id: Math.max(...state.users.map((u) => u.id), 0) + 1,
						},
					],
				})),

			updateUser: (id, updatedUser) =>
				set((state) => ({
					users: state.users.map((user) =>
						user.id === id ? { ...user, ...updatedUser } : user,
					),
				})),

			deleteUser: (id) =>
				set((state) => ({
					users: state.users.filter((user) => user.id !== id),
				})),

			addNotification: (notification) =>
				set((state) => ({
					notifications: [
						{
							id: Math.max(...state.notifications.map((n) => n.id), 0) + 1,
							...notification,
							read: false,
							timestamp: new Date(),
						},
						...state.notifications,
					],
				})),

			markNotificationAsRead: (id) =>
				set((state) => ({
					notifications: state.notifications.map((notif) =>
						notif.id === id ? { ...notif, read: true } : notif,
					),
				})),

			clearNotifications: () => set({ notifications: [] }),
		}),
		{
			name: "erp-storage",
		},
	),
);
