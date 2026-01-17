import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const ForgotPassword: React.FC = () => {
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			email: "",
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email("Invalid email address")
				.required("Required"),
		}),
		onSubmit: (values) => {
			// Here you would typically handle the forgot password logic,
			// for example, by making an API call to send a password reset email.
			// For this example, we'll just navigate to the login page.
			navigate("/login");
		},
	});

	return (
		<div className="flex items-center justify-center h-screen bg-gray-100">
			<div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
				<h2 className="text-2xl font-bold text-center text-gray-900">
					Forgot Password
				</h2>
				<form className="space-y-6" onSubmit={formik.handleSubmit}>
					<div>
						<label
							htmlFor="email"
							className="text-sm font-medium text-gray-700"
						>
							Email
						</label>
						<input
							id="email"
							name="email"
							type="email"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.email}
							className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
						{formik.touched.email && formik.errors.email ? (
							<div className="text-sm text-red-600">
								{formik.errors.email}
							</div>
						) : null}
					</div>
					<div>
						<button
							type="submit"
							className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Send password reset email
						</button>
					</div>
				</form>
				<p className="text-sm text-center text-gray-600">
					Remember your password?{" "}
					<a
						href="/login"
						className="font-medium text-indigo-600 hover:text-indigo-500"
					>
						Sign in
					</a>
				</p>
			</div>
		</div>
	);
};

export default ForgotPassword;
