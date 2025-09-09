export interface IconButtonProps {
	style?: "primary" | "secondary";
	type?: "button" | "submit";
	disabled?: boolean;
	children: React.ReactNode;
}