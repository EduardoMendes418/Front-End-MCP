// biome-ignore assist/source/organizeImports: <explanation>
import type React from "react";
import { useState, Suspense, useCallback, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuthStore } from "../../stores/authStore";
import { useNavigate } from "react-router-dom";
import { Globe, Lock, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Background from "../../components/Background";
import { useTranslation } from "react-i18next";

const Login: React.FC = () => {
	const { login } = useAuthStore();
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const { t, i18n } = useTranslation();

	const languages = useMemo(
		() => [
			{ code: "pt", name: t("portuguese"), flag: "🇧🇷" },
			{ code: "en", name: t("english"), flag: "🇺🇸" },
			{ code: "es", name: t("spanish"), flag: "🇪🇸" },
			{ code: "de", name: t("german"), flag: "🇩🇪" },
		],
		[t],
	);

	const handleLanguageChange = useCallback(
		(code: string) => {
			i18n.changeLanguage(code);
		},
		[i18n],
	);

	const mockUser = {
		email: "test@test.com",
		password: "password",
	};

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email(t("invalidEmail"))
				.required(t("required")),
			password: Yup.string().required(t("required")),
		}),
		onSubmit: (values) => {
			if (
				values.email === mockUser.email &&
				values.password === mockUser.password
			) {
				login();
				navigate("/");
			} else {
				setError(t("invalidCredentials"));
			}
		},
	});

	return (
		<div className="relative min-h-screen bg-gray-900 overflow-hidden">
			<Suspense fallback={null}>
				<Background />
			</Suspense>

			<div className="absolute top-4 right-4 z-10">
				<div className="relative group">
					<button
						type="button"
						className="p-2 rounded-xl transition-colors duration-300 hover:bg-white/10 text-white"
						aria-label="Change language"
						aria-haspopup="true"
						aria-expanded="false"
					>
						<Globe size={20} />
					</button>
					<ul
						className="absolute right-0 top-full mt-2 w-48 py-2 rounded-xl shadow-2xl border border-white/20 bg-white/5 backdrop-filter backdrop-blur-lg transition-all duration-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible"
					>
						{languages.map((lang) => (
							<li key={lang.code} role="none">
								<button
									type="button"
									role="menuitem"
									onClick={() => handleLanguageChange(lang.code)}
									className={`w-full px-4 py-2 text-left transition-colors duration-200 flex items-center space-x-3 ${
										i18n.language === lang.code
											? "text-purple-400 font-semibold"
											: "text-gray-200 hover:text-white"
									}`}
								>
									<span className="text-lg" aria-hidden="true">
										{lang.flag}
									</span>
									<span>{lang.name}</span>
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="flex items-center justify-center min-h-screen">
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="w-full max-w-md p-10 space-y-8 bg-white/5 backdrop-filter backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl"
				>
					<motion.div
						initial={{ opacity: 0, y: -50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="flex flex-col items-center mb-8"
					>
						<h2
							className="mt-6 text-3xl font-bold text-center text-white"
							style={{ fontFamily: "'Poppins', sans-serif" }}
						>
							{t("welcome")}
						</h2>
						<p className="mt-2 text-center text-gray-400">
							{t("loginSubtitle")}
						</p>
					</motion.div>

					{error && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							className="p-4 mt-6 text-sm text-red-200 bg-red-500/50 rounded-lg"
						>
							{error}
						</motion.div>
					)}

					<form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
							className="relative"
						>
							<Mail className="absolute w-6 h-6 text-gray-400 top-3.5 left-4" />
							<input
								id="email"
								name="email"
								type="email"
								placeholder={t("emailPlaceholder")}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.email}
								className="w-full py-3 pl-14 pr-4 text-white placeholder-gray-400 bg-white/10 border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
							/>
						</motion.div>
						{formik.touched.email && formik.errors.email ? (
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								className="text-sm text-red-400"
							>
								{formik.errors.email}
							</motion.div>
						) : null}

						<motion.div
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.6 }}
							className="relative"
						>
							<Lock className="absolute w-6 h-6 text-gray-400 top-3.5 left-4" />
							<input
								id="password"
								name="password"
								type="password"
								placeholder={t("passwordPlaceholder")}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.password}
								className="w-full py-3 pl-14 pr-4 text-white placeholder-gray-400 bg-white/10 border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
							/>
						</motion.div>
						{formik.touched.password && formik.errors.password ? (
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								className="text-sm text-red-400"
							>
								{formik.errors.password}
							</motion.div>
						) : null}

						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<input
									id="rememberMe"
									name="rememberMe"
									type="checkbox"
									onChange={formik.handleChange}
									checked={formik.values.rememberMe}
									className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
								/>
								<label
									htmlFor="rememberMe"
									className="block ml-2 text-sm text-gray-400"
								>
									{t("rememberMe")}
								</label>
							</div>
							<div className="text-sm">
								<a
									href="/forgot-password"
									className="font-medium text-purple-400 hover:text-purple-300"
								>
									{t("forgotPassword")}
								</a>
							</div>
						</div>

						<motion.div
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.8 }}
						>
							<button
								type="submit"
								className="w-full px-3 py-3 text-lg font-bold text-white bg-purple-600 border border-transparent rounded-xl shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
							>
								{t("signIn")}
							</button>
						</motion.div>
					</form>

					<p className="mt-8 text-sm text-center text-gray-400">
						{t("noAccount")}{" "}
						<a
							href="/signup"
							className="font-medium text-purple-400 hover:text-purple-300"
						>
							{t("signUp")}
						</a>
					</p>
				</motion.div>
			</div>
		</div>
	);
};

export default Login;
