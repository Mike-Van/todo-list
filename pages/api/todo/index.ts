import { randomUUID } from 'crypto';

import { Todo } from '~/types';
import { db } from '~/utils/db';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case 'GET':
			return getTodos(req, res);
		case 'POST':
			return createTodo(req, res);
		default:
			res.status(404).end();
	}
}

async function getTodos(_req: NextApiRequest, res: NextApiResponse<Todo[]>) {
	const snapshot = await db.get('todos');
	if (!snapshot.exists()) res.status(200).json([]);
	else {
		const todos = Object.values(snapshot.val()) as Todo[];
		res.status(200).json(todos);
	}
}

async function createTodo(req: NextApiRequest, res: NextApiResponse<Todo>) {
	const newTodo: Todo = {
		id: randomUUID(),
		...req.body,
		createdAt: new Date().toISOString(),
	};

	await db.set(`todos/${newTodo.id}`, newTodo);
	res.status(200).json(newTodo);
}
