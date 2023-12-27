import { randomUUID } from 'crypto';

import { get, ref, remove, set, update } from 'firebase/database';

import { getDatabase } from '~/libs/firebase';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const db = getDatabase();

	if (req.method === 'GET') {
		const snapshot = await get(ref(db, 'todos'));
		if (!snapshot.exists()) res.status(200).json([]);
		else {
			const todos = Object.values(snapshot.val());
			res.status(200).json(todos);
		}
	}

	if (req.method === 'POST') {
		const newTodo = { id: randomUUID(), ...req.body, createdAt: new Date().toISOString() };
		await set(ref(db, `todos/${newTodo.id}`), newTodo);
		res.status(200).json(newTodo);
	}

	if (req.method === 'PUT' && req.query.id) {
		const snapshop = await get(ref(db, `todos/${req.query.id}`));
		if (!snapshop.exists()) res.status(404).end();
		else {
			const updatedTodo = { ...snapshop.val(), ...req.body };
			await update(ref(db, `todos/${req.query.id}`), updatedTodo);
			res.status(200).json(updatedTodo);
		}
	}

	if (req.method === 'DELETE' && req.query.id) {
		const snapshop = await get(ref(db, `todos/${req.query.id}`));
		if (!snapshop.exists()) res.status(404).end();

		await remove(ref(db, `todos/${req.query.id}`));
		res.status(201).end();
	}

	res.status(404).end();
}
