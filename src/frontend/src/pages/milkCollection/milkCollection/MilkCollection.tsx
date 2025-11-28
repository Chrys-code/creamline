import type { IntervalTypes } from "../../../features/domain/milk/types";
import styles from "./MilkCollection.module.scss";

import PageHeader from "../../../shared/components/pageHeader";
import TrendCard from "../../../shared/components/trendCard";
import MilkChart from "../../../features/domain/milk/components/milkChart";
import Button from "../../../shared/components/base/button";
import IconButton from "../../../shared/components/base/iconButton";

import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { useMilkSummary } from "../../../features/domain/milk/hooks/useMilkSummary";
import { useMilkTrend } from "../../../features/domain/milk/hooks/useMilkTrend";
import { useTypedTranslation } from "../../../shared/hooks/useTypedTranslation/useTypedTranslation";

const MdOutlineAddCircleOutline = React.lazy(() =>
	import("react-icons/md").then((mod) => ({
		default: mod.MdOutlineAddCircleOutline,
	}))
);

const INTERVAL_LIMITS = {
	day: 90,
	week: 52,
	month: 24,
	quarter: 12,
	year: 5,
};

const MilkCollection: React.FC = () => {
	const producerOptions = useLoaderData<{ id: string; value: string }[]>();

	const navigate = useNavigate();
	const tCommon = useTypedTranslation("common");
	const tMilkCollection = useTypedTranslation("milkCollection");

	const [selectedInterval, setSelectedInterval] = useState<IntervalTypes>("day");
	const [selectedRange, setSelectedRange] = useState<number>(1);
	const [selectedProducer, setSelectedProducer] = useState<string>();

	const { data: milkTrendData } = useMilkTrend(selectedInterval, selectedRange, selectedProducer);
	const { data: milkSummaryData } = useMilkSummary();

	const headerActionElement = (
		<IconButton onClick={() => navigate("/milk-collection/create")}>
			<MdOutlineAddCircleOutline size={"1rem"} />
		</IconButton>
	);

	const intervalOptions = [
		{ id: "day", value: tCommon("intervals.day") },
		{ id: "week", value: tCommon("intervals.week") },
		{ id: "month", value: tCommon("intervals.month") },
		{ id: "year", value: tCommon("intervals.year") },
	];

	const maxRange = INTERVAL_LIMITS[selectedInterval] || 1;
	const rangeOptions = Array.from({ length: maxRange }, (_, i) => ({
		id: i + 1,
		value: `${i + 1}`,
	}));

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
				intervalOptions={intervalOptions}
				selectedInterval={selectedInterval}
				onIntervalChange={(e) => setSelectedInterval(e.target.value as IntervalTypes)}
				rangeOptions={rangeOptions}
				selectedRange={selectedRange}
				onRangeChange={(e) => setSelectedRange(Number(e.target.value))}
				producerOptions={producerOptions}
				selectedProducer={selectedProducer}
				onProducerChange={(e) => setSelectedProducer(e.target.value)}
			/>

			<div className={styles.center}>
				<Button type="button" onClick={() => navigate("/milk-collection")}>
					{tMilkCollection("milk_collection.see_milk_collections")}
				</Button>
			</div>
		</>
	);
};

export default MilkCollection;
