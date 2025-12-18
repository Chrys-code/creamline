import type React from "react";
import type { MilkTimeSeriesChartFilterFormProps } from "./MilkTimeSeriesChartFilterForm.types";
import type { IntervalTypes } from "../../../../../../../shared/types";

import Form from "../../../../../../../shared/components/base/form";
import Dropdown from "../../../../../../../shared/components/base/dropdown";
import InputField from "../../../../../../../shared/components/base/inputField";
import Button from "../../../../../../../shared/components/base/button";

import { v4 as uuid } from "uuid";
import { useTypedTranslation } from "../../../../../../../shared/hooks/useTypedTranslation/useTypedTranslation";

const MilkTimeSeriesChartFilterForm: React.FC<MilkTimeSeriesChartFilterFormProps> = ({
	chartFilterState,
	onSubmit,
	onClose,
	intervalOptions,
	producerOptions,
	isDisabled,
}: MilkTimeSeriesChartFilterFormProps) => {
	const tCommon = useTypedTranslation("common");
	const tMilkCollection = useTypedTranslation("milkCollection");

	const renderFormActions = () => {
		return (
			<>
				<Button style="secondary" type="button" onClick={() => onClose()}>
					{tCommon("common.cancel")}
				</Button>
				<Button style="primary" type="submit">
					{tCommon("common.save")}
				</Button>
			</>
		);
	};

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// @ts-expect-error e has no target
		const data = new FormData(e.target);

		onSubmit({
			interval: data.get("interval") as IntervalTypes,
			producer: data.get("producer") as string,
			startDate: data.get("start_date") as string,
			endDate: data.get("end_date") as string,
		});

		onClose();
	};

	return (
		<Form
			onSubmit={(e) => handleFormSubmit(e)}
			actionElements={renderFormActions()}
			type="dialog"
		>
			<section>
				<Dropdown
					id={uuid()}
					name="interval"
					label={tMilkCollection("milk_collection.filters.interval")}
					placeholder={tCommon("common.select")}
					options={intervalOptions}
					defaultValue={chartFilterState.interval}
					disabled={isDisabled}
				/>
				<Dropdown
					id={uuid()}
					name="producer"
					label={tMilkCollection("milk_collection.filters.producer")}
					placeholder={tCommon("common.select")}
					options={producerOptions}
					defaultValue={chartFilterState.producer}
					disabled={isDisabled}
				/>
				<InputField
					id={uuid()}
					name="start_date"
					label={tMilkCollection("milk_collection.filters.start_date")}
					type="date"
					defaultValue={chartFilterState.startDate}
					disabled={isDisabled}
				/>
				<InputField
					id={uuid()}
					name="end_date"
					label={tMilkCollection("milk_collection.filters.end_date")}
					type="date"
					defaultValue={chartFilterState.endDate}
					disabled={isDisabled}
				/>
			</section>
		</Form>
	);
};

export default MilkTimeSeriesChartFilterForm;
