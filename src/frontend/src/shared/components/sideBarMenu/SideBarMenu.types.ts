import type { Dispatch } from "react";
import type React from "react";
import type { NAVIGATION_ROUTE } from "../../types";

export interface MobileNavProps {
	options: Record<string, NAVIGATION_ROUTE>;
	isOpen: boolean;
	setIsOpen: Dispatch<React.SetStateAction<boolean>>;
}
