import { initializeApp } from 'firebase/app';
import { Database, getDatabase as _getDatabase } from 'firebase/database';

const firebaseConfig = {
	// apiKey: process.env.FB_API_KEY,
	// authDomain: process.env.FB_AUTH_DOMAIN,
	// databaseURL: process.env.FB_DATABASE_URL,
	// projectId: process.env.FB_PROJECT_ID,
	// storageBucket: process.env.FB_STORAGE_BUCKET,
	// messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
	// appId: process.env.FB_APP_ID,
	// measurementId: process.env.FB_MEASUREMENT_ID,

	apiKey: 'AIzaSyDb8CAkhH8iTzdpWILBS_eodShqgxIlqnM',
	authDomain: 'todo-ce658.firebaseapp.com',
	projectId: 'todo-ce658',
	storageBucket: 'todo-ce658.appspot.com',
	messagingSenderId: '179168153788',
	appId: '1:179168153788:web:1ecb5f95872104f8fac0b9',
	measurementId: 'G-JN67JMWD24',
	databaseURL: 'https://todo-ce658-default-rtdb.asia-southeast1.firebasedatabase.app',
};

const app = initializeApp(firebaseConfig);

const getDatabase = (): Database => {
	return _getDatabase(app);
};

export { getDatabase };
