import styles from "./MilkTimeSeriesChart.module.scss";
import type { FilterState } from "../../types";
import type { IntervalTypes } from "../../../../../../../shared/types";

import MilkTimeSeriesChartFilterForm from "../milkTimeSeriesChartFilterForm";
import ChartHeader from "../../../../../../../shared/components/charts/chartHeader";
import IconButton from "../../../../../../../shared/components/base/iconButton";
import TimeSeriesChart from "../../../../../../../shared/components/charts/timeSeriesChart";
import Loader from "../../../../../../../shared/components/base/loader";
import Dialog from "../../../../../../../shared/components/dialog";

import React, { useState } from "react";
import { useMilkTimeSeries } from "../../hooks";
import { getOffsetDate } from "../../../../../../../shared/helpers/getDate/getDate";
import { useTypedTranslation } from "../../../../../../../shared/hooks/useTypedTranslation/useTypedTranslation";
import { useExportMilkTimeSeries } from "../../../../../../../services/pdfExport/hooks/useMilkTimeSeriesDownload";

type ProducerOptions = { id: string; value: string }[];

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

	const [withAxis, setWithAxis] = useState(false);
	const [filterIsOpen, setIsOpen] = useState(false);

	const [chartFilterState, setChartFilterState] = useState({
		startDate: getOffsetDate(-7),
		endDate: getOffsetDate(0),
		interval: "day" as IntervalTypes,
		producer: "all",
	});

	const { data: milkTrendData, isLoading } = useMilkTimeSeries({
		interval: chartFilterState.interval,
		producer_uuid: chartFilterState.producer,
		start_date: chartFilterState.startDate,
		end_date: chartFilterState.endDate,
	});

	const renderChartHeaderActions = () => (
		<>
			<IconButton
				type="button"
				onClick={() =>
					useExportMilkTimeSeries({
						start_date: chartFilterState.startDate,
						end_date: chartFilterState.endDate,
						interval: chartFilterState.interval,
						producer_uuid: chartFilterState.producer,
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
				title={tMilkCollection("milk_collection.analytics.trend.title")}
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
				<MilkTimeSeriesChartFilterForm
					isDisabled={isLoading}
					chartFilterState={chartFilterState}
					intervalOptions={intervalOptions}
					producerOptions={producerOptions}
					onSubmit={(data: FilterState) => setChartFilterState(data)}
					onClose={() => setIsOpen(false)}
				/>
			</Dialog>
		</div>
	);
};

export default MilkTimeSeriesChartContainer;
