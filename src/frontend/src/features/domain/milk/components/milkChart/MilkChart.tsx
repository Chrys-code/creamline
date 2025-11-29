import type { MilkChartProps } from "./MilkChart.types";
import styles from "./MilkChart.module.scss";

import TotalPerDateLineChart from "../../../../../shared/components/charts/totalPerDateLineChart";
import InputField from "../../../../../shared/components/base/inputField";
import Dropdown from "../../../../../shared/components/base/dropdown";
import IconButton from "../../../../../shared/components/base/iconButton";

import React, { useState } from "react";
import { useTypedTranslation } from "../../../../../shared/hooks/useTypedTranslation/useTypedTranslation";
import { v4 as uuid } from "uuid";

const MdChevronRight = React.lazy(() =>
	import("react-icons/md").then((mod) => ({
		default: mod.MdChevronRight,
	}))
);

const MilkChart: React.FC<MilkChartProps> = ({
	chartData,
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
}: MilkChartProps) => {
	const tCommon = useTypedTranslation("common");
	const tMilkCollection = useTypedTranslation("milkCollection");

	const [filterIsOpen, setIsOpen] = useState(false);

	const filterContainerStyle = filterIsOpen
		? `${styles.filterContainer} ${styles.active}`
		: styles.filterContainer;

	return (
		<>
			<div className={filterContainerStyle}>
				<div className={styles.filterHeader}>
					<h2>{tCommon("common.filters")}</h2>
					<IconButton onClick={() => setIsOpen((filterIsOpen) => !filterIsOpen)}>
						<MdChevronRight size={"1.25rem"} />
					</IconButton>
				</div>
				<div className={styles.filters}>
					<Dropdown
						id={uuid()}
						name="interval"
						label={tMilkCollection("milk_collection.filters.interval")}
						placeholder={tCommon("common.select")}
						options={intervalOptions}
						defaultValue={selectedInterval}
						onChange={(e) => onIntervalChange(e)}
					/>
					<Dropdown
						id={uuid()}
						name="interval"
						label={tMilkCollection("milk_collection.filters.producer")}
						placeholder={tCommon("common.select")}
						options={producerOptions}
						defaultValue={selectedProducer}
						onChange={(e) => onProducerChange(e)}
					/>
					<InputField
						id={uuid()}
						name="start_date"
						label={tMilkCollection("milk_collection.filters.start_date")}
						type="date"
						defaultValue={selectedStartDate}
						onChange={(e) => onStartDateChange(e)}
					/>
					<InputField
						id={uuid()}
						name="end_date"
						label={tMilkCollection("milk_collection.filters.end_date")}
						type="date"
						defaultValue={selectedEndDate}
						onChange={(e) => onEndDateChange(e)}
					/>
				</div>
			</div>

			<TotalPerDateLineChart
				width={"100%"}
				data={chartData || []}
				xAxisDataYey="date"
				yAsixDatKey="total_liters"
				aspectRatio={2}
			/>
		</>
	);
};

export default MilkChart;
