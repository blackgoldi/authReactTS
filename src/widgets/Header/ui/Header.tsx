import { Link } from 'react-router';
import './Header.css';
import { pages } from '../../../app/routes/AppRoute';

export function Header() {
	return (
		<div className="header">
			<nav>
				{pages.map((p) => {
					return p.id ? (
						<li>
							<Link to={p.path}>{p.id}</Link>
						</li>
					) : null;
				})}
			</nav>
			<button className="exit_btn">
				<p>Exit</p>
			</button>
		</div>
	);
}
