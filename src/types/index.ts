type Todo = {
	id: string;
	title: string;
	isCompleted: boolean;
	createdAt: string;
};

type TodoCreateInput = Pick<Todo, 'title' | 'isCompleted'>;
type TodoUpdateInput = Partial<TodoCreateInput>;

export type { Todo, TodoCreateInput, TodoUpdateInput };
