import styles from "./Pasteurisation.module.scss";

import MilkTimeSeriesChart from "../../../features/domain/milk/features/milkTimeSeriesChart";

import PageHeader from "../../../shared/components/pageHeader";
import TrendCard from "../../../shared/components/trendCard";
import IconButton from "../../../shared/components/base/iconButton";

import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import { usePasteurisationSummary } from "../../../features/domain/pasteurisation/hooks/usePasteurisationSummary";
import { useTypedTranslation } from "../../../shared/hooks/useTypedTranslation/useTypedTranslation";
import { NAVIGATION_ROUTES } from "../../../configs/navigation";

const MdOutlineAddCircleOutline = React.lazy(() =>
	import("react-icons/md").then((mod) => ({
		default: mod.MdOutlineAddCircleOutline,
	}))
);

const Pasteurisation: React.FC = () => {
	const producerOptions = useLoaderData<{ id: string; value: string }[]>();

	const navigate = useNavigate();
	const tCommon = useTypedTranslation("common");
	const tPasteurisation = useTypedTranslation("pasteurisation");

	const { data: pasteurisationSummaryData } = usePasteurisationSummary();

	const headerActionElement = (
		<IconButton onClick={() => navigate(NAVIGATION_ROUTES.milkCollection.create)}>
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
				title={tPasteurisation("pasteurisation.page_title")}
				onNavigateBack={() => navigate("/")}
				actionElement={headerActionElement}
			/>
			<div className={styles.row}>
				<TrendCard
					title={tCommon("intervals.day")}
					value={pasteurisationSummaryData?.today_total || 0}
					unit={tCommon("units.liter")}
					percentageChange={pasteurisationSummaryData?.today_change}
				/>
				<TrendCard
					title={tCommon("intervals.week")}
					value={pasteurisationSummaryData?.last_week_total || 0}
					unit={tCommon("units.liter")}
					percentageChange={pasteurisationSummaryData?.last_week_change}
				/>
				<TrendCard
					title={tCommon("intervals.month")}
					value={pasteurisationSummaryData?.last_month_total || 0}
					unit={tCommon("units.liter")}
					percentageChange={pasteurisationSummaryData?.last_month_change}
				/>
			</div>

			<div className={styles.chartRow}>
				<MilkTimeSeriesChart producerOptions={producerOptionsWithAll} />
			</div>
		</>
	);
};

export default Pasteurisation;
