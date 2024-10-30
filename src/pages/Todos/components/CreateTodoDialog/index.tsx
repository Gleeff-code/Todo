import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { todoSlice } from '@/store/slices/todo/slice';
import { useAppDispatch } from '@/hooks';
import { DatePicker } from '@/components/ui/datePicker';
import { postTodo } from '@/api/requests/todo/todo';
import { addHours, isBefore, parseISO, subDays } from 'date-fns';
import { getTodos } from '@/api/requests';

export const TodoDialog = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<Date>();
  const [isTitleValid, setIsTitleValid] = useState<boolean>(true);
  const [isDateValid, setIsDateValid] = useState<boolean>(true);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { setTodos } = todoSlice.actions;

  const onTitleChange = (value: string) => {
    setTitle(value);
    setIsTitleValid(true);
  };

  const onDateChange = (date: Date | undefined) => {
    setDate(date);
    if (!date) return setIsDateValid(true);
    setIsDateValid(isBefore(parseISO(new Date()?.toISOString()), subDays(date, -1)));
  };

  const onSumbit = async () => {
    if (!title) return setIsTitleValid(false);
    setIsDialogOpen(false);
    setTimeout(() => {
      setTitle('');
      setDescription('');
      setDate(undefined);
    }, 200);
    await postTodo({
      params: {
        title,
        description,
        // Добавил 6 часов, так как я отправляю 2024-10-31T00:00:00, но получая с api на 6 часов меньше, скорее всего из-за часового пояса
        dueDate: date ? addHours(date, 6).toISOString() : null,
        isCompleted: false,
      },
    });
    // В ответе я не получаю uuid, поэтому если добавлю сам новое todo то он будет иметь не актуальный id и я не могу получить его в странице todo, поэтому придёться после каждого создания получать все todo из api. Не очень хорошое решение.
    const todos = await getTodos();
    dispatch(setTodos(todos.data));
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>Add Todo</Button>
      </DialogTrigger>
      <DialogContent className='max-w-[525px]'>
        <DialogHeader>
          <DialogTitle>Create Todo</DialogTitle>
          <DialogDescription>Create a todo here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='todo-create-title' className='text-right'>
              Title
            </Label>
            <Input
              id='todo-create-title'
              value={title}
              className={`col-span-3 ${isTitleValid ? '' : '!border-red-500 focus:!ring-0'}`}
              onChange={(e) => onTitleChange(e.target.value)}
              maxLength={200}
              autoFocus
              autoComplete='off'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='todo-create-description' className='text-right'>
              Description
            </Label>
            <Textarea
              id='todo-create-description'
              value={description}
              className='col-span-3 resize-none no-scrollbar'
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <div className='text-sm font-medium leading-none text-right'>Completion date</div>
            <DatePicker date={date} onDateChange={onDateChange} error={!isDateValid} />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit' onClick={onSumbit} disabled={!isTitleValid || !isDateValid}>
            Create Todo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
