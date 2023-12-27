import Head from 'next/head';
import { FC } from 'react';

import { Input } from './input';
import { List } from './list';

const App: FC = () => {
	return (
		<>
			<Head>
				<title>TodoWee</title>
				<meta name="description" content="TodoWee - Just another todo list app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Input />
			<List />
		</>
	);
};

export { App };
