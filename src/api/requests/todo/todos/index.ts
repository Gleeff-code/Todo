import { api } from '@/api/instance';
import { Todo } from '@/types';

export const getTodos = async (requestConfig?: AxiosRequestConfig) => api.get<Todo[]>('Todos', requestConfig?.config);
