import type React from "react";
import { useERPStore } from "../../stores/erpStore";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const { darkMode } = useERPStore();

	return (
		<div
			className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark" : ""}`}
		>
			<div className="flex bg-primary-50 dark:bg-dark-300 text-gray-900 dark:text-white">
				<Sidebar />
				<div className="flex-1 flex flex-col min-h-screen">
					<Header />
					<main className="flex-1 p-6 overflow-auto bg-primary-50 dark:bg-dark-300">
						{children}
					</main>
				</div>
			</div>
		</div>
	);
};

export default Layout;
