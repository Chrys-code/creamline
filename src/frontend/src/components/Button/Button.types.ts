export interface ButtonProps {
	type: "submit" | "button";
	style?: ButtonStyle;
	disabled?: boolean;
	children?: React.ReactNode;
	onClick?: (e: React.MouseEvent) => void;
}

type ButtonStyle = "primary" | "secondary";
