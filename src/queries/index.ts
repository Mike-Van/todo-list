import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { onChildRemoved, onValue, ref } from 'firebase/database';
import { useEffect } from 'react';

import { apiInstance } from '~/libs/axios';
import { getDatabase } from '~/libs/firebase';
import { Todo, TodoCreateInput, TodoUpdateInput } from '~/types';

const useSubscribeTodos = () => {
	const queryClient = useQueryClient();

	useEffect(() => {
		const db = getDatabase();

		onChildRemoved(ref(db, 'todos'), (snapshot) => {
			if (snapshot.exists()) {
				queryClient.setQueryData<Todo[]>(['todos'], (prevData) => {
					if (!prevData) return [];

					return prevData.filter((todo) => todo.id !== snapshot.val().id);
				});
			}
		});

		onValue(ref(db, 'todos'), (snapshot) => {
			if (snapshot.exists()) {
				queryClient.setQueryData<Todo[]>(['todos'], () => {
					const todos: Todo[] = Object.values(snapshot.val());
					return todos;
				});
			}
		});
	}, [queryClient]);
};

const useGetTodos = () => {
	return useQuery({
		queryKey: ['todos'],
		queryFn: () => apiInstance.get<Todo[]>('/todo'),
	});
};
const useCreateTodo = () => {
	return useMutation({
		mutationFn: (body: TodoCreateInput) => apiInstance.post<Todo>('/todo', body),
	});
};

const useUpdateTodo = () => {
	return useMutation({
		mutationFn: ({ id, body }: { id: string; body: TodoUpdateInput }) =>
			apiInstance.put<Todo>(`/todo/${id}`, body),
	});
};
const useDeleteTodo = () => {
	return useMutation({
		mutationFn: (id: string) => apiInstance.delete(`/todo/${id}`),
	});
};

export { useCreateTodo, useDeleteTodo, useGetTodos, useSubscribeTodos, useUpdateTodo };
