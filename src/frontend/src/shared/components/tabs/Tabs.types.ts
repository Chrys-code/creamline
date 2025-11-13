export interface TabsProps {
	pages: TabPage[];
}

export type TabPage = {
	title: string;
	isSelected?: boolean;
	onClick: () => void;
};
