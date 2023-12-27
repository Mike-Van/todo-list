import { Todo } from '~/types';
import { db } from '~/utils/db';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	console.log('🚀 ~ req.query:', req.query);
	console.log('🚀 ~ handler ~ req.method:', req.method);

	switch (req.method) {
		case 'PUT':
			return updateTodo(req, res);
		case 'DELETE':
			return deleteTodo(req, res);
		default:
			res.status(404).end();
	}
}

async function updateTodo(req: NextApiRequest, res: NextApiResponse<Todo>) {
	const snapshop = await db.get(`todos/${req.query.id}`);
	if (!snapshop.exists()) res.status(404).end();
	else {
		const updatedTodo: Todo = {
			...snapshop.val(),
			...req.body,
		};

		await db.update(`todos/${req.query.id}`, updatedTodo);
		res.status(200).json(updatedTodo);
	}
}

async function deleteTodo(req: NextApiRequest, res: NextApiResponse) {
	const snapshop = await db.get(`todos/${req.query.id}`);
	if (!snapshop.exists()) res.status(404).end();

	await db.remove(`todos/${req.query.id}`);
	res.status(201).end();
}
