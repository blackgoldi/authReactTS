import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { AppRoute } from './routes/AppRoute.js';

createRoot(document.getElementById('root')!).render(<RouterProvider router={AppRoute} />);

