import type React from "react";
import type { MilkChartProps } from "./MilkChart.types.ts";

import styles from "./MilkChart.module.scss";
import Dropdown from "../../../../../shared/components/base/dropdown";
import TotalPerDateLineChart from "../../../../../shared/components/charts/totalPerDateLineChart";
import { useTypedTranslation } from "../../../../../shared/hooks/useTypedTranslation/useTypedTranslation.js";
import { v4 as uuid } from "uuid";

const MilkChart: React.FC<MilkChartProps> = ({
	chartData,
	intervalOptions,
	selectedInterval = "day",
	onIntervalChange,
	rangeOptions,
	selectedRange,
	onRangeChange,
	producerOptions,
	selectedProducer,
	onProducerChange,
}: MilkChartProps) => {
	const tCommon = useTypedTranslation("common");

	return (
		<>
			<div className={styles.filters}>
				<Dropdown
					id={uuid()}
					name="interval"
					label="Interval:"
					placeholder={tCommon("common.select")}
					options={intervalOptions}
					defaultValue={selectedInterval}
					onChange={(e) => onIntervalChange(e)}
				/>
				<Dropdown
					id={uuid()}
					name="range"
					label="Range:"
					placeholder={tCommon("common.select")}
					options={rangeOptions}
					defaultValue={selectedRange.toString()}
					onChange={(e) => onRangeChange(e)}
				/>
				<Dropdown
					id={uuid()}
					name="interval"
					label="Producer:"
					placeholder={tCommon("common.select")}
					options={producerOptions}
					defaultValue={selectedProducer}
					onChange={(e) => onProducerChange(e)}
				/>
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
