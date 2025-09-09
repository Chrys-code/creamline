import type { AppLayoutProps } from './AppLayout.types';
import styles from './AppLayout.module.scss';

import { Outlet } from "react-router";
import Header from '../Header';
import MobileFooterNav from '../MobileFooterNav';

const AppLayout: React.FC<AppLayoutProps> = ({ type, children }: AppLayoutProps) => {
	return (
		<>
			<Header />
			<main className={styles.container}><Outlet />{children}</main>
			<MobileFooterNav />
		</>
	)
}

export default AppLayout