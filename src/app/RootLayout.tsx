import { Outlet } from 'react-router';
import './RootLayout.module.css';
import { Header } from '../widgets/Header';

export function RootLayout() {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
}
