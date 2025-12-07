import i18n from "../../../../configs/i18n";

export async function userTranslationLoader() {
	const translations = (await import("../i18n")).default;

	i18n.addResourceBundle("en", "user", translations.en);
	i18n.addResourceBundle("hu", "user", translations.hu);

	await i18n.loadNamespaces("user");
}
