import type { HeaderProps } from './Header.types.ts'
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineMenu } from "react-icons/md";
import styles from './Header.module.scss';


const Header: React.FC<HeaderProps> = ({ }: HeaderProps) => {
	return (
		<div className={styles.container}>
			<MdCheckBoxOutlineBlank size="3rem" fill='white' />
			<menu><MdOutlineMenu size="2rem" fill='white' /></menu>
		</div>
	)
}

export default Header