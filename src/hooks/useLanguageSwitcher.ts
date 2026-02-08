import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

export const useLanguageSwitcher = () => {
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

	return { languages, handleLanguageChange, currentLanguage: i18n.language };
};