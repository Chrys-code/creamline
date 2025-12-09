import type React from "react";
import type { IntervalTypes } from "../../../../../../../shared/types";
import styles from "./PasteurisationSegmentedPieChart.module.scss";

import Loader from "../../../../../../../shared/components/base/loader";
import ChartHeader from "../../../../../../../shared/components/charts/chartHeader";
import SegmentedPieChart from "../../../../../../../shared/components/charts/segmentedPieChart";
import PasteurisationSegmentedPieChartFooter from "../pasteurisationSegmentedPieChartFooter";

import { useState } from "react";
import { useTypedTranslation } from "../../../../../../../shared/hooks/useTypedTranslation/useTypedTranslation";
import { usePasteurisationSegmentedByProducers } from "../../hooks";

const PasteurisationSegmentedPieChart: React.FC = () => {
	const tCommon = useTypedTranslation("common");
	const tPasteurisation = useTypedTranslation("pasteurisation");

	const intervalOptions = [
		{ id: "week", value: tCommon("intervals.week") },
		{ id: "month", value: tCommon("intervals.month") },
		{ id: "year", value: tCommon("intervals.year") },
	];

	const [selectedInterval, setSelectedInterval] = useState<IntervalTypes>("week");
	const { data: milkSegmedByProducer, isLoading } =
		usePasteurisationSegmentedByProducers(selectedInterval);

	return (
		<div className={styles.container}>
			<ChartHeader
				title={tPasteurisation("pasteurisation.analytics.pasteur_segmentation.title")}
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
			<PasteurisationSegmentedPieChartFooter
				intervalOptions={intervalOptions}
				selectedInterval={selectedInterval}
				isDisabled={isLoading}
				onIntervalChange={(value) => setSelectedInterval(value as IntervalTypes)}
			/>
		</div>
	);
};

export default PasteurisationSegmentedPieChart;
