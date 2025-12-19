import type { DialogProps } from "./Dialog.types";
import styles from "./Dialog.module.scss";

import React, { useEffect, useRef } from "react";

import IconButton from "../base/iconButton/IconButton";

const MdClose = React.lazy(() =>
	import("react-icons/md").then((mod) => ({
		default: mod.MdClose,
	}))
);

const Dialog: React.FC<DialogProps> = ({
	title,
	isOpen = false,
	onClose,
	width = "20rem",
	children,
}: DialogProps) => {
	const internalRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (!internalRef) return;

		if (isOpen && !internalRef.current?.open) {
			internalRef.current?.showModal();
		}

		if (!isOpen && internalRef.current?.open) {
			internalRef.current?.close();
		}
	}, [isOpen, internalRef]);

	// Close on backdrop click
	const handleClick = (e: React.MouseEvent<HTMLDialogElement>) => {
		if (e.target === internalRef.current) {
			onClose();
		}
	};

	return (
		<dialog
			ref={internalRef}
			className={styles.container}
			style={{ width }}
			onClick={handleClick}
		>
			<div className={styles.dialogWrapper}>
				<div className={styles.dialogHeader}>
					<h1>{title}</h1>
					<IconButton onClick={() => onClose()} type="button" style="secondary">
						<MdClose size={"1.5rem"} />
					</IconButton>
				</div>
				{children}
			</div>
		</dialog>
	);
};

export default Dialog;
