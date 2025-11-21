import type React from "react";
import type { Producer } from "../../../features/domain/producer/types";

import PageHeader from "../../../shared/components/pageHeader";
import ProducerForm from "../../../features/composite/producerForm/components/ProducerForm";

import { useTypedTranslation } from "../../../shared/hooks/useTypedTranslation/useTypedTranslation";
import { useLoaderData } from "react-router";

const EditProducer: React.FC = () => {
	const producer = useLoaderData<Producer>();
	const tProducer = useTypedTranslation("producer");

	const isEdit = window.location.pathname.includes("/edit/");
	const pageTitle = isEdit
		? tProducer("edit_producer.page_titles.edit")
		: tProducer("edit_producer.page_titles.create");

	return (
		<>
			<PageHeader title={pageTitle} />
			<ProducerForm producer={producer} />
		</>
	);
};

export default EditProducer;
