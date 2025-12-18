import styles from "./PasteurisationTimeSeriesChart.module.scss";
import type { IntervalTypes } from "../../../../../../../shared/types";
import type { FilterState } from "../../types";

import PasteurisationTimeSeriesChartFilters from "../pasteurisationTimeSeriesChartFilterForm";
import ChartHeader from "../../../../../../../shared/components/charts/chartHeader";
import IconButton from "../../../../../../../shared/components/base/iconButton";
import TimeSeriesChart from "../../../../../../../shared/components/charts/timeSeriesChart";
import Dialog from "../../../../../../../shared/components/dialog";
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

	const [withAxis, setWithAxis] = useState(false);
	const [filterIsOpen, setIsOpen] = useState(false);

	const [chartFilterState, setChartFilterState] = useState({
		startDate: getOffsetDate(-7),
		endDate: getOffsetDate(0),
		interval: "day" as IntervalTypes,
		pasteur: "all",
	});

	const { data: milkTrendData, isLoading } = usePasteurisationTimeSeries({
		interval: chartFilterState.interval,
		pasteur_uuid: chartFilterState.pasteur,
		start_date: chartFilterState.startDate,
		end_date: chartFilterState.endDate,
	});

	const renderChartHeaderActions = () => (
		<>
			<IconButton
				type="button"
				onClick={() =>
					useExportPasteurisationTimeSeries({
						start_date: chartFilterState.startDate,
						end_date: chartFilterState.endDate,
						interval: chartFilterState.interval,
						pasteur_uuid: chartFilterState.pasteur,
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
			<Dialog title="Filters" isOpen={filterIsOpen} onClose={() => setIsOpen(false)}>
				<PasteurisationTimeSeriesChartFilters
					isDisabled={isLoading}
					chartFilterState={chartFilterState}
					intervalOptions={intervalOptions}
					pasteurOptions={pasteurOptions}
					onSubmit={(data: FilterState) => setChartFilterState(data)}
					onClose={() => setIsOpen(false)}
				/>
			</Dialog>
		</div>
	);
};

export default PasteurisationTimeSeriesChartContainer;
