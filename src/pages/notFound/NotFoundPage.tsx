import { Link } from 'react-router';

export function NotFoundPage() {
	return (
		<>
			<p>
				Opps, maybe we return to <Link to={'/'}>Home page</Link>
			</p>
		</>
	);
}
