import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from './constants';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postSignUp } from '@/api/requests/auth/signUp';

interface SignInForm {
  email: string;
  password: string;
}

export const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const form = useForm<SignInForm>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setIsLoading(true);
    try {
      await postSignUp({ params: values });
      // Отправляю пользователя на страницу входа, т.к. api не возвращает access token, а с userId я не знаю что делать)
      navigate('/sign-in');
    } catch (e) {
      // Я бы тут использовал AxiosError, в ответе я могу получить e.response.data = string, поэтому ничего не делаю, по хорошому типизировать глобально AxiosError.
      setError(e.response.data);
    }
    setIsLoading(false);
  });

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className='w-[425px] bg-slate-950 p-8 flex flex-col gap-4 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <div className='text-center text-2xl'>Registration</div>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <Label htmlFor='email'>Email</Label>
              <FormControl>
                <Input
                  id='email'
                  placeholder='email'
                  autoCapitalize='none'
                  autoCorrect='off'
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <Label htmlFor='password'>Password</Label>
              <FormControl>
                {/* Здесь по хорошему добавить кнопку, для смены типа инпута, но делаю регистрацию и авторизацию в спешке */}
                <Input
                  id='password'
                  placeholder='your secret password'
                  autoCapitalize='none'
                  autoComplete='password'
                  autoCorrect='off'
                  {...field}
                  type='password'
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormMessage>{error}</FormMessage>
        <Button variant='link' className='w-fit p-0'>
          <Link to='/sign-in'>Sign In</Link>
        </Button>
        <Button type='submit' disabled={isLoading}>
          Submit
        </Button>
      </form>
    </Form>
  );
};