import { api } from '@/api/instance';
import { Todo } from '@/types';

type PostTodoParams = Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>;
type PostTodoConfig = AxiosRequestConfig<PostTodoParams>;

export const postTodo = async ({ params, config }: PostTodoConfig) => api.post('Todos', params, config);
