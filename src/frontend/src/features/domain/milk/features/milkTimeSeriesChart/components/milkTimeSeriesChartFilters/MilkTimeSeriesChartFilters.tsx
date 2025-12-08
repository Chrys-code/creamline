import type React from "react";
import type { MilkTimeSeriesChartFiltersProps } from "./MilkTimeSeriesChartFilters.types";
import styles from "./MilkTimeSeriesChartFilters.module.scss";

import Dropdown from "../../../../../../../shared/components/base/dropdown/index.js";
import InputField from "../../../../../../../shared/components/base/inputField/index.js";

import { v4 as uuid } from "uuid";
import { useTypedTranslation } from "../../../../../../../shared/hooks/useTypedTranslation/useTypedTranslation";

const MilkTimeSeriesChartFilters: React.FC<MilkTimeSeriesChartFiltersProps> = ({
	isOpen = false,
	isDisabled,
	selectedStartDate,
	onStartDateChange,
	selectedEndDate,
	onEndDateChange,
	intervalOptions,
	selectedInterval = "day",
	onIntervalChange,
	producerOptions,
	selectedProducer,
	onProducerChange,
}: MilkTimeSeriesChartFiltersProps) => {
	const tCommon = useTypedTranslation("common");
	const tMilkCollection = useTypedTranslation("milkCollection");

	const collapseWrapperStyle = isOpen
		? `${styles.collapseWrapper} ${styles.open}`
		: styles.collapseWrapper;

	return (
		<div className={styles.container}>
			<div className={collapseWrapperStyle}>
				<Dropdown
					id={uuid()}
					name="interval"
					label={tMilkCollection("milk_collection.filters.interval")}
					placeholder={tCommon("common.select")}
					options={intervalOptions}
					defaultValue={selectedInterval}
					onChange={(e) => onIntervalChange(e)}
					disabled={isDisabled}
				/>
				<Dropdown
					id={uuid()}
					name="interval"
					label={tMilkCollection("milk_collection.filters.producer")}
					placeholder={tCommon("common.select")}
					options={producerOptions}
					defaultValue={selectedProducer}
					onChange={(e) => onProducerChange(e)}
					disabled={isDisabled}
				/>
				<InputField
					id={uuid()}
					name="start_date"
					label={tMilkCollection("milk_collection.filters.start_date")}
					type="date"
					defaultValue={selectedStartDate}
					onChange={(e) => onStartDateChange(e)}
					disabled={isDisabled}
				/>
				<InputField
					id={uuid()}
					name="end_date"
					label={tMilkCollection("milk_collection.filters.end_date")}
					type="date"
					defaultValue={selectedEndDate}
					onChange={(e) => onEndDateChange(e)}
					disabled={isDisabled}
				/>
			</div>
		</div>
	);
};

export default MilkTimeSeriesChartFilters;
