import { error } from '@sveltejs/kit';
import { fetchMarkdownContents, loadMarkdownContent } from '$lib/markdown';
import type { Load } from '@sveltejs/kit';

export const entries = async () => {
	return (await fetchMarkdownContents('usage')).map((post) => ({
		route: post.path.replace(/^usage\//, '')
	}));
};

export const load: Load = async ({ params }) => {
	const slug = params.route?.replace(/[^a-z0-9-_]/gi, '');
	if (!slug) {
		error(404, 'Not found');
	}
	try {
		const post = await loadMarkdownContent('usage', slug);
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
