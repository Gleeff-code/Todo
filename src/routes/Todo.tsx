import { Todo } from '@/pages/Todo';
import { Todos } from '@/pages/Todos';
import { RouteObject } from 'react-router-dom';

export const TodoRoutes: RouteObject[] = [
  {
    element: <Todos />,
    index: true,
  },
  {
    path: '/todos',
    element: <Todos />,
  },
  {
    path: '/todos/:id',
    element: <Todo />,
  },
];
