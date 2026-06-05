import { error } from '@sveltejs/kit';
import { fetchMarkdownContents, loadMarkdownContent } from '$lib/markdown';
import type { Load } from '@sveltejs/kit';

export const entries = async () => {
	return (await fetchMarkdownContents('apps')).map((post) => ({
		route: post.path.replace(/^apps\//, '')
	}));
};

export const load: Load = async ({ params }) => {
	const slug = params.route?.replace(/[^a-zA-Z0-9\-_.]/g, '');
	if (!slug) {
		error(404, 'Not found');
	}
	try {
		const post = await loadMarkdownContent('apps', slug);
		const metadata = post.metadata;
		return {
			metadata,
			component: post.default
		};
	} catch (e) {
		const ex = e as Error;
		console.log('error', ex.toString());
	}
	error(404, 'Not found');
};
