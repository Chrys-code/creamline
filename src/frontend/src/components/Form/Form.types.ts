export interface FormProps {
	children: React.ReactNode;
	onSubmit: (e: React.FormEvent) => Promise<any>;
}