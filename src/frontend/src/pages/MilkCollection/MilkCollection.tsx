import type { RequireProducersLoaderData } from "../../routes/loaders/types";
import type { FormFieldState } from "./MilkCollection.types";
import styles from "./MilkCollection.module.scss";

import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";

import PageHeader from "../../layouts/PageHeader";
import Form from "../../components/Form";
import InputField from "../../components/InputField";
import Dropdown from "../../components/Dropdown";
import Button from "../../components/Button";
import IconButton from "../../components/IconButton";

import { createMilk } from "../../api/milkCollection";
const MdOutlineAddCircleOutline = React.lazy(() => import("react-icons/md").then(mod => ({ default: mod.MdOutlineAddCircleOutline })));


const MilkCollection: React.FC = () => {
	const data: RequireProducersLoaderData = useLoaderData();
	const navigate = useNavigate();

	const [formFieldState, setFormFieldState] = useState<FormFieldState>({
		producer: { message: null },
		volumeLiters: { message: null },
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
		const volumeLire = Number(formData.get("volume-litre") as string);
		const volumeKg = Number(formData.get("volume-kg") as string);
		const temperature = Number(formData.get("temperature") as string);
		const inhibitoryResidue = formData.get("inhibitory-residue") as string == "true" ? true : false;
		const aflatoxin = formData.get("aflatoxin") as string == "false" ? false : true;
		const acidContent = Number(formData.get("acid_content") as string);

		const response = await createMilk({
			producer: producer,
			volume_liters: volumeLire,
			volume_kg: volumeKg,
			temperature: temperature,
			inhibitory_residue: inhibitoryResidue,
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
				volumeLiters: { message: volumeLireMessage },
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

	const handleAddProducerClick = () => {
		navigate("/add-producer");
	};

	const renderFormActions = () => {
		return (
			<>
				<Button type="button" style="secondary" onClick={() => navigate(-1)}>Vissza</Button>
				<Button type="submit">Mentés</Button>
			</>
		)
	}

	return (
		<>
			<PageHeader title="Tejátvétel" />
			<Form onSubmit={handleSubmit} actionElements={renderFormActions()}>
				<section>
					<h2>Termelő:</h2>
					<div className={styles.sourceWrapper}>
						<Dropdown id={uuid()} name="producer" options={producerOptions} error={formFieldState.producer.message} />
						<IconButton type="button" onClick={handleAddProducerClick}><MdOutlineAddCircleOutline size="1.5rem" /></IconButton>
					</div>
					<div className={styles.amountWrapper}>
						<InputField id={uuid()} name="volume-litre" type="number" step="0.1" label="Mennyiség" info="LITER" error={formFieldState.volumeLiters.message} />
						<InputField id={uuid()} name="volume-kg" type="number" step="0.1" label="Mennyiség" info="KG" error={formFieldState.volumeKg.message} />
					</div>
				</section>
				<section>
					<h2>Beltartalmi értékek:</h2>
					<InputField id={uuid()} name="temperature" type="number" step="0.1" label="Hőfok" info="CELSIUS" error={formFieldState.temperature.message} />
					<Dropdown id={uuid()} name="inhibitory-residue" options={booleanOptions} label="Gátló" info="POZITÍV / NEGATÍV" error={formFieldState.inhibitoryResidue.message} />
					<Dropdown id={uuid()} name="aflatoxin" options={booleanOptions} label="Aflatoxin" info="TÖBB / KEVESEBB MINT 50" error={formFieldState.aflatoxin.message} />
					<InputField id={uuid()} name="acid-content" type="number" step="0.1" label="Savfok" info="SH⁰" error={formFieldState.acidContent.message} />
				</section>
			</Form>
		</>
	)
}

export default MilkCollection