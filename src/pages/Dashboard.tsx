import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useERPStore } from "../stores/erpStore";
import {
	TrendingUp,
	Users,
	Package,
	DollarSign,
	ShoppingCart,
	Eye,
} from "lucide-react";
import {
	RevenueChart,
	SalesChart,
	PieChartComponent,
} from "../components/charts/DashboardCharts";

interface StatCardProps {
	icon: React.ElementType;
	title: string;
	value: string;
	change: number;
	delay: number;
	description?: string;
}

const StatCard: React.FC<StatCardProps> = ({
	icon: Icon,
	title,
	value,
	change,
	delay,
	description,
}) => (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ delay }}
		className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
	>
		<div className="flex items-center justify-between">
			<div className="flex-1">
				<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
					{title}
				</p>
				<p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
					{value}
				</p>
				{description && (
					<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
						{description}
					</p>
				)}
				<div
					className={`flex items-center mt-3 ${
						change >= 0 ? "text-green-500" : "text-red-500"
					}`}
				>
					<TrendingUp size={16} className="mr-1" />
					<span className="text-sm font-medium">
						{change >= 0 ? "+" : ""}
						{change}% em relação ao mês anterior
					</span>
				</div>
			</div>
			<div className="p-3 bg-blue-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
				<Icon size={24} className="text-white" />
			</div>
		</div>
	</motion.div>
);

const Dashboard: React.FC = () => {
	const { t } = useTranslation();
	const { dashboardData, users, products } = useERPStore();

	const stats = [
		{
			icon: DollarSign,
			title: t("revenue"),
			value: `R$ ${dashboardData.revenue.toLocaleString()}`,
			change: 12.5,
			delay: 0.1,
			description: "Receita total do mês",
		},
		{
			icon: ShoppingCart,
			title: t("orders"),
			value: dashboardData.orders.toString(),
			change: 8.3,
			delay: 0.2,
			description: "Pedidos processados",
		},
		{
			icon: Users,
			title: t("customers"),
			value: dashboardData.customers.toLocaleString(),
			change: 5.2,
			delay: 0.3,
			description: "Clientes ativos",
		},
		{
			icon: TrendingUp,
			title: t("growth"),
			value: `${dashboardData.growth}%`,
			change: 2.1,
			delay: 0.4,
			description: "Crescimento mensal",
		},
	];

	const recentActivities = [
		{
			id: 1,
			action: "Novo pedido #00123",
			client: "Cliente A",
			amount: 2500,
			time: "2 min atrás",
		},
		{
			id: 2,
			action: "Pedido entregue #00122",
			client: "Cliente B",
			amount: 1800,
			time: "1 hora atrás",
		},
		{
			id: 3,
			action: "Pagamento confirmado",
			client: "Cliente C",
			amount: 3200,
			time: "3 horas atrás",
		},
		{
			id: 4,
			action: "Novo cadastro",
			client: "Cliente D",
			amount: 0,
			time: "5 horas atrás",
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
						{t("dashboard")}
					</h1>
					<p className="text-gray-600 dark:text-gray-400 mt-1">
						{t("welcome")}, Admin Master! Aqui está o resumo do seu negócio.
					</p>
				</div>
				<div className="flex items-center space-x-3">
					<div className="text-right">
						<p className="text-sm text-gray-600 dark:text-gray-400">
							Equipe Online
						</p>
						<p className="font-semibold text-gray-900 dark:text-white">
							{users.length} membros
						</p>
					</div>
					<div className="flex -space-x-2">
						{users.slice(0, 3).map((user) => (
							<div
								key={user.id}
								className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white dark:border-gray-800"
								title={user.name}
							>
								{user.avatar}
							</div>
						))}
						{users.length > 3 && (
							<div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 text-xs font-bold border-2 border-white dark:border-gray-800">
								+{users.length - 3}
							</div>
						)}
					</div>
				</div>
			</motion.div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{stats.map((stat, index) => (
					<StatCard key={stat.title} {...stat} />
				))}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<RevenueChart />
				<SalesChart />
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-1">
					<PieChartComponent />
				</div>

				<div className="lg:col-span-2">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.8 }}
						className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 h-full"
					>
						<div className="flex items-center justify-between mb-6">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
								{t("recentActivity")}
							</h3>
							<button className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center space-x-1">
								<Eye size={16} />
								<span>Ver tudo</span>
							</button>
						</div>

						<div className="space-y-4">
							{recentActivities.map((activity) => (
								<motion.div
									key={activity.id}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: activity.id * 0.1 }}
									className="flex items-center space-x-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-750 rounded-xl transition-colors duration-200 group"
								>
									<div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white font-semibold group-hover:scale-110 transition-transform duration-300">
										{activity.id}
									</div>
									<div className="flex-1 min-w-0">
										<p className="font-medium text-gray-900 dark:text-white truncate">
											{activity.action}
										</p>
										<p className="text-sm text-gray-500 dark:text-gray-400">
											{activity.client}{" "}
											{activity.amount > 0 &&
												`• R$ ${activity.amount.toLocaleString()}`}
										</p>
									</div>
									<span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
										{activity.time}
									</span>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
			</div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 1 }}
				className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
			>
				<h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
					{t("topProducts")}
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
					{products.map((product) => (
						<div
							key={product.id}
							className="bg-gray-50 dark:bg-gray-750 rounded-xl p-4 hover:shadow-lg transition-all duration-300 group"
						>
							<div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold mb-3 group-hover:scale-110 transition-transform duration-300">
								{product.name.charAt(0)}
							</div>
							<h4 className="font-semibold text-gray-900 dark:text-white truncate">
								{product.name}
							</h4>
							<p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
								{product.category}
							</p>
							<div className="flex items-center justify-between">
								<span className="text-lg font-bold text-gray-900 dark:text-white">
									R$ {product.price.toLocaleString()}
								</span>
								<span
									className={`px-2 py-1 rounded-full text-xs font-medium ${
										product.stock > 20
											? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
											: product.stock > 5
												? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
												: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
									}`}
								>
									{product.stock} em estoque
								</span>
							</div>
						</div>
					))}
				</div>
			</motion.div>
		</div>
	);
};

export default Dashboard;
