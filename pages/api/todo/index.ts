import { randomUUID } from 'crypto';

import { get, ref, remove, set, update } from 'firebase/database';

import { getDatabase } from '~/libs/firebase';

import type { NextApiRequest, NextApiResponse } from 'next';

const db = {
	get: (path: string) => {
		const db = getDatabase();
		const dataRef = ref(db, path);
		return get(dataRef);
	},
	set: (path: string, value: Record<string, unknown>) => {
		const db = getDatabase();
		const dataRef = ref(db, path);
		return set(dataRef, value);
	},
	update: (path: string, value: Record<string, unknown>) => {
		const db = getDatabase();
		const dataRef = ref(db, path);
		return update(dataRef, value);
	},
	remove: (path: string) => {
		const db = getDatabase();
		const dataRef = ref(db, path);
		return remove(dataRef);
	},
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		const snapshot = await db.get('todos');
		if (!snapshot.exists()) res.status(200).json([]);
		else {
			const todos = Object.values(snapshot.val());
			res.status(200).json(todos);
		}
	}

	if (req.method === 'POST') {
		const newTodo = { id: randomUUID(), ...req.body, createdAt: new Date().toISOString() };
		await db.set(`todos/${newTodo.id}`, newTodo);
		res.status(200).json(newTodo);
	}

	if (req.method === 'PUT' && req.query.id) {
		const snapshop = await db.get(`todos/${req.query.id}`);
		if (!snapshop.exists()) res.status(404).end();
		else {
			const updatedTodo = { ...snapshop.val(), ...req.body };
			await db.update(`todos/${req.query.id}`, updatedTodo);
			res.status(200).json(updatedTodo);
		}
	}

	if (req.method === 'DELETE' && req.query.id) {
		const snapshop = await db.get(`todos/${req.query.id}`);
		if (!snapshop.exists()) res.status(404).end();

		await db.remove(`todos/${req.query.id}`);
		res.status(201).end();
	}

	res.status(404).end();
}
