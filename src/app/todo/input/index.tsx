import { useRouter } from 'next/router';
import { ChangeEventHandler, FC, KeyboardEventHandler, useEffect, useMemo, useState } from 'react';

import { useCreateTodo, useGetTodos, useUpdateTodo } from '~/queries/todos';
import { Todo } from '~/types';

const Input: FC = () => {
	const router = useRouter();

	const [title, setTitle] = useState<Todo['title']>('');
	const { data } = useGetTodos();
	const createTodo = useCreateTodo();
	const updateTodo = useUpdateTodo();

	const isEditing = !!router.query.editing;
	const isActionDisabled = useMemo(() => {
		if (!title) return true;
		if (!data?.length) return false;

		if (isEditing)
			return data.filter((item) => item.id !== router.query.editing).some((item) => item.title === title);

		return data.some((item) => item.title === title);
	}, [title, data, isEditing, router.query.editing]);

	useEffect(() => {
		if (isEditing && data?.length) {
			const todo = data.find((item) => item.id === router.query.editing);
			if (!todo) {
				router.replace('/');
				return;
			}

			setTitle(todo.title);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEditing, data]);

	const handleTitleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		const newValue = e.target.value;
		setTitle(newValue);

		if (newValue) router.replace({ query: { ...router.query, filter: newValue } });
		else router.replace({ query: router.query.editing ? { editing: router.query.editing } : {} });
	};

	const handleActionButtonClick = () => {
		if (isActionDisabled) return;

		if (isEditing) {
			updateTodo.mutate({ id: router.query.editing as string, body: { title } });
		} else {
			createTodo.mutate({ title, isCompleted: false });
		}

		setTitle('');
		router.replace('/');
	};

	const handleTitleInputKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === 'Enter') handleActionButtonClick();
	};

	return (
		<div>
			<input autoFocus onChange={handleTitleInputChange} value={title} onKeyDown={handleTitleInputKeyDown} />
			<button disabled={isActionDisabled} onClick={handleActionButtonClick}>
				{isEditing ? 'Save' : 'Add'}
			</button>
		</div>
	);
};

export { Input };
