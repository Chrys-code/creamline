import styles from "./MilkTimeSeriesChart.module.scss";
import type { IntervalTypes } from "../../../../../../../shared/types";

import MilkTimeSeriesChartFilters from "../milkTimeSeriesChartFilters";

import ChartHeader from "../../../../../../../shared/components/charts/chartHeader";
import Button from "../../../../../../../shared/components/base/button";
import IconButton from "../../../../../../../shared/components/base/iconButton";
import TimeSeriesChart from "../../../../../../../shared/components/charts/timeSeriesChart";

import React, { useState } from "react";
import { useMilkTimeSeries } from "../../hooks";
import { getOffsetDate } from "../../../../../../../shared/helpers/getDate/getDate";
import { useTypedTranslation } from "../../../../../../../shared/hooks/useTypedTranslation/useTypedTranslation";

type ProducerOptions = { id: string; value: string }[];

const MdOutlineFilterAlt = React.lazy(() =>
	import("react-icons/md").then((mod) => ({
		default: mod.MdOutlineFilterAlt,
	}))
);

const RxCornerBottomLeft = React.lazy(() =>
	import("react-icons/rx").then((mod) => ({
		default: mod.RxCornerBottomLeft,
	}))
);

const MilkTimeSeriesChartContainer: React.FC<{ producerOptions: ProducerOptions }> = ({
	producerOptions,
}: {
	producerOptions: ProducerOptions;
}) => {
	const tCommon = useTypedTranslation("common");
	const tMilkCollection = useTypedTranslation("milkCollection");

	const intervalOptions = [
		{ id: "day", value: tCommon("intervals.day") },
		{ id: "week", value: tCommon("intervals.week") },
		{ id: "month", value: tCommon("intervals.month") },
		{ id: "year", value: tCommon("intervals.year") },
	];

	const [filterIsOpen, setIsOpen] = useState(false);

	const [withAxis, setWithAxis] = useState(false);
	const [selectedStartDate, setSelectedStartDate] = useState<string>(getOffsetDate(-7));
	const [selectedEndDate, setSelectedEndDate] = useState<string>(getOffsetDate(0));
	const [selectedInterval, setSelectedInterval] = useState<IntervalTypes>("day");
	const [selectedProducer, setSelectedProducer] = useState<string>("all");

	const { data: milkTrendData } = useMilkTimeSeries(
		selectedInterval,
		selectedStartDate,
		selectedEndDate,
		selectedProducer
	);

	const renderChartHeaderActions = () => (
		<>
			<Button type="button" onClick={() => console.log("HA!")}>
				Export
			</Button>
			<IconButton onClick={() => setWithAxis((withAxis) => !withAxis)}>
				<RxCornerBottomLeft size={"1.25rem"} />
			</IconButton>
			<IconButton onClick={() => setIsOpen((isOpen) => !isOpen)}>
				<MdOutlineFilterAlt size={"1.25rem"} />
			</IconButton>
		</>
	);

	return (
		<div className={styles.container}>
			<ChartHeader
				title={tMilkCollection("milk_collection.analytics.trend.title")}
				actions={renderChartHeaderActions()}
			/>
			<MilkTimeSeriesChartFilters
				isOpen={filterIsOpen}
				selectedStartDate={selectedStartDate}
				onStartDateChange={(e) => setSelectedStartDate(e.target.value)}
				selectedEndDate={selectedEndDate}
				onEndDateChange={(e) => setSelectedEndDate(e.target.value)}
				intervalOptions={intervalOptions}
				selectedInterval={selectedInterval}
				onIntervalChange={(e) => setSelectedInterval(e.target.value as IntervalTypes)}
				producerOptions={producerOptions}
				selectedProducer={selectedProducer}
				onProducerChange={(e) => setSelectedProducer(e.target.value)}
			/>
			<TimeSeriesChart
				width={"100%"}
				withAxis={withAxis}
				data={milkTrendData || []}
				xAxisDataYey="date"
				yAsixDatKey="total_liters"
				aspectRatio={2}
			/>
		</div>
	);
};

export default MilkTimeSeriesChartContainer;
