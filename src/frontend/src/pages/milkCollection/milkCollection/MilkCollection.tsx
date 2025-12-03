import styles from "./MilkCollection.module.scss";
import type { IntervalTypes } from "../../../shared/types";

import MilkTimeSeriesChart from "../../../features/domain/milk/features/milkTimeSeriesChart";
import MilkPieChart from "../../../features/domain/milk/components/milkPieChart";

import PageHeader from "../../../shared/components/pageHeader";
import TrendCard from "../../../shared/components/trendCard";
import IconButton from "../../../shared/components/base/iconButton";

import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { useMilkSummary } from "../../../features/domain/milk/hooks/useMilkSummary";
import { useTypedTranslation } from "../../../shared/hooks/useTypedTranslation/useTypedTranslation";
import { useMilkSegmentedByProducers } from "../../../features/domain/milk/hooks/useMilkSegmentedByProducers";
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

	const [selectMilkSegmentedByProducerInterval, setSelectMilkSegmentedByProducerInterval] =
		useState<IntervalTypes>("day");

	const { data: milkSummaryData } = useMilkSummary();

	const { data: milkSegmedByProducer } = useMilkSegmentedByProducers(
		selectMilkSegmentedByProducerInterval
	);

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

			<div className={styles.chartRow}>
				<MilkTimeSeriesChart producerOptions={producerOptionsWithAll} />
				<MilkPieChart
					chartData={milkSegmedByProducer || []}
					intervalOptions={intervalOptions}
					selectedInterval={selectMilkSegmentedByProducerInterval}
					onIntervalChange={(value) =>
						setSelectMilkSegmentedByProducerInterval(value as IntervalTypes)
					}
				/>
			</div>
		</>
	);
};

export default MilkCollection;
