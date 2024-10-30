import { FC } from 'react';
import { Todo } from '@/types/Todo';
import { TodoCard } from '../TodoCard';

interface TodoListProps {
  todos: Todo[];
}

export const TodoList: FC<TodoListProps> = ({ todos }) => {
  return (
    <div className='flex flex-col gap-2'>
      {todos.map((item) => (
        <TodoCard key={item.id} {...item} />
      ))}
    </div>
  );
};
