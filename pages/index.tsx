import { NextPage } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';

import { App } from '~/app/todo';

const HomePage: NextPage = () => {
	return (
		<Fragment>
			<Head>
				<title>TodoWee</title>
				<meta name="description" content="TodoWee - Just another todo list app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<App />
		</Fragment>
	);
};

export default HomePage;
