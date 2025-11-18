import { createBrowserRouter } from 'react-router';
import { RootLayout } from '../RootLayout.tsx';
import { pages } from './pages.tsx';


export const AppRoute = createBrowserRouter([
	{
		path: '/authReactTS',
		element: <RootLayout />,
		children: pages,
	},
]);
