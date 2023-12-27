import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';

import { useDeleteTodo, useGetTodos, useSubscribeTodos, useUpdateTodo } from '~/queries/todos';
import { Todo } from '~/types';

const List: FC = () => {
	const router = useRouter();

	useSubscribeTodos();
	const { data, isLoading } = useGetTodos();

	const filteredData = useMemo(() => {
		if (!data?.length) return [];

		if (!router.query.filter) return data;

		return data.filter((item) =>
			item.title.toLowerCase().includes((router.query.filter as string).toLowerCase())
		);
	}, [router, data]);

	return (
		<div>
			<h3>Todo List</h3>
			<br />
			{isLoading && <div>Loading...</div>}
			{!isLoading && !filteredData.length && <div>No result. Create a new one instead!</div>}
			{!isLoading &&
				!!filteredData.length &&
				filteredData.map((item) => <TodoItem key={item.id} item={item} />)}
		</div>
	);
};

export { List };

const TodoItem: FC<{ item: Todo }> = ({ item }) => {
	const router = useRouter();

	const updateTodo = useUpdateTodo();
	const deleteTodo = useDeleteTodo();

	const handleEditClick = () => {
		router.replace({ query: { editing: item.id } });
	};

	const handleCompleteClick = () => {
		updateTodo.mutate({ id: item.id, body: { isCompleted: !item.isCompleted } });
	};

	const handleDeleteClick = () => {
		deleteTodo.mutate(item.id);
		if (router.query.editing === item.id) router.replace('/');
	};

	return (
		<div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '8px' }}>
			<div style={{ textDecoration: item.isCompleted ? 'line-through' : 'none' }}>{item.title}</div>
			<button onClick={handleEditClick}>edit</button>
			<button onClick={handleCompleteClick}>
				{item.isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
			</button>
			<button onClick={handleDeleteClick}>delete</button>
		</div>
	);
};
