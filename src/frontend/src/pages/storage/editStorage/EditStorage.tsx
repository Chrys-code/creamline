import type React from "react";
import type { Storage } from "@/features/domain/storage/types";

import PageHeader from "@/shared/components/pageHeader";
import StorageForm from "@/features/domain/storage/forms/storageForm";

import { useLoaderData } from "react-router";
import { useTypedTranslation } from "@/shared/hooks/useTypedTranslation/useTypedTranslation";

const EditStorage: React.FC = () => {
	const { storage, storageTypeOptions } = useLoaderData<{
		storage: Storage | null;
		storageTypeOptions: { id: string; value: string }[];
	}>();

	const tStorage = useTypedTranslation("storage");

	const pageTitle = storage
		? tStorage("edit_storage.page_title.edit")
		: tStorage("edit_storage.page_title.create");

	return (
		<>
			<PageHeader title={pageTitle} />
			<StorageForm
				key={storage?.uuid}
				storage={storage}
				storageTypeOptions={storageTypeOptions}
			/>
		</>
	);
};

export default EditStorage;
