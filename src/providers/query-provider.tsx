import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useEffect } from 'react';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			cacheTime: Infinity,
			retry: false,
		},
		mutations: {
			cacheTime: Infinity,
			retry: false,
		},
	},
});

const QueryProvider = ({ children }) => {
	useEffect(() => {
		window.$queryClient = queryClient;
	}, []);

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export { QueryProvider };

declare global {
	interface Window {
		/** App query client instance, available after app mounted.
		 * ONLY USE THIS WHEN HOOKS IS INACCESSIBLE.
		 * */
		$queryClient: QueryClient;
	}
}
