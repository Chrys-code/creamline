import i18n from "../../../../configs/i18n";

export async function authTranslationLoader() {
	const translations = (await import("../i18n")).default;

	i18n.addResourceBundle("en", "auth", translations.en);
	i18n.addResourceBundle("hu", "auth", translations.hu);

	await i18n.loadNamespaces("auth");
}
