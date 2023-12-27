import Head from 'next/head';
import { FC } from 'react';

const Seo: FC<{ title: string; description: string }> = ({ title, description }) => {
	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
	);
};

export { Seo };
