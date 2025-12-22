import i18n from "@/configs/i18n";

export async function profileTranslationLoader() {
	const translations = (await import("../i18n")).default;

	i18n.addResourceBundle("en", "profile", translations.en);
	i18n.addResourceBundle("hu", "profile", translations.hu);

	await i18n.loadNamespaces("profile");
}
