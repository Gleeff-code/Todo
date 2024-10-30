import { createBrowserRouter } from 'react-router-dom';
import { TodoRoutes } from './Todo';
import { App } from '@/App';
import { AuthRoutes } from './Auth';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [...TodoRoutes, ...AuthRoutes],
  },
]);
