import i18n from "@/configs/i18n";

export async function storageTranslationLoader() {
	const translations = (await import("../i18n")).default;

	i18n.addResourceBundle("en", "storage", translations.en);
	i18n.addResourceBundle("hu", "storage", translations.hu);

	await i18n.loadNamespaces("storage");
}
