export interface DropdownProps {
	id: string;
	name: string;
	options: { id: string, value: string }[];

	label?: string;
	info?: string;
	error?: string | null;
	disabled?: boolean;

	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}