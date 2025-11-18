import { Link } from 'react-router';
import styles from './Header.module.css';
import { pages } from '../../../app/routes/pages';

export function Header() {
	return (
		<div className={styles.header}>
			<nav className={styles.nav}>
				{pages.map((p) => {
					return p.id ? (
						<li key={p.id} className={styles.li}>
							<Link className={styles.a} to={p.path}>
								{p.id}
							</Link>
						</li>
					) : null;
				})}
			</nav>
			<button className={styles.exit_btn}>
				<p>Exit</p>
			</button>
		</div>
	);
}
