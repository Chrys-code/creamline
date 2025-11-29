import type { IntervalTypes } from "../../../features/domain/milk/types";
import styles from "./MilkCollection.module.scss";

import PageHeader from "../../../shared/components/pageHeader";
import TrendCard from "../../../shared/components/trendCard";
import MilkChart from "../../../features/domain/milk/components/milkChart";
import IconButton from "../../../shared/components/base/iconButton";

import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { useMilkSummary } from "../../../features/domain/milk/hooks/useMilkSummary";
import { useMilkTrend } from "../../../features/domain/milk/hooks/useMilkTrend";
import { useTypedTranslation } from "../../../shared/hooks/useTypedTranslation/useTypedTranslation";
import { getOffsetDate } from "../../../shared/helpers/getDate/getDate";
import { NAVIGATION_ROUTES } from "../../../configs/navigation";

const MdOutlineAddCircleOutline = React.lazy(() =>
	import("react-icons/md").then((mod) => ({
		default: mod.MdOutlineAddCircleOutline,
	}))
);

const MilkCollection: React.FC = () => {
	const producerOptions = useLoaderData<{ id: string; value: string }[]>();

	const navigate = useNavigate();
	const tCommon = useTypedTranslation("common");
	const tMilkCollection = useTypedTranslation("milkCollection");

	const [selectedStartDate, setSelectedStartDate] = useState<string>(getOffsetDate(-7));
	const [selectedEndDate, setSelectedEndDate] = useState<string>(getOffsetDate(0));
	const [selectedInterval, setSelectedInterval] = useState<IntervalTypes>("day");
	const [selectedProducer, setSelectedProducer] = useState<string>("all");

	const { data: milkTrendData } = useMilkTrend(
		selectedInterval,
		selectedStartDate,
		selectedEndDate,
		selectedProducer
	);
	const { data: milkSummaryData } = useMilkSummary();

	const headerActionElement = (
		<IconButton onClick={() => navigate(NAVIGATION_ROUTES.milkCollection.create)}>
			<MdOutlineAddCircleOutline size={"1rem"} />
		</IconButton>
	);

	const producerOptionsWithAll = [
		{ id: "all", value: tCommon("common.all") },
		...producerOptions,
	];
	const intervalOptions = [
		{ id: "day", value: tCommon("intervals.day") },
		{ id: "week", value: tCommon("intervals.week") },
		{ id: "month", value: tCommon("intervals.month") },
		{ id: "year", value: tCommon("intervals.year") },
	];

	return (
		<>
			<PageHeader
				title={tMilkCollection("milk_collection.page_title")}
				onNavigateBack={() => navigate("/")}
				actionElement={headerActionElement}
			/>
			<div className={styles.row}>
				<TrendCard
					title={tCommon("intervals.day")}
					value={milkSummaryData?.today_total || 0}
					unit={tCommon("units.liter")}
					percentageChange={milkSummaryData?.today_change}
				/>
				<TrendCard
					title={tCommon("intervals.week")}
					value={milkSummaryData?.last_7_days_total || 0}
					unit={tCommon("units.liter")}
					percentageChange={milkSummaryData?.last_7_days_change}
				/>
				<TrendCard
					title={tCommon("intervals.month")}
					value={milkSummaryData?.last_30_days_total || 0}
					unit={tCommon("units.liter")}
					percentageChange={milkSummaryData?.last_30_days_change}
				/>
			</div>

			<MilkChart
				chartData={milkTrendData || []}
				selectedStartDate={selectedStartDate}
				onStartDateChange={(e) => setSelectedStartDate(e.target.value)}
				selectedEndDate={selectedEndDate}
				onEndDateChange={(e) => setSelectedEndDate(e.target.value)}
				intervalOptions={intervalOptions}
				selectedInterval={selectedInterval}
				onIntervalChange={(e) => setSelectedInterval(e.target.value as IntervalTypes)}
				producerOptions={producerOptionsWithAll}
				selectedProducer={selectedProducer}
				onProducerChange={(e) => setSelectedProducer(e.target.value)}
			/>
		</>
	);
};

export default MilkCollection;
