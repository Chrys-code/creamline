import type { TrendCardProps } from "./TrendCard.types";
import styles from "./TrendCard.module.scss";

import { GoDash } from "react-icons/go";
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";

import React from "react";

const TrendCard: React.FC<TrendCardProps> = ({
	title,
	value,
	unit,
	percentageChange = 0,
}: TrendCardProps) => {
	const renderTrendIcon = (percentageChange: number) => {
		if (percentageChange > 0) return <MdArrowDropUp size={"1.5rem"} className={styles.green} />;
		if (percentageChange < 0) return <MdArrowDropDown size={"1.5rem"} className={styles.red} />;
		if (percentageChange === 0) return <GoDash size={"1rem"} className={styles.yellow} />;
		return <GoDash size={"1rem"} className={styles.yellow} />;
	};

	return (
		<div className={styles.container}>
			<div>
				<h3>{title}</h3>
				<div>
					{renderTrendIcon(percentageChange)}
					<span>{percentageChange.toFixed(0)}%</span>
				</div>
			</div>
			<div>
				<span>{value}</span>
				<span>{unit}</span>
			</div>
		</div>
	);
};

export default TrendCard;
