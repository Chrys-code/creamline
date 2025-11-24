import type React from "react";
import type { LanguageSelectorProps } from "./LanguageSelector.types.ts";

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
	languageOptions,
	currentLanguageCode,
	onChange,
}: LanguageSelectorProps) => {
	return (
		<select name="language-selector" defaultValue={currentLanguageCode} onChange={onChange}>
			<option disabled>{"Lang"}</option>
			{languageOptions &&
				languageOptions.map((option) => (
					<option key={option.id} value={option.id}>
						{option.value}
					</option>
				))}
		</select>
	);
};

export default LanguageSelector;
