import { FC, MouseEvent } from 'react';
import { Todo } from '@/types/Todo';
import { CheckIcon, TrashIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { todoSlice } from '@/store/slices/todo/slice';
import { motion } from 'framer-motion';
import { deleteTodo, putTodo } from '@/api/requests/todo/todo/id';

export const TodoCard: FC<Todo> = (props) => {
  const { todos } = useAppSelector((state) => state.todo);
  const { setTodo, setTodos, changeTodo } = todoSlice.actions;
  const dispatch = useAppDispatch();

  const onClick = () => dispatch(setTodo(props));

  const onDelete = async (e: MouseEvent) => {
    e.preventDefault();
    await deleteTodo({ params: { id: props.id } });
    dispatch(setTodos(todos.filter((todo) => todo.id !== props.id)));
  };

  const onComplete = async (e: MouseEvent) => {
    e.preventDefault();

    // Странная рализация логики на api, если отправлю put и в params положу только isCompleted он поменяет его, но при новом запросе всех todo его просто нет, поэтому кидаю все другие поля. Возможнно это связано с due date, очень странно работает.
    await putTodo({
      params: {
        id: props.id,
        todo: { title: props.title, description: props.description, dueDate: props.dueDate, isCompleted: true },
      },
    });
    dispatch(changeTodo({ id: props.id, isCompleted: true }));
  };

  return (
    <Link
      to={`/todos/${props.id}`}
      className='relative flex justify-between items-center w-96 h-[100px] bg-slate-800 p-4 gap-4 rounded-md cursor-pointer'
      onClick={onClick}>
      <div className='flex flex-col gap-2 overflow-hidden'>
        <div className='text-green-400 text-2xl text-ellipsis overflow-hidden'>{props.title}</div>
        <div className='text-slate-300 text-lg text-ellipsis overflow-hidden'>{props.description}</div>
      </div>
      <div className='flex gap-4'>
        <TrashIcon
          color='inherit'
          className='w-8 h-8 relative z-10 fill-white transition-colors hover:fill-red-600 cursor-pointer'
          onClick={onDelete}
        />
        {!props.isCompleted && (
          <CheckIcon
            color='inherit'
            className='w-8 h-8 fill-white transition-colors hover:fill-green-600 cursor-pointer'
            onClick={onComplete}
          />
        )}
      </div>
      {/* Framer motion используеться только здесь, учитывая что проект может расширяться то для анимаций хорошая библа, по началу планировал сделать больше анимаций но времени не хватило */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: props.isCompleted ? '100%' : '0' }}
        transition={{ duration: 0.4 }}
        className='w-full h-px bg-green-600 absolute left-0'
      />
    </Link>
  );
};
