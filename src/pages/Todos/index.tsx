import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { TodoFilter } from './types/TodoFilter';
import { filterTodos } from './utils/getFilteredTodos';
import { TodoList } from './components/TodoList';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { todoSlice } from '@/store/slices/todo/slice';
import { TodoDialog } from './components/CreateTodoDialog';
import { getTodos } from '@/api/requests';

export const Todos = () => {
  const [value, setValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { todos, activeTodoFilter } = useAppSelector((state) => state.todo);
  const { setTodos, setActiveTodoFilter } = todoSlice.actions;
  const dispatch = useAppDispatch();

  const onFilterTodos = (type: TodoFilter) => dispatch(setActiveTodoFilter(activeTodoFilter === type ? 'all' : type));

  const fetchTodos = async () => {
    const res = await getTodos();
    dispatch(setTodos(res.data));
    setIsLoading(false);
  };

  useEffect(() => {
    if (todos.length) return;
    fetchTodos();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='flex flex-col w-auto gap-8 items-center pt-16'>
      <h1 className='text-green-400 text-4xl'>My Todos</h1>
      <div className='w-96'>
        <div className='flex gap-4'>
          <Input placeholder='Search' value={value} onChange={(e) => setValue(e.target.value)} />
          <TodoDialog />
        </div>
        <div className='flex gap-2 mt-4 mb-2'>
          <Button
            variant={activeTodoFilter === 'uncompleted' ? 'active' : 'secondary'}
            onClick={() => onFilterTodos('uncompleted')}>
            To do
          </Button>
          <Button
            variant={activeTodoFilter === 'completed' ? 'active' : 'secondary'}
            onClick={() => onFilterTodos('completed')}>
            Completed
          </Button>
        </div>
        <TodoList todos={filterTodos(todos, value, activeTodoFilter)} />
        {!todos.length && !isLoading && <div className='text-center text-2xl text-gray-400'>No todos</div>}
      </div>
    </div>
  );
};
