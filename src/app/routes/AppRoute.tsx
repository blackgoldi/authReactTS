import { createBrowserRouter } from 'react-router';
import { LoginPage } from '../../pages/login/index.tsx';
import { RootLayout } from '../RootLayout.tsx';
import { NotFoundPage } from '../../pages/notFound/NotFoundPage.tsx';
import { AnimePage } from '../../pages/anime/ui/AnimePage.tsx';
import { ThreePage } from '../../pages/threejs/index.tsx';
import { KonvaPage } from '../../pages/konva/index.tsx';
import { TouchEventsPage } from '../../pages/touchEvents/index.tsx';

export const pages = [
	{
		path: 'login',
		element: <LoginPage />,
	},
	{
		id: 'Аnime.js',
		path: 'anime',
		element: <AnimePage />,
	},
	{
		id: 'Three.js',
		path: 'three',
		element: <ThreePage />,
	},
	{
		id: 'React-konva',
		path: 'konva',
		element: <KonvaPage />,
	},
	{
		id: 'Smartphone Touch',
		path: 'touch',
		element: <TouchEventsPage />,
	},
	{
		path: '*',
		element: <NotFoundPage />,
	},
];

export const AppRoute = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: pages,
	},
]);
