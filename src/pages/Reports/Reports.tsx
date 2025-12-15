/** biome-ignore-all lint/a11y/useButtonType: <explanation> */
/** biome-ignore-all lint/a11y/noLabelWithoutControl: <explanation> */
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FileText, Download, Filter, Calendar } from "lucide-react";

const Reports: React.FC = () => {
	const { t } = useTranslation();

	const reports = [
		{
			id: 1,
			title: "Relatório de Vendas Mensal",
			description: "Análise detalhada das vendas do mês atual",
			date: "15 Jan 2024",
			type: "Vendas",
			size: "2.4 MB",
		},
		{
			id: 2,
			title: "Relatório de Estoque",
			description: "Situação atual do estoque e alertas",
			date: "14 Jan 2024",
			type: "Estoque",
			size: "1.8 MB",
		},
		{
			id: 3,
			title: "Relatório Financeiro",
			description: "Demonstrativo financeiro completo",
			date: "13 Jan 2024",
			type: "Financeiro",
			size: "3.2 MB",
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
						{t("reports")}
					</h1>
					<p className="text-gray-600 dark:text-gray-400 mt-1">
						Acesse e gere relatórios do sistema
					</p>
				</div>
			</motion.div>

			<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					className="lg:col-span-1 space-y-4"
				>
					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
						<h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
							Filtros
						</h3>
						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									Tipo de Relatório
								</label>
								<select className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:border-blue-500">
									<option>Todos</option>
									<option>Vendas</option>
									<option>Estoque</option>
									<option>Financeiro</option>
									<option>Clientes</option>
								</select>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									Período
								</label>
								<div className="flex space-x-2">
									<input
										type="date"
										className="flex-1 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:border-blue-500"
									/>
									<input
										type="date"
										className="flex-1 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:border-blue-500"
									/>
								</div>
							</div>
							<button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl flex items-center justify-center space-x-2 transition-colors duration-200">
								<Filter size={16} />
								<span>Aplicar Filtros</span>
							</button>
						</div>
					</div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
						className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
					>
						<h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
							Gerar Novo Relatório
						</h3>
						<button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors duration-200">
							<FileText size={20} />
							<span className="font-medium">Gerar Relatório</span>
						</button>
					</motion.div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					className="lg:col-span-3"
				>
					<div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
						<h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
							Relatórios Disponíveis
						</h3>
						<div className="space-y-4">
							{reports.map((report, index) => (
								<motion.div
									key={report.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1 }}
									className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-200"
								>
									<div className="flex items-center space-x-4">
										<div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white">
											<FileText size={24} />
										</div>
										<div>
											<h4 className="font-semibold text-gray-900 dark:text-white">
												{report.title}
											</h4>
											<p className="text-sm text-gray-600 dark:text-gray-400">
												{report.description}
											</p>
											<div className="flex items-center space-x-4 mt-1">
												<span className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
													<Calendar size={12} />
													<span>{report.date}</span>
												</span>
												<span className="text-xs text-gray-500 dark:text-gray-400">
													{report.type}
												</span>
												<span className="text-xs text-gray-500 dark:text-gray-400">
													{report.size}
												</span>
											</div>
										</div>
									</div>
									<div className="flex items-center space-x-2">
										<button className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200">
											<Download size={20} />
										</button>
										<button className="p-2 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
											<FileText size={20} />
										</button>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default Reports;
