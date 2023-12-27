import { get, ref, remove, set, update } from 'firebase/database';

import { getDatabase } from '~/libs/firebase';

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

export { db };
