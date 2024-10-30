export interface Todo {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}
