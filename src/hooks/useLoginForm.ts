import { useState, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore"; // Assuming authStore is one level up

export const useLoginForm = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { login } = useAuthStore();
	const [error, setError] = useState<string | null>(null);

	const mockUser = {
		email: "test@test.com",
		password: "password",
	};

	const validationSchema = Yup.object({
		email: Yup.string().email(t("invalidEmail")).required(t("required")),
		password: Yup.string().required(t("required")),
	});

	const onSubmit = useCallback(
		(values: { email: string; password: string; rememberMe: boolean }) => {
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
		[login, navigate, t],
	);

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
		validationSchema,
		onSubmit,
	});

	return { formik, error };
};