import type React from "react";
import type { CreateProducerFormData } from "../../api/types";

import PageHeader from "../../components/pageHeader";
import Form from "../../components/form";
import InputField from "../../components/inputField";
import Button from "../../components/button";

import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuid } from "uuid";

import { api } from "../../api/client";
import { schemas } from "../../api/schemas";

const AddProducer: React.FC = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

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
			toast.success(t("add_producer.notification_message"));
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
					{t("common.back")}
				</Button>
				<Button type="submit" disabled={isSubmitting}>
					{t("common.save")}
				</Button>
			</>
		);
	};

	return (
		<>
			<PageHeader title={t("add_producer.page_title")} />
			<Form onSubmit={handleSubmit(onSubmit)} actionElements={renderFormActions()}>
				<section>
					<h2>{t("add_producer.form_title")}</h2>
					<InputField
						id={uuid()}
						{...register("name", { onChange: () => clearErrors("name") })}
						label={t("add_producer.input_name_label")}
						type="text"
						error={errors.name?.message}
					/>
					<InputField
						id={uuid()}
						{...register("address", { onChange: () => clearErrors("address") })}
						label={t("add_producer.input_address_label")}
						type="text"
						error={errors.address?.message}
					/>
					<InputField
						id={uuid()}
						{...register("contact_email", {
							onChange: () => clearErrors("contact_email"),
						})}
						label={t("add_producer.input_contact_email_label")}
						info={t("common.optional")}
						type="text"
						error={errors.contact_email?.message}
					/>
				</section>
			</Form>
		</>
	);
};

export default AddProducer;
