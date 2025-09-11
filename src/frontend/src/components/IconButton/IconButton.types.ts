export interface IconButtonProps {
	style?: "primary" | "secondary";
	type?: "button" | "submit";
	disabled?: boolean;
	children: React.ReactNode;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}