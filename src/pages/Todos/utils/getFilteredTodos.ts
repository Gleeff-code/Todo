import { Todo } from '@/types/Todo';
import { TodoFilter } from '../types/TodoFilter';

export const filterTodos = (
	todos: Todo[],
	value: string,
	filterType: TodoFilter
) => {
	const isCompleted = filterType === 'completed';
	const valueLower = value.toLowerCase();
	return todos.filter((todo) => {
		const todoSearched =
			todo.title.toLowerCase().includes(valueLower) ||
			todo.description.toLowerCase().includes(valueLower);
		if (filterType === 'all') return todoSearched;
		return isCompleted
			? todo.isCompleted && todoSearched
			: !todo.isCompleted && todoSearched;
		// if(todo.title.toLowerCase().includes(valueLower) || todo.description.toLowerCase().includes(valueLower)) {
		// return isCompleted ? todo.isCompleted : !todo.isCompleted
		// if()
		// }
	});
};
