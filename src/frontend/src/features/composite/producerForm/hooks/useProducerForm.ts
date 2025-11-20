import { useNavigate } from "react-router";
import type {
	CreateProducerFormSchema,
	Producer,
	ProducerFormSchema,
	UpdateProducerFormSchema,
} from "../../../domain/producer/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { producerClient } from "../../../domain/producer/services/client";
import { toast } from "react-toastify";
import { useTypedTranslation } from "../../../../shared/hooks/useTypedTranslation/useTypedTranslation";
import schemas from "../../../domain/producer/services/schemas";

export const useProducerForm = (producer: Producer | null) => {
	const navigate = useNavigate();
	const tProducer = useTypedTranslation("producer");

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
		clearErrors,
	} = useForm<CreateProducerFormSchema>({
		resolver: zodResolver(schemas.CreateProducerFormSchema),
		defaultValues: producer ?? {},
	});

	const createProducer = async (formData: CreateProducerFormSchema): Promise<void> => {
		try {
			await producerClient.v1_producer_create(formData);
			toast.success(tProducer("edit_producer.notifications.success"));
			navigate(-1);
		} catch (err: any) {
			if (err.response?.data) {
				const responseData = err.response.data;
				if (responseData.name) setError("name", { message: responseData.name[0] });
				if (responseData.address) setError("address", { message: responseData.address[0] });
				if (responseData.contactEmail)
					setError("contact_email", { message: responseData.contactEmail[0] });
			}
			toast.error(tProducer("edit_producer.notifications.error"));
		}
	};
	const updateProducer = async (
		formData: UpdateProducerFormSchema,
		id: string
	): Promise<void> => {
		try {
			await producerClient.v1_producer_partial_update(formData, { params: { uuid: id } });
			toast.success(tProducer("edit_producer.notifications.success"));
			navigate(-1);
		} catch (err: any) {
			if (err.response?.data) {
				const responseData = err.response.data;
				if (responseData.name) setError("name", { message: responseData.name[0] });
				if (responseData.address) setError("address", { message: responseData.address[0] });
				if (responseData.contactEmail)
					setError("contact_email", { message: responseData.contactEmail[0] });
			}
			toast.error(tProducer("edit_producer.notifications.error"));
		}
	};

	const onSubmit = async (formData: ProducerFormSchema) => {
		if (producer && producer.uuid) {
			await updateProducer(formData, producer.uuid);
			return;
		}

		await createProducer(formData);
	};

	return {
		errors,
		isSubmitting,
		register,
		handleSubmit,
		onSubmit,
		clearErrors,
	};
};
