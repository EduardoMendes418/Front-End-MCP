import React from "react";
import { useERPStore } from "../../stores/erpStore";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const { darkMode } = useERPStore();

	return (
		<div
			className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark" : ""}`}
		>
			<div className="flex bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
				<Sidebar />
				<div className="flex-1 flex flex-col min-h-screen">
					<Header />
					<main className="flex-1 p-6 overflow-auto bg-gray-50 dark:bg-gray-900">
						{children}
					</main>
				</div>
			</div>
		</div>
	);
};

export default Layout;
