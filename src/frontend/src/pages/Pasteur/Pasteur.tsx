import type { FormFieldState } from "./Pasteur.types.ts";
import styles from "./Pasteur.module.scss";

import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";

import PageHeader from "../../components/PageHeader";
import Form from "../../components/Form";
import Dropdown from "../../components/Dropdown";
import InputField from "../../components/InputField";
import Button from "../../components/Button";

import { createPasteurisedMilk } from "../../api/pasteurisedMilk";
import convertMilkLiterAndKg from "../../lib/helpers/litreToKg";


const Pasteur: React.FC = () => {
    const navigate = useNavigate();
    const [formFieldState, setFormFieldState] = useState<FormFieldState>({
        pasteur: {message: null},
        product: {message: null},
        temperature: {message: null},
        sourceStorage: {message: null},
        targetStorage: {message: null},
        volumeLiter: {message: null},
        volumeKg: {message: null},
        startTime: {message: null},
        enTime: {message: null},
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        // @ts-ignore
        const formData = new FormData(e.target);

        const pasteur = formData.get("pasteur") as string;
        const product = formData.get("product") as string;
        const temperature = formData.get("temperature") as string;

        const sourceStorage = formData.get("sourceStorage") as string;
        const targetStorage = formData.get("targetStorage") as string;
        const volumeLiter = Number(formData.get("volumeLiter"));
        const volumeKg = Number(formData.get("volumeKg"));

        const startTime = formData.get("startTime") as string;
        const endTime = formData.get("endTime") as string;
        
        const response = await createPasteurisedMilk({
            pasteur: pasteur,
            product: product,
            temperature: temperature,
            source_storage: sourceStorage,
            target_storage: targetStorage,
            volume_liter: volumeLiter,
            volume_kg: volumeKg,
            start_time: startTime,
            end_time: endTime
        })

        if (!response.ok) {
            const responseData = await response.json();

            if (responseData.message) {
                toast.success(responseData.message);
                return;
            }

            const pasteurMessage = responseData.pasteur ? responseData.pasteur[0] : null;
			const volumeLireMessage = responseData.volume_liters ? responseData.volume_liters[0] : null;
			const volumeKgMessage = responseData.volume_kg ? responseData.volume_kg[0] : null;
			const temperatureMessage = responseData.temperature ? responseData.temperature[0] : null;

        }

        if (response.ok && response.status == 201) {
            toast.success("Pasztőr sikeresen elmentve!");
            navigate("/");
        };
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

    const resetMessage = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const fieldName = e.target.name;
        setFormFieldState({
            ...formFieldState,
            [fieldName]: { message: null }
        })
    };

    const renderFormActions = (): React.ReactNode => (
		<>
			<Button type="button" style="secondary" onClick={() => navigate(-1)}>Vissza</Button>
			<Button type="submit">Mentés</Button>
		</>
	);

    return (
        <>
        	<PageHeader title="Pasztőr" />
			<Form onSubmit={handleSubmit} actionElements={renderFormActions()}>
				<section>
					<h2>Adatok:</h2>
						<Dropdown id={uuid()} name="pasteur" label="Pasztőr:" options={[]} error={formFieldState.pasteur.message} onChange={resetMessage} />
						<Dropdown id={uuid()} name="product" label="Céltermék:" options={[]} error={formFieldState.product.message} onChange={resetMessage} />
                        <InputField id={uuid()} name="temperature" type="number" step="0.1" label="Hőfok:" info="CELSIUS" defaultValue="0" error={formFieldState.temperature.message} onChange={resetMessage} />
				</section>
				<section>
					<h2>Útvonal:</h2>
                    <div className={styles.sideBySideWrapper}>
						<Dropdown id={uuid()} name="sourceStorage" label="Honnan:" options={[]} error={formFieldState.sourceStorage.message} onChange={resetMessage} />
						<Dropdown id={uuid()} name="targetStorage" label="Hová:" options={[]} error={formFieldState.product.message} onChange={resetMessage} />
                    </div>
                    <div className={styles.sideBySideWrapper}>
                        <InputField id={uuid()} name="volumeLiter" type="number" step="0.1" label="Mennyiség" info="LITER" error={formFieldState.volumeLiter.message} onChange={handleVolumeChange} />
						<InputField id={uuid()} name="volumeKg" type="number" step="0.1" label="Mennyiség" info="KG" error={formFieldState.volumeKg.message} onChange={handleVolumeChange} />
                    </div>
				</section>
				<section>
					<h2>Időtartam:</h2>
                        <InputField id={uuid()} name="startTime" type="time" label="Pasztőrőzés kezdete:" error={formFieldState.volumeLiter.message} onChange={handleVolumeChange} />
						<InputField id={uuid()} name="endTime" type="time" label="Pasztőrőzés vége:" error={formFieldState.volumeKg.message} onChange={handleVolumeChange} />
				</section>
			</Form>
        </>
    )
}

export default Pasteur