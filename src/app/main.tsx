import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { AppRoute } from './routes/AppRoute.js';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={AppRoute} />
	</StrictMode>
);

