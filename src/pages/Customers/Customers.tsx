/** biome-ignore-all lint/a11y/useButtonType: <explanation> */

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import type React from "react";
import { useTranslation } from "react-i18next";

const Customers: React.FC = () => {
	const { t } = useTranslation();

	const customers = [
		{
			id: 1,
			name: "João Silva",
			email: "joao@empresa.com",
			phone: "(11) 99999-9999",
			location: "São Paulo, SP",
			orders: 15,
			totalSpent: 25400,
			status: "active",
		},
		{
			id: 2,
			name: "Maria Santos",
			email: "maria@empresa.com",
			phone: "(11) 88888-8888",
			location: "Rio de Janeiro, RJ",
			orders: 8,
			totalSpent: 18200,
			status: "active",
		},
		{
			id: 3,
			name: "Pedro Oliveira",
			email: "pedro@empresa.com",
			phone: "(11) 77777-7777",
			location: "Belo Horizonte, MG",
			orders: 3,
			totalSpent: 5400,
			status: "inactive",
		},
	];

	return (
		<div className="space-y-6">
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				className="flex items-center justify-between"
			>
				<div>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
						{t("customers")}
					</h1>
					<p className="text-gray-600 dark:text-gray-400 mt-1">
						Gerencie seus clientes e relacionamentos
					</p>
				</div>
			</motion.div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{customers.map((customer, index) => (
					<motion.div
						key={customer.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.1 }}
						className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
					>
						<div className="flex items-center space-x-4 mb-4">
							<div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
								{customer.name
									.split(" ")
									.map((n) => n[0])
									.join("")}
							</div>
							<div>
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
									{customer.name}
								</h3>
								<span
									className={`px-2 py-1 rounded-full text-xs font-medium ${
										customer.status === "active"
											? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
											: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
									}`}
								>
									{customer.status === "active" ? "Ativo" : "Inativo"}
								</span>
							</div>
						</div>

						<div className="space-y-2 mb-4">
							<div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
								<Mail size={16} />
								<span>{customer.email}</span>
							</div>
							<div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
								<Phone size={16} />
								<span>{customer.phone}</span>
							</div>
							<div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
								<MapPin size={16} />
								<span>{customer.location}</span>
							</div>
						</div>

						<div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
							<div className="text-center">
								<p className="text-sm text-gray-600 dark:text-gray-400">
									Pedidos
								</p>
								<p className="text-lg font-semibold text-gray-900 dark:text-white">
									{customer.orders}
								</p>
							</div>
							<div className="text-center">
								<p className="text-sm text-gray-600 dark:text-gray-400">
									Total Gasto
								</p>
								<p className="text-lg font-semibold text-gray-900 dark:text-white">
									R$ {customer.totalSpent.toLocaleString()}
								</p>
							</div>
						</div>

						<div className="flex space-x-2 mt-4">
							<button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl text-sm font-medium transition-colors duration-200">
								Editar
							</button>
							<button className="flex-1 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-xl text-sm font-medium transition-colors duration-200">
								Ver Detalhes
							</button>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	);
};

export default Customers;
