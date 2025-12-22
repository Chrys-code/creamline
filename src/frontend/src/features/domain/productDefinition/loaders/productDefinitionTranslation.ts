import i18n from "@/configs/i18n";

export async function productDefinitionTranslationLoader() {
	const translations = (await import("../i18n")).default;

	i18n.addResourceBundle("en", "productDefinition", translations.en);
	i18n.addResourceBundle("hu", "productDefinition", translations.hu);

	await i18n.loadNamespaces("productDefinition");
}
