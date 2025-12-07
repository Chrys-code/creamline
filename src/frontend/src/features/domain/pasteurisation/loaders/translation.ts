import i18n from "../../../../configs/i18n";

export async function pasterisationTranslationLoader() {
	const translations = (await import("../i18n")).default;

	i18n.addResourceBundle("en", "pasteurisation", translations.en);
	i18n.addResourceBundle("hu", "pasteurisation", translations.hu);

	await i18n.loadNamespaces("pasteurisation");
}
