import type { RequireProducersLoaderData } from "../../routes/loaders/types";
import type { FormFieldState } from "./MilkCollection.types";
import styles from "./MilkCollection.module.scss";

import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";

import PageHeader from "../../components/PageHeader";
import Form from "../../components/Form";
import InputField from "../../components/InputField";
import Dropdown from "../../components/Dropdown";
import Button from "../../components/Button";
import IconButton from "../../components/IconButton";

import convertMilkLiterAndKg from "../../lib/helpers/litreToKg";
import { createMilk } from "../../api/milkCollection";
const MdOutlineAddCircleOutline = React.lazy(() => import("react-icons/md").then(mod => ({ default: mod.MdOutlineAddCircleOutline })));


const MilkCollection: React.FC = () => {
	const data: RequireProducersLoaderData = useLoaderData();
	const navigate = useNavigate();

	const [formFieldState, setFormFieldState] = useState<FormFieldState>({
		producer: { message: null },
		volumeLiter: { message: null },
		volumeKg: { message: null },
		temperature: { message: null },
		inhibitoryResidue: { message: null },
		aflatoxin: { message: null },
		acidContent: { message: null },
	});

	const producerOptions = data.producers.map(producer => ({ id: producer.uuid, value: producer.name }));
	const booleanOptions = [
		{ id: "true", value: "Igen" },
		{ id: "false", value: "Nem" },
	]

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		// @ts-ignore
		const formData = new FormData(e.target);

		const producer = formData.get("producer") as string;
		const volumeLier = Number(formData.get("volumeLiter") as string);
		const volumeKg = Number(formData.get("volumeKg") as string);
		const temperature = Number(formData.get("temperature") as string);
		const inhibitoryResidue = !!formData.get("inhibitoryResidue") ? formData.get("inhibitoryResidue") as string == "true" ? true : false : null;
		const aflatoxin = !!formData.get("aflatoxin") ? formData.get("aflatoxin") as string == "true" ? true : false : null;
		const acidContent = Number(formData.get("acidContent") as string);

		const response = await createMilk({
			producer: producer,
			volume_liters: volumeLier,
			volume_kg: volumeKg,
			temperature: temperature,
			// @ts-ignore
			inhibitory_residue: inhibitoryResidue,
			// @ts-ignore
			aflatoxin: aflatoxin,
			acid_content: acidContent
		})

		if (!response.ok) {
			const responseData = await response.json();
			const producerMessage = responseData.producer ? responseData.producer[0] : null;
			const volumeLireMessage = responseData.volume_liters ? responseData.volume_liters[0] : null;
			const volumeKgMessage = responseData.volume_kg ? responseData.volume_kg[0] : null;
			const temperatureMessage = responseData.temperature ? responseData.temperature[0] : null;
			const inhibitoryResidueMessage = responseData.inhibitory_residue ? responseData.inhibitory_residue[0] : null;
			const aflatoxinMessage = responseData.aflatoxin ? responseData.aflatoxin[0] : null;
			const acidContentMessage = responseData.acid_content ? responseData.acid_content[0] : null;

			setFormFieldState({
				producer: { message: producerMessage },
				volumeLiter: { message: volumeLireMessage },
				volumeKg: { message: volumeKgMessage },
				temperature: { message: temperatureMessage },
				inhibitoryResidue: { message: inhibitoryResidueMessage },
				aflatoxin: { message: aflatoxinMessage },
				acidContent: { message: acidContentMessage },
			})

		}

		if (response.ok && response.status == 201) {
			toast.success("Tejátvátel sikeresen elmentve!");
			navigate("/");
		};
	};

	const handleAddProducerClick = (): void => {
		navigate("/add-producer");
	};

	const resetMessage = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
		const fieldName = e.target.name;
		setFormFieldState({
			...formFieldState,
			[fieldName]: { message: null }
		})
	};

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.target;

		if (target.name == "volumeLiter") {
			const value = convertMilkLiterAndKg({ liters: Number(target.value), kg: undefined });
			const volumeKgInput: HTMLInputElement | null = document.querySelector("input[name=volumeKg]");
			if (volumeKgInput) volumeKgInput.value = value
		}

		if (target.name == "volumeKg") {
			const value = convertMilkLiterAndKg({ liters: undefined, kg: Number(target.value) });
			const volumeLiterInput: HTMLInputElement | null = document.querySelector("input[name=volumeLiter]");
			if (volumeLiterInput) volumeLiterInput.value = value
		}

		// reset messages
		setFormFieldState({
			...formFieldState,
			volumeLiter: { message: null },
			volumeKg: { message: null },
		})
	}

	const renderFormActions = (): React.ReactNode => (
		<>
			<Button type="button" style="secondary" onClick={() => navigate(-1)}>Vissza</Button>
			<Button type="submit">Mentés</Button>
		</>
	)

	return (
		<>
			<PageHeader title="Tejátvétel" />
			<Form onSubmit={handleSubmit} actionElements={renderFormActions()}>
				<section>
					<h2>Termelő:</h2>
					<div className={styles.sourceWrapper}>
						<Dropdown id={uuid()} name="producer" options={producerOptions} error={formFieldState.producer.message} onChange={resetMessage} />
						<IconButton type="button" onClick={handleAddProducerClick}><MdOutlineAddCircleOutline size="1.5rem" /></IconButton>
					</div>
					<div className={styles.amountWrapper}>
						<InputField id={uuid()} name="volumeLiter" type="number" step="0.1" label="Mennyiség" info="LITER" error={formFieldState.volumeLiter.message} onChange={handleVolumeChange} />
						<InputField id={uuid()} name="volumeKg" type="number" step="0.1" label="Mennyiség" info="KG" error={formFieldState.volumeKg.message} onChange={handleVolumeChange} />
					</div>
				</section>
				<section>
					<h2>Beltartalmi értékek:</h2>
					<InputField id={uuid()} name="temperature" type="number" step="0.1" label="Hőfok" info="CELSIUS" error={formFieldState.temperature.message} onChange={resetMessage} />
					<Dropdown id={uuid()} name="inhibitoryResidue" options={booleanOptions} label="Gátló" info="POZITÍV / NEGATÍV" error={formFieldState.inhibitoryResidue.message} onChange={resetMessage} />
					<Dropdown id={uuid()} name="aflatoxin" options={booleanOptions} label="Aflatoxin" info="TÖBB / KEVESEBB MINT 50" error={formFieldState.aflatoxin.message} onChange={resetMessage} />
					<InputField id={uuid()} name="acidContent" type="number" step="0.1" label="Savfok" info="SH⁰" error={formFieldState.acidContent.message} onChange={resetMessage} />
				</section>
			</Form>
		</>
	)
}

export default MilkCollection