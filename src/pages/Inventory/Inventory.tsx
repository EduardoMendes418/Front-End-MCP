/** biome-ignore-all lint/a11y/useButtonType: <explanation> */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useERPStore } from "../../stores/erpStore";
import { Package, Plus, Search, Filter } from "lucide-react";

const Inventory: React.FC = () => {
	const { t } = useTranslation();
	const { products } = useERPStore();
	const [searchTerm, setSearchTerm] = useState("");

	const filteredProducts = products.filter(
		(product) =>
			product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			product.category.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<div className="space-y-6">
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				className="flex items-center justify-between"
			>
				<div>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
						{t("inventory")}
					</h1>
					<p className="text-gray-600 dark:text-gray-400 mt-1">
						Gerencie seu estoque e produtos
					</p>
				</div>
				<button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition-colors duration-200">
					<Plus size={20} />
					<span>Novo Produto</span>
				</button>
			</motion.div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
					className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
				>
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
								Total de Produtos
							</p>
							<p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
								{products.length}
							</p>
						</div>
						<div className="p-3 bg-blue-500 rounded-xl">
							<Package size={24} className="text-white" />
						</div>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
					className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
				>
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
								Baixo Estoque
							</p>
							<p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
								{products.filter((p) => p.stock < 10).length}
							</p>
						</div>
						<div className="p-3 bg-red-500 rounded-xl">
							<Package size={24} className="text-white" />
						</div>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
					className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
				>
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
								Valor Total
							</p>
							<p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
								R${" "}
								{products
									.reduce((acc, p) => acc + p.price * p.stock, 0)
									.toLocaleString()}
							</p>
						</div>
						<div className="p-3 bg-green-500 rounded-xl">
							<Package size={24} className="text-white" />
						</div>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
					className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
				>
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
								Categorias
							</p>
							<p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
								{new Set(products.map((p) => p.category)).size}
							</p>
						</div>
						<div className="p-3 bg-purple-500 rounded-xl">
							<Package size={24} className="text-white" />
						</div>
					</div>
				</motion.div>
			</div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.5 }}
				className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
			>
				<div className="flex items-center justify-between mb-6">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
						Todos os Produtos
					</h3>
					<div className="flex items-center space-x-4">
						<div className="relative">
							<Search
								size={20}
								className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
							/>
							<input
								type="text"
								placeholder="Buscar produtos..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
							/>
						</div>
						<button className="p-2 rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
							<Filter size={20} />
						</button>
					</div>
				</div>

				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b border-gray-200 dark:border-gray-700">
								<th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
									Produto
								</th>
								<th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
									Categoria
								</th>
								<th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
									Preço
								</th>
								<th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
									Estoque
								</th>
								<th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
									Status
								</th>
								<th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
									Ações
								</th>
							</tr>
						</thead>
						<tbody>
							{filteredProducts.map((product) => (
								<tr
									key={product.id}
									className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750"
								>
									<td className="py-3 px-4">
										<div className="flex items-center space-x-3">
											<div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
												{product.name.charAt(0)}
											</div>
											<span className="text-sm font-medium text-gray-900 dark:text-white">
												{product.name}
											</span>
										</div>
									</td>
									<td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
										{product.category}
									</td>
									<td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
										R$ {product.price.toLocaleString()}
									</td>
									<td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
										{product.stock} unidades
									</td>
									<td className="py-3 px-4">
										<span
											className={`px-2 py-1 rounded-full text-xs font-medium ${
												product.stock > 20
													? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
													: product.stock > 5
														? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
														: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
											}`}
										>
											{product.stock > 20
												? "Disponível"
												: product.stock > 5
													? "Baixo"
													: "Crítico"}
										</span>
									</td>
									<td className="py-3 px-4">
										<div className="flex items-center space-x-2">
											<button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
												Editar
											</button>
											<button className="text-red-500 hover:text-red-600 text-sm font-medium">
												Excluir
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</motion.div>
		</div>
	);
};

export default Inventory;
