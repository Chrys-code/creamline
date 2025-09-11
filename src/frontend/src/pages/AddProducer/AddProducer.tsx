import type { FormFieldState } from './AddProducer.types';

import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { v4 as uuid } from "uuid";

import PageHeader from '../../layouts/PageHeader';
import Form from '../../components/Form';
import InputField from '../../components/InputField';
import Button from '../../components/Button';

import { createProducer } from '../../api/producer';

const AddProducer: React.FC = () => {
	const navigate = useNavigate();
	const [formFieldState, setFormFieldState] = useState<FormFieldState>({
		name: { message: null },
		address: { message: null },
		contactEmail: { message: null },
		formMessage: null
	})

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		// @ts-ignore
		const formData = new FormData(e.target);

		const name = formData.get("name") as string;
		const address = formData.get("address") as string;
		const contactEmail = formData.get("contact-email") as string;

		const response = await createProducer({ name, address, contact_email: contactEmail });

		if (!response.ok) {
			const responseData = await response.json();

			const nameMessage = responseData.name ? responseData.name[0] : null;
			const addressMessage = responseData.address ? responseData.address[0] : null;
			const contactEmailMessage = responseData.contact_email ? responseData.contact_email[0] : null;
			const formMessage = responseData.message ? responseData.message : null;

			setFormFieldState({
				name: { message: nameMessage },
				address: { message: addressMessage },
				contactEmail: { message: contactEmailMessage },
				formMessage: formMessage
			});
		}

		if (response.ok && response.status == 201) {
			toast.success("Új termelő hozzáadva!");
			navigate(-1);
		};
	}


	const resetMessage = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const fieldName = e.target.name;

		setFormFieldState({
			name: {
				message: fieldName == "name" ? null : formFieldState.name.message
			},
			address: {
				message: fieldName == "address" ? null : formFieldState.address.message
			},
			contactEmail: {
				message: fieldName == "contact-email" ? null : formFieldState.contactEmail.message
			},
			formMessage: null
		});
	};


	const renderFormActions = (): React.ReactNode => {
		return (
			<>
				<Button type="button" style="secondary" onClick={() => navigate(-1)}>Vissza</Button>
				<Button type="submit">Mentés</Button>
			</>
		)
	}

	return (
		<>
			<PageHeader title="Új termelő" />
			<Form title="Termelő adatai:" onSubmit={handleSubmit} actionElements={renderFormActions()}>
				<section>
					<InputField id={uuid()} label="Termelő neve:" name="name" type="text" error={formFieldState.name.message} onChange={resetMessage} />
					<InputField id={uuid()} label="Termelő székhelye:" name="address" type="text" error={formFieldState.address.message} onChange={resetMessage} />
					<InputField id={uuid()} label="Kapcsolattartó email:" info="Opcionális" name="contact-email" type="text" error={formFieldState.contactEmail.message} onChange={resetMessage} />
				</section>
			</Form>
		</>
	)
}

export default AddProducer