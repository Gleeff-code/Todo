import { RouterProvider } from 'react-router-dom';
import { StoreProvider } from './store/StoreProvider.tsx';
import { router } from './routes/index.tsx';

export const Providers = () => {
  return (
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  );
};
