import type React from "react";
import type { IntervalTypes } from "@/shared/types";
import styles from "./MilkSegmentedPieChart.module.scss";

import MilkSegmentedPieChartFooter from "../milkSegmentedPieChartFooter";

import ChartHeader from "@/shared/components/charts/chartHeader";
import SegmentedPieChart from "@/shared/components/charts/segmentedPieChart";
import Loader from "@/shared/components/base/loader";

import { useState } from "react";
import { useMilkSegmentedByProducers } from "../../hooks";
import { useTypedTranslation } from "@/shared/hooks/useTypedTranslation/useTypedTranslation";

const MilkSegmentedPieChart: React.FC = () => {
	const tCommon = useTypedTranslation("common");
	const tMilkCollection = useTypedTranslation("milkCollection");

	const intervalOptions = [
		{ id: "week", value: tCommon("intervals.week") },
		{ id: "month", value: tCommon("intervals.month") },
		{ id: "year", value: tCommon("intervals.year") },
	];

	const [selectedInterval, setSelectedInterval] = useState<IntervalTypes>("week");
	const { data: milkSegmedByProducer, isLoading } = useMilkSegmentedByProducers(selectedInterval);

	return (
		<div className={styles.container}>
			<ChartHeader
				title={tMilkCollection("milk_collection.analytics.producer_segmentation.title")}
			/>
			{isLoading ? (
				<Loader />
			) : (
				<SegmentedPieChart
					data={milkSegmedByProducer || []}
					width={200}
					nameKey="name"
					dataKey="value"
				/>
			)}
			<MilkSegmentedPieChartFooter
				intervalOptions={intervalOptions}
				selectedInterval={selectedInterval}
				isDisabled={isLoading}
				onIntervalChange={(value) => setSelectedInterval(value as IntervalTypes)}
			/>
		</div>
	);
};

export default MilkSegmentedPieChart;
