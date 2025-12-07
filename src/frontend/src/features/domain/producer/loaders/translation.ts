import i18n from "../../../../configs/i18n";

export async function producerTranslationLoader() {
	const translations = (await import("../i18n")).default;

	i18n.addResourceBundle("en", "producer", translations.en);
	i18n.addResourceBundle("hu", "producer", translations.hu);

	await i18n.loadNamespaces("producer");
}
