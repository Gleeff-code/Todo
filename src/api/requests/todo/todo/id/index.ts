import { api } from '@/api/instance';
import { Todo } from '@/types';

interface TodoParams {
  id: string;
}
type TodoConfig = AxiosRequestConfig<TodoParams>;
type PutTodoParams = {
  id: string;
  todo: Partial<Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>>;
};
type PutTodoConfig = AxiosRequestConfig<PutTodoParams>;

export const putTodo = async ({ params, config }: PutTodoConfig) => api.put(`Todos/${params?.id}`, params.todo, config);

export const deleteTodo = async ({ params }: TodoConfig) => api.delete(`Todos/${params?.id}`);

export const getTodo = async ({ params }: TodoConfig) => api.get<Todo>(`Todos/${params?.id}`);
