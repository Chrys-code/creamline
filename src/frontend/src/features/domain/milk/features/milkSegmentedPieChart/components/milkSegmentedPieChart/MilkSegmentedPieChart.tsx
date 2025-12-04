import type React from "react";
import type { IntervalTypes } from "../../../../../../../shared/types";
import styles from "./MilkSegmentedPieChart.module.scss";

import ChartHeader from "../../../../../../../shared/components/charts/chartHeader";
import SegmentedPieChart from "../../../../../../../shared/components/charts/segmentedPieChart";
import MilkSegmentedPieChartFooter from "../milkSegmentedPieChartFooter";

import { useState } from "react";
import { useTypedTranslation } from "../../../../../../../shared/hooks/useTypedTranslation/useTypedTranslation";

import { useMilkSegmentedByProducers } from "../../hooks";

const MilkSegmentedPieChart: React.FC = () => {
	const tCommon = useTypedTranslation("common");
	const tMilkCollection = useTypedTranslation("milkCollection");

	const intervalOptions = [
		{ id: "week", value: tCommon("intervals.week") },
		{ id: "month", value: tCommon("intervals.month") },
		{ id: "year", value: tCommon("intervals.year") },
	];

	const [selectedInterval, setSelectedInterval] = useState<IntervalTypes>("week");
	const { data: milkSegmedByProducer } = useMilkSegmentedByProducers(selectedInterval);

	return (
		<div className={styles.container}>
			<ChartHeader
				title={tMilkCollection("milk_collection.analytics.producer_segmentation.title")}
			/>
			<SegmentedPieChart
				data={milkSegmedByProducer || []}
				width="40%"
				nameKey="name"
				dataKey="value"
				aspectRatio={1}
			/>
			<MilkSegmentedPieChartFooter
				intervalOptions={intervalOptions}
				selectedInterval={selectedInterval}
				onIntervalChange={(value) => setSelectedInterval(value as IntervalTypes)}
			/>
		</div>
	);
};

export default MilkSegmentedPieChart;
