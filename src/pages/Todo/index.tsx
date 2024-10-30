import { getTodo, putTodo } from '@/api/requests/todo/todo/id';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/datePicker';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { todoSlice } from '@/store/slices/todo/slice';
import { Todo as TodoType } from '@/types';
import { Label } from '@radix-ui/react-label';
import { addHours, format, isBefore, parseISO, subDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const Todo = () => {
  const { todos, todo: storeTodo } = useAppSelector((state) => state.todo);
  const id = useParams().id;
  const [todo, setTodo] = useState<TodoType | undefined>(storeTodo ? storeTodo : todos.find((todo) => todo.id === id));
  const { title, description, dueDate: date, isCompleted } = todo || {};

  const dispatch = useAppDispatch();
  const { changeTodo, setTodo: setStoreTodo } = todoSlice.actions;

  const onSubmit = async () => {
    if (!title) return;
    const newTodo: Partial<TodoType> = {
      title,
      description,
      isCompleted,
      dueDate: date,
    };
    // Те же манипуляции со временем как и в создании todo
    await putTodo({
      params: { id: todo!.id, todo: { ...newTodo, dueDate: date ? addHours(date, 6).toISOString() : null } },
    });
    dispatch(changeTodo({ id: todo!.id, ...newTodo, updatedAt: new Date().toISOString() }));
    dispatch(setStoreTodo({ ...todo, ...(newTodo as TodoType), updatedAt: new Date().toISOString() }));
  };

  const fetchTodo = async () => {
    const res = await getTodo({ params: { id: id! } });
    setTodo(res.data);
    dispatch(setStoreTodo(res.data));
  };

  useEffect(() => {
    if (todo) return;
    fetchTodo();

    // eslint-disable-next-line
  }, []);

  // Здесь должен был быть скелетон.
  if (!todo) return null;
  const buttonDisabled =
    !title ||
    (isBefore(parseISO(date ? date : new Date()?.toISOString()), subDays(new Date(), 1)) &&
      date !== storeTodo?.dueDate) ||
    (title === storeTodo?.title &&
      description === storeTodo?.description &&
      date === storeTodo?.dueDate &&
      isCompleted === storeTodo?.isCompleted);

  return (
    <div className='flex flex-col w-auto gap-8 items-center pt-16'>
      <h1 className='text-2xl'>Todo</h1>
      <div className='w-full flex gap-6 justify-center'>
        <div className='w-[625px] flex flex-col gap-6'>
          <div className='flex flex-col gap-4'>
            <Label htmlFor='todo-edit-title'>Title</Label>

            <Input
              id='todo-edit-title'
              value={title}
              onChange={(e) => setTodo({ ...todo, title: e.target.value })}
              maxLength={200}
              autoComplete='off'
            />
          </div>
          <div className='flex flex-col gap-4'>
            <Label htmlFor='todo-edit-description'>Description</Label>
            <Textarea
              id='todo-edit-description'
              value={description}
              onChange={(e) => setTodo({ ...todo, description: e.target.value })}
            />
          </div>
          <div className='flex flex-col gap-4'>
            <Label htmlFor='todo-create-description'>Completion date</Label>
            <DatePicker
              date={date ? parseISO(date) : undefined}
              onDateChange={(date) => setTodo({ ...todo, dueDate: date ? addHours(date, 6).toISOString() : null })}
            />
          </div>
          <Button className='`text-base h-10`' variant='outline' disabled={buttonDisabled} onClick={onSubmit}>
            Save
          </Button>
        </div>
        <div className='flex flex-col gap-2 w-60 whitespace-nowrap'>
          <div className='flex justify-between'>
            It was created: {format(todo?.createdAt || '', 'dd.MM.yyyy, HH:mm')}
          </div>
          {todo?.updatedAt && (
            <div className='flex justify-between'>
              Last modified: {format(todo?.updatedAt || '', 'dd.MM.yyyy, HH:mm')}
            </div>
          )}
          <div className='flex items-center space-x-2'>
            <Label htmlFor='complete-mode'>Completed</Label>
            <Switch
              id='complete-mode'
              checked={isCompleted}
              onCheckedChange={() => setTodo({ ...todo, isCompleted: !isCompleted })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
