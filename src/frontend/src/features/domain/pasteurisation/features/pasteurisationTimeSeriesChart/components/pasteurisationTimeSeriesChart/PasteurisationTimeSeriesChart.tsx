import styles from "./PasteurisationTimeSeriesChart.module.scss";
import type { IntervalTypes } from "../../../../../../../shared/types";

import PasteurisationTimeSeriesChartFilters from "../pasteurisationTimeSeriesChartFilters";

import ChartHeader from "../../../../../../../shared/components/charts/chartHeader";
import IconButton from "../../../../../../../shared/components/base/iconButton";
import TimeSeriesChart from "../../../../../../../shared/components/charts/timeSeriesChart";

import Loader from "../../../../../../../shared/components/base/loader";
import React, { useState } from "react";
import { getOffsetDate } from "../../../../../../../shared/helpers/getDate/getDate";
import { useTypedTranslation } from "../../../../../../../shared/hooks/useTypedTranslation/useTypedTranslation";
import { usePasteurisationTimeSeries } from "../../hooks";
import { useExportPasteurisationTimeSeries } from "../../../../../../../services/pdfExport/hooks/usePasteurisationTimeSeriesDownload";

type PasteurOptions = { id: string; value: string }[];

const MdOutlineFileDownload = React.lazy(() =>
	import("react-icons/md").then((mod) => ({
		default: mod.MdOutlineFileDownload,
	}))
);

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

const PasteurisationTimeSeriesChartContainer: React.FC<{ pasteurOptions: PasteurOptions }> = ({
	pasteurOptions,
}: {
	pasteurOptions: PasteurOptions;
}) => {
	const tCommon = useTypedTranslation("common");
	const tPasteurisation = useTypedTranslation("pasteurisation");

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
	const [selectedPasteur, setSelectedPasteur] = useState<string>("all");

	const { data: milkTrendData, isLoading } = usePasteurisationTimeSeries(
		selectedInterval,
		selectedStartDate,
		selectedEndDate,
		selectedPasteur
	);

	const renderChartHeaderActions = () => (
		<>
			<IconButton
				type="button"
				onClick={() =>
					useExportPasteurisationTimeSeries({
						start_date: selectedStartDate,
						end_date: selectedEndDate,
						interval: selectedInterval,
						pasteur_uuid: selectedPasteur,
					})
				}
				disabled={isLoading}
			>
				<MdOutlineFileDownload size={"1.25rem"} />
			</IconButton>
			<IconButton onClick={() => setWithAxis((withAxis) => !withAxis)} disabled={isLoading}>
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
				title={tPasteurisation("pasteurisation.analytics.trend.title")}
				actions={renderChartHeaderActions()}
			/>
			<PasteurisationTimeSeriesChartFilters
				isOpen={filterIsOpen}
				isDisabled={isLoading}
				selectedStartDate={selectedStartDate}
				onStartDateChange={(e) => setSelectedStartDate(e.target.value)}
				selectedEndDate={selectedEndDate}
				onEndDateChange={(e) => setSelectedEndDate(e.target.value)}
				intervalOptions={intervalOptions}
				selectedInterval={selectedInterval}
				onIntervalChange={(e) => setSelectedInterval(e.target.value as IntervalTypes)}
				pasteurOptions={pasteurOptions}
				selectedPasteur={selectedPasteur}
				onPasteurChange={(e) => setSelectedPasteur(e.target.value)}
			/>
			{isLoading ? (
				<Loader />
			) : (
				<TimeSeriesChart
					width={"100%"}
					maxHeight={300}
					withAxis={withAxis}
					data={milkTrendData || []}
					xAxisDataYey="date"
					yAsixDatKey="total_liters"
					aspectRatio={1.8}
				/>
			)}
		</div>
	);
};

export default PasteurisationTimeSeriesChartContainer;
