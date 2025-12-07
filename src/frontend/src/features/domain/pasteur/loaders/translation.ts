import i18n from "../../../../configs/i18n";

export async function pasteurTranslationLoader() {
	const translations = (await import("../i18n")).default;

	i18n.addResourceBundle("en", "pasteur", translations.en);
	i18n.addResourceBundle("hu", "pasteur", translations.hu);

	await i18n.loadNamespaces("pasteur");
}
