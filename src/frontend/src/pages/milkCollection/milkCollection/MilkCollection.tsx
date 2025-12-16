import styles from "./MilkCollection.module.scss";

import { NAVIGATION_ROUTES } from "../../../configs/navigation";

import MilkTimeSeriesChart from "../../../features/domain/milk/features/milkTimeSeriesChart";
import MilkSegmentedPieChart from "../../../features/domain/milk/features/milkSegmentedPieChart";

import PageHeader from "../../../shared/components/pageHeader";
import TrendCard from "../../../shared/components/trendCard";
import IconButton from "../../../shared/components/base/iconButton";

import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import { useMilkSummary } from "../../../features/domain/milk/hooks/useMilkSummary";
import { useTypedTranslation } from "../../../shared/hooks/useTypedTranslation/useTypedTranslation";

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

	const { data: milkSummaryData } = useMilkSummary();

	const headerActionElement = (
		<IconButton onClick={() => navigate(NAVIGATION_ROUTES.milkCollection.create.path)}>
			<MdOutlineAddCircleOutline size={"1rem"} />
		</IconButton>
	);

	const producerOptionsWithAll = [
		{ id: "all", value: tCommon("common.all") },
		...producerOptions,
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
					value={milkSummaryData?.last_week_total || 0}
					unit={tCommon("units.liter")}
					percentageChange={milkSummaryData?.last_week_change}
				/>
				<TrendCard
					title={tCommon("intervals.month")}
					value={milkSummaryData?.last_month_total || 0}
					unit={tCommon("units.liter")}
					percentageChange={milkSummaryData?.last_month_change}
				/>
			</div>

			<div className={styles.chartRow}>
				<MilkTimeSeriesChart producerOptions={producerOptionsWithAll} />
				<MilkSegmentedPieChart />
			</div>
		</>
	);
};

export default MilkCollection;
