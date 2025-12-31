import type React from "react";
import type { ConfirmationDialogFormProps } from "./ConfirmationDialogForm.types";
import styles from "./ConfirmationDialogForm.module.scss";

import Button from "../base/button";
import Form from "../base/form";

import { useTypedTranslation } from "@/shared/hooks/useTypedTranslation/useTypedTranslation";

const ConfirmationDialogForm: React.FC<ConfirmationDialogFormProps> = ({
	title,
	message,
	onClose,
	onSubmit,
}: ConfirmationDialogFormProps) => {
	const tCommon = useTypedTranslation("common");

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit();
		onClose();
	};

	const renderFormActions = () => {
		return (
			<>
				<Button style="secondary" type="button" onClick={() => onClose()}>
					{tCommon("common.cancel")}
				</Button>
				<Button style="primary" type="submit">
					{tCommon("common.save")}
				</Button>
			</>
		);
	};

	return (
		<Form onSubmit={handleFormSubmit} actionElements={renderFormActions()} type="dialog">
			<section className={styles.center}>
				<h2>{title}</h2>
				<p>{message}</p>
			</section>
		</Form>
	);
};

export default ConfirmationDialogForm;
