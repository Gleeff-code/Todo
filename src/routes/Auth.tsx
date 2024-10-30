import { SignIn } from '@/pages/Auth';
import { SignUp } from '@/pages/Auth/SignUp';
import { RouteObject } from 'react-router-dom';

export const AuthRoutes: RouteObject[] = [
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
];
