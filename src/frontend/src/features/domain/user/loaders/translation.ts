import i18n from "../../../../configs/i18n";

export async function userTranslationLoader() {
	const translations = (await import("../i18n")).default;

	i18n.addResourceBundle("en", "users", translations.en);
	i18n.addResourceBundle("hu", "users", translations.hu);

	await i18n.loadNamespaces("user");
}
