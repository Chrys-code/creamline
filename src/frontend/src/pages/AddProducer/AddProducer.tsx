import type React from "react";
import type { CreateProducerFormData } from "../../api/types";

import PageHeader from "../../components/pageHeader";
import Form from "../../components/form";
import InputField from "../../components/inputField";
import Button from "../../components/button";

import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuid } from "uuid";

import { api } from "../../api/client";
import { schemas } from "../../api/schemas";
import { useTypedTranslation } from "../../lib/hooks/useTypedTranslation/useTypedTranslation";

const AddProducer: React.FC = () => {
	const navigate = useNavigate();
	const pt = useTypedTranslation("producer");
	const ct = useTypedTranslation("common");

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
		clearErrors,
	} = useForm<CreateProducerFormData>({
		resolver: zodResolver(schemas.CreateProducerSchema),
	});

	const onSubmit = async (formData: CreateProducerFormData) => {
		try {
			await api.post("/api/v1/producer/", formData);
			toast.success(pt("edit_producer.notifications.create_success"));
			navigate(-1);
		} catch (err: any) {
			if (err.response?.data) {
				const responseData = err.response.data;
				if (responseData.name) setError("name", { message: responseData.name[0] });
				if (responseData.address) setError("address", { message: responseData.address[0] });
				if (responseData.contactEmail)
					setError("contact_email", { message: responseData.contactEmail[0] });
			}
		}
	};

	const renderFormActions = (): React.ReactNode => {
		return (
			<>
				<Button type="button" style="secondary" onClick={() => navigate(-1)}>
					{ct("common.back")}
				</Button>
				<Button type="submit" disabled={isSubmitting}>
					{ct("common.save")}
				</Button>
			</>
		);
	};

	const isEdit = window.location.pathname.includes("/edit/");
	const pageTitle = isEdit
		? pt("edit_producer.page_titles.edit")
		: pt("edit_producer.page_titles.create");

	return (
		<>
			<PageHeader title={pageTitle} />
			<Form onSubmit={handleSubmit(onSubmit)} actionElements={renderFormActions()}>
				<section>
					<h2>{pt("edit_producer.form_sections.form_title")}</h2>
					<InputField
						id={uuid()}
						{...register("name", { onChange: () => clearErrors("name") })}
						label={pt("edit_producer.input_labels.name")}
						type="text"
						error={errors.name?.message}
					/>
					<InputField
						id={uuid()}
						{...register("address", { onChange: () => clearErrors("address") })}
						label={pt("edit_producer.input_labels.address")}
						type="text"
						error={errors.address?.message}
					/>
					<InputField
						id={uuid()}
						{...register("contact_email", {
							onChange: () => clearErrors("contact_email"),
						})}
						label={pt("edit_producer.input_labels.contact_email")}
						info={ct("common.optional")}
						type="text"
						error={errors.contact_email?.message}
					/>
				</section>
			</Form>
		</>
	);
};

export default AddProducer;
