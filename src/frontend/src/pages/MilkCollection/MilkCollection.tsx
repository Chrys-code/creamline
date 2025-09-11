import type { RequireProducersLoaderData } from "../../routes/loaders/types";
import styles from "./MilkCollection.module.scss";

import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";

import PageHeader from "../../layouts/PageHeader";
import Form from "../../components/Form";
import InputField from "../../components/InputField";
import Dropdown from "../../components/Dropdown";
import Button from "../../components/Button";
import IconButton from "../../components/IconButton";

import { milkCollection } from "../../api/milkCollection";
const MdOutlineAddCircleOutline = React.lazy(() => import("react-icons/md").then(mod => ({ default: mod.MdOutlineAddCircleOutline })));


const MilkCollection: React.FC = () => {
	const data: RequireProducersLoaderData = useLoaderData();
	const navigate = useNavigate();

	const producerOptions = data.producers.map(producer => ({ id: producer.uuid, value: producer.name }));

	const booleanOptions = [
		{ id: "true", value: "Igen" },
		{ id: "false", value: "Nem" },
	]

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {

		// @ts-ignore
		const formData = new FormData(e.target);

		const producer = formData.get("producer") as string;
		const amountLire = Number(formData.get("amount-litre") as string);
		const amountKg = Number(formData.get("amount-kg") as string);

		const temperature = Number(formData.get("temperature") as string);
		const limitter = formData.get("limitter") as string;
		const aflatoxin = formData.get("aflatoxin") as string;
		const acidlevel = Number(formData.get("acidlevel") as string);

		const response = await milkCollection({
			producer,
			amountLire,
			amountKg,
			temperature,
			limitter,
			aflatoxin,
			acidlevel
		})

		if (!response.ok) {
			const responseData = await response.json();

			// set field level messages


		}

		if (response.ok && response.status == 201) {
			toast.success("Tejátvátel sikeresen elmentve!");
			navigate("dashboard");
		};
	};

	const handleAddProducerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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
						<Dropdown id={uuid()} name="producer" options={producerOptions} />
						<IconButton type="button" onClick={handleAddProducerClick}><MdOutlineAddCircleOutline size="1.5rem" /></IconButton>
					</div>

					<div className={styles.amountWrapper}>
						<InputField id={uuid()} name="amount-litre" type="number" step="0.1" label="Mennyiség" info="LITER" />
						<InputField id={uuid()} name="amount-kg" type="number" step="0.1" label="Mennyiség" info="KG" />
					</div>
				</section>
				<section>
					<h2>Beltartalmi értékek:</h2>
					<InputField id={uuid()} name="temperature" type="number" step="0.1" label="Hőfok" info="CELSIUS" />
					<Dropdown id={uuid()} name="limitter" options={booleanOptions} label="Gátló" info="POZITÍV / NEGATÍV" />
					<Dropdown id={uuid()} name="aflatoxin" options={booleanOptions} label="Aflatoxin" info="TÖBB / KEVESEBB MINT 50" />
					<InputField id={uuid()} name="acidlevel" type="number" step="0.1" label="Savfok" info="SH⁰" />
				</section>
			</Form>
		</>
	)
}

export default MilkCollection