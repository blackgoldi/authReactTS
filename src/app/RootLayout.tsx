import { Outlet } from 'react-router';
import './RootLayout.css';
import { Header } from '../widgets/Header';

export function RootLayout() {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
}
