import type React from "react";
import type { PasteurisationTimeSeriesChartFilterFormProps } from "./PasteurisationTimeSeriesChartFilterForm.types";
import type { IntervalTypes } from "@/shared/types";

import Form from "@/shared/components/base/form";
import Dropdown from "@/shared/components/base/dropdown";
import InputField from "@/shared/components/base/inputField";
import Button from "@/shared/components/base/button";

import { v4 as uuid } from "uuid";
import { useTypedTranslation } from "@/shared/hooks/useTypedTranslation/useTypedTranslation";

const PasteurisationTimeSeriesChartFilterForm: React.FC<
	PasteurisationTimeSeriesChartFilterFormProps
> = ({
	chartFilterState,
	onSubmit,
	onClose,
	intervalOptions,
	pasteurOptions,
	isDisabled,
}: PasteurisationTimeSeriesChartFilterFormProps) => {
	const tCommon = useTypedTranslation("common");
	const tPasteurisation = useTypedTranslation("pasteurisation");

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
			pasteur: data.get("pasteur") as string,
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
					label={tPasteurisation("pasteurisation.filters.interval")}
					placeholder={tCommon("common.select")}
					options={intervalOptions}
					defaultValue={chartFilterState.interval}
					disabled={isDisabled}
				/>
				<Dropdown
					id={uuid()}
					name="pasteur"
					label={tPasteurisation("pasteurisation.filters.pasteur")}
					placeholder={tCommon("common.select")}
					options={pasteurOptions}
					defaultValue={chartFilterState.pasteur}
					disabled={isDisabled}
				/>
				<InputField
					id={uuid()}
					name="start_date"
					label={tPasteurisation("pasteurisation.filters.start_date")}
					type="date"
					defaultValue={chartFilterState.startDate}
					disabled={isDisabled}
				/>
				<InputField
					id={uuid()}
					name="end_date"
					label={tPasteurisation("pasteurisation.filters.end_date")}
					type="date"
					defaultValue={chartFilterState.endDate}
					disabled={isDisabled}
				/>
			</section>
		</Form>
	);
};

export default PasteurisationTimeSeriesChartFilterForm;
