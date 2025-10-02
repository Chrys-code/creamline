import type { z } from "zod";

import { useNavigate } from 'react-router';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuid } from "uuid";

import PageHeader from '../../components/PageHeader';
import Form from '../../components/Form';
import InputField from '../../components/InputField';
import Button from '../../components/Button';

import { api } from "../../api/axios";
import { schemas } from "../../lib/schemas/schemas";
import { useTranslation } from "react-i18next";


const ProducerSchema = schemas.Producer;
type ProducerFormData = z.infer<typeof ProducerSchema>;


const AddProducer: React.FC = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
		clearErrors
	} = useForm<ProducerFormData>({
		resolver: zodResolver(ProducerSchema)
	});

	const onSubmit = async (formData: ProducerFormData) => {
		try {
			await api.post("/api/v1/producer/", formData);
			toast.success(t("add_producer.notification_message"));
			navigate(-1);
		} catch (err: any) {
			if (err.response?.data) {
				const responseData = err.response.data;
				if (responseData.name) setError("name", { message: responseData.name[0] });
				if (responseData.address) setError("address", { message: responseData.address[0] });
				if (responseData.contactEmail) setError("contact_email", { message: responseData.contactEmail[0] });
			}
		}
	}


	const renderFormActions = (): React.ReactNode => {
		return (
			<>
				<Button type="button" style="secondary" onClick={() => navigate(-1)}>{t("common.back")}</Button>
				<Button type="submit" disabled={isSubmitting}>{t("common.save")}</Button>
			</>
		)
	}

	return (
		<>
			<PageHeader title={t("add_producer.page_title")} />
			<Form onSubmit={handleSubmit(onSubmit, (invalidData) => {
				console.error("❌ Validation failed", invalidData, errors);
			})} actionElements={renderFormActions()}>
				<section>
					<h2>{t("add_producer.form_title")}</h2>
					<InputField id={uuid()} {...register("name", { onChange: () => clearErrors("name") })} label={t("add_producer.input_name_label")} type="text" error={errors.name?.message} />
					<InputField id={uuid()} {...register("address", { onChange: () => clearErrors("address") })} label={t("add_producer.input_address_label")} type="text" error={errors.address?.message} />
					<InputField id={uuid()} {...register("contact_email", { onChange: () => clearErrors("contact_email") })} label={t("add_producer.input_contact_email_label")} info={t("common.optional")} type="text" error={errors.contact_email?.message} />
				</section>
			</Form>
		</>
	)
}

export default AddProducer