import React from "react";
import { motion } from "framer-motion";
import {
	AreaChart,
	Area,
	BarChart,
	Bar,
	PieChart,
	Pie,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Legend,
} from "recharts";

const revenueData = [
	{ month: "Jan", revenue: 4000, profit: 2400 },
	{ month: "Fev", revenue: 3000, profit: 1398 },
	{ month: "Mar", revenue: 9800, profit: 2000 },
	{ month: "Abr", revenue: 3908, profit: 2780 },
	{ month: "Mai", revenue: 4800, profit: 1890 },
	{ month: "Jun", revenue: 3800, profit: 2390 },
];

const salesData = [
	{ product: "Notebook", sales: 4000, growth: 15 },
	{ product: "Smartphone", sales: 3000, growth: 8 },
	{ product: "Tablet", sales: 2000, growth: 12 },
	{ product: "Acessórios", sales: 2780, growth: 25 },
];

const pieData = [
	{ name: "Tecnologia", value: 400 },
	{ name: "Escritório", value: 300 },
	{ name: "Móveis", value: 200 },
	{ name: "Outros", value: 100 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

interface CustomTooltipProps {
	active?: boolean;
	payload?: any[];
	label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
	active,
	payload,
	label,
}) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
				<p className="font-semibold text-gray-900 dark:text-white">{label}</p>
				{payload.map((entry, index) => (
					<p key={entry.dataKey} style={{ color: entry.color }}>
						{entry.name}:{" "}
						{entry.value.toLocaleString("pt-BR", {
							style: "currency",
							currency: "BRL",
						})}
					</p>
				))}
			</div>
		);
	}
	return null;
};

export const RevenueChart: React.FC = () => (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ delay: 0.2 }}
		className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
	>
		<h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
			Receita e Lucro
		</h3>
		<ResponsiveContainer width="100%" height={300}>
			<AreaChart data={revenueData}>
				<CartesianGrid strokeDasharray="3 3" className="opacity-30" />
				<XAxis dataKey="month" />
				<YAxis />
				<Tooltip content={<CustomTooltip />} />
				<Area
					type="monotone"
					dataKey="revenue"
					stackId="1"
					stroke="#3b82f6"
					fill="#3b82f6"
					fillOpacity={0.3}
					name="Receita"
				/>
				<Area
					type="monotone"
					dataKey="profit"
					stackId="2"
					stroke="#10b981"
					fill="#10b981"
					fillOpacity={0.3}
					name="Lucro"
				/>
			</AreaChart>
		</ResponsiveContainer>
	</motion.div>
);

export const SalesChart: React.FC = () => (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ delay: 0.4 }}
		className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
	>
		<h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
			Vendas por Produto
		</h3>
		<ResponsiveContainer width="100%" height={300}>
			<BarChart data={salesData}>
				<CartesianGrid strokeDasharray="3 3" className="opacity-30" />
				<XAxis dataKey="product" />
				<YAxis />
				<Tooltip content={<CustomTooltip />} />
				<Bar dataKey="sales" radius={[4, 4, 0, 0]} name="Vendas">
					{salesData.map((entry, index) => (
						<Cell key={entry.product} fill={COLORS[index % COLORS.length]} />
					))}
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	</motion.div>
);

export const PieChartComponent: React.FC = () => (
	<motion.div
		initial={{ opacity: 0, scale: 0.9 }}
		animate={{ opacity: 1, scale: 1 }}
		transition={{ delay: 0.6 }}
		className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
	>
		<h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
			Distribuição por Categoria
		</h3>
		<ResponsiveContainer width="100%" height={300}>
			<PieChart>
				<Pie
					data={pieData}
					cx="50%"
					cy="50%"
					labelLine={false}
					label={({ name, percent }) =>
						`${name} ${(percent * 100).toFixed(0)}%`
					}
					outerRadius={80}
					fill="#8884d8"
					dataKey="value"
				>
					{pieData.map((entry, index) => (
						<Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				<Tooltip content={<CustomTooltip />} />
				<Legend />
			</PieChart>
		</ResponsiveContainer>
	</motion.div>
);
