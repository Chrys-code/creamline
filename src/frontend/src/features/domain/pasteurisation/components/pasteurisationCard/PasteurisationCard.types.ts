export interface PasteurisationCardProps {
	title: string;
	source_storage: string;
	target_storage: string;
	datetime: string;
	temperature: number;
	onClick: () => void;
}
