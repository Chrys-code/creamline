export interface ButtonProps {
	type: ButtonType;
	disabled?: boolean;
	children?: React.ReactNode;
	onClick?: (e: React.MouseEvent) => void;
}

type ButtonType = "primary" | "secondary";
