import styles from "./Pasteurisation.module.scss";

import { NAVIGATION_ROUTES } from "../../../configs/navigation";

import PasteurisationTimeSeriesChart from "../../../features/domain/pasteurisation/features/pasteurisationTimeSeriesChart";
import PasteurisationSegmentedPieChart from "../../../features/domain/pasteurisation/features/pasteurisationSegmentedPieChart";
import PageHeader from "../../../shared/components/pageHeader";
import TrendCard from "../../../shared/components/trendCard";
import IconButton from "../../../shared/components/base/iconButton";

import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import { usePasteurisationSummary } from "../../../features/domain/pasteurisation/hooks/usePasteurisationSummary";
import { useTypedTranslation } from "../../../shared/hooks/useTypedTranslation/useTypedTranslation";

const MdOutlineAddCircleOutline = React.lazy(() =>
	import("react-icons/md").then((mod) => ({
		default: mod.MdOutlineAddCircleOutline,
	}))
);

const Pasteurisation: React.FC = () => {
	const pasteurOptions = useLoaderData<{ id: string; value: string }[]>();

	const navigate = useNavigate();
	const tCommon = useTypedTranslation("common");
	const tPasteurisation = useTypedTranslation("pasteurisation");

	const { data: pasteurisationSummaryData } = usePasteurisationSummary();

	const headerActionElement = (
		<IconButton onClick={() => navigate(NAVIGATION_ROUTES.milkCollection.create.path)}>
			<MdOutlineAddCircleOutline size={"1rem"} />
		</IconButton>
	);

	const pasteurOptionsWithAll = [{ id: "all", value: tCommon("common.all") }, ...pasteurOptions];

	return (
		<>
			<PageHeader
				title={tPasteurisation("pasteurisation.page_title")}
				onNavigateBack={() => navigate("/")}
				actionElement={headerActionElement}
			/>
			<div className={styles.row}>
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
				<TrendCard
					title={tCommon("intervals.year")}
					value={pasteurisationSummaryData?.last_year_total || 0}
					unit={tCommon("units.liter")}
					percentageChange={pasteurisationSummaryData?.last_year_change}
				/>
			</div>

			<div className={styles.chartRow}>
				<PasteurisationTimeSeriesChart pasteurOptions={pasteurOptionsWithAll} />
				<PasteurisationSegmentedPieChart />
			</div>
		</>
	);
};

export default Pasteurisation;
