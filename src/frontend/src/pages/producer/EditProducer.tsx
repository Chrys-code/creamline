import type React from "react";

import PageHeader from "../../shared/components/pageHeader";
import ProducerForm from "../../features/composite/producerForm/components/ProducerForm";

import { useTypedTranslation } from "../../shared/hooks/useTypedTranslation/useTypedTranslation";

const EditProducer: React.FC = () => {
	const tProducer = useTypedTranslation("producer");

	const isEdit = window.location.pathname.includes("/edit/");
	const pageTitle = isEdit
		? tProducer("edit_producer.page_titles.edit")
		: tProducer("edit_producer.page_titles.create");

	return (
		<>
			<PageHeader title={pageTitle} />
			<ProducerForm producer={null} />
		</>
	);
};

export default EditProducer;
