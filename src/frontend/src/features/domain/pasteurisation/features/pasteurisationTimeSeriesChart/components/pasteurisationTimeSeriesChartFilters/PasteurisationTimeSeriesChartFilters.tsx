import type React from "react";
import type { MilkTimeSeriesChartFiltersProps } from "./PasteurisationTimeSeriesChartFilters.types";
import styles from "./PasteurisationTimeSeriesChartFilters.module.scss";

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
	pasteurOptions,
	selectedPasteur,
	onPasteurChange,
}: MilkTimeSeriesChartFiltersProps) => {
	const tCommon = useTypedTranslation("common");
	const tPasteurisation = useTypedTranslation("pasteurisation");

	const collapseWrapperStyle = isOpen
		? `${styles.collapseWrapper} ${styles.open}`
		: styles.collapseWrapper;

	return (
		<div className={styles.container}>
			<div className={collapseWrapperStyle}>
				<Dropdown
					id={uuid()}
					name="interval"
					label={tPasteurisation("pasteurisation.filters.interval")}
					placeholder={tCommon("common.select")}
					options={intervalOptions}
					defaultValue={selectedInterval}
					onChange={(e) => onIntervalChange(e)}
					disabled={isDisabled}
				/>
				<Dropdown
					id={uuid()}
					name="interval"
					label={tPasteurisation("pasteurisation.filters.producer")}
					placeholder={tCommon("common.select")}
					options={pasteurOptions}
					defaultValue={selectedPasteur}
					onChange={(e) => onPasteurChange(e)}
					disabled={isDisabled}
				/>
				<InputField
					id={uuid()}
					name="start_date"
					label={tPasteurisation("pasteurisation.filters.start_date")}
					type="date"
					defaultValue={selectedStartDate}
					onChange={(e) => onStartDateChange(e)}
					disabled={isDisabled}
				/>
				<InputField
					id={uuid()}
					name="end_date"
					label={tPasteurisation("pasteurisation.filters.end_date")}
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
