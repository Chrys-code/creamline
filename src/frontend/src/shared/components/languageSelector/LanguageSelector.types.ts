import type React from "react";

export interface LanguageSelectorProps {
	languageOptions: { id: string; value: string }[];
	currentLanguageCode: string;
	onChange: (_e: React.ChangeEvent<HTMLSelectElement>) => void;
}
