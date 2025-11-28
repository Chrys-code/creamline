import type React from "react";
import type { MilkChartProps } from "./MilkChart.types.ts";

import styles from "./MilkChart.module.scss";
import Dropdown from "../../../../../shared/components/base/dropdown";
import TotalPerDateLineChart from "../../../../../shared/components/charts/totalPerDateLineChart";
import { useTypedTranslation } from "../../../../../shared/hooks/useTypedTranslation/useTypedTranslation.js";

const MilkChart: React.FC<MilkChartProps> = ({
	chartData,
	intervalOptions,
	selectedInterval = "day",
	onIntervalChange,
}: MilkChartProps) => {
	const tCommon = useTypedTranslation("common");

	return (
		<>
			<Dropdown
				id="milk-analytics-chart-interval-selector"
				name="interval"
				placeholder={tCommon("common.select")}
				options={intervalOptions}
				defaultValue={selectedInterval}
				onChange={(e) => onIntervalChange(e)}
			/>

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
