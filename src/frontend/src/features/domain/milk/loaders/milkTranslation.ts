import i18n from "@/configs/i18n";

export async function milkTranslationLoader() {
	const translations = (await import("../i18n")).default;

	i18n.addResourceBundle("en", "milkCollection", translations.en);
	i18n.addResourceBundle("hu", "milkCollection", translations.hu);

	await i18n.loadNamespaces("milkCollection");
}
