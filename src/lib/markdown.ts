import type { Component } from 'svelte';

export interface MarkdownPostMetadata {
	title: string;
	description: string;
	created: string;
	updated?: string;
}

export interface MarkdownPost {
	default: Component;
	metadata: MarkdownPostMetadata;
	path: string;
}

export type MarkdownPostModule = {
	default: Component;
	metadata: MarkdownPostMetadata;
};

const allFiles = {
	apps: import.meta.glob<MarkdownPostModule>(`/src/routes/*/apps/*/**/*.md`),
	usage: import.meta.glob<MarkdownPostModule>(`/src/routes/*/usage/*/**/*.md`)
};

type KeyOfAllFiles = keyof typeof allFiles;

/**
 * Fetch all markdown posts
 * @returns All markdown posts
 */
export const fetchMarkdownContents = async (section: KeyOfAllFiles): Promise<MarkdownPost[]> => {
	const modules = allFiles[section];
	const allPosts = await Promise.all(
		Object.entries(modules).map(async ([p, resolver]) => {
			const post = await resolver();
			const slug = p.split('/').pop()?.replace(/\.md$/, '') ?? '';
			const path = `${section}/${slug}`;
			const metadata = post.metadata;

			return {
				default: post.default,
				metadata,
				path
			};
		})
	);

	return allPosts;
};

/**
 * Load a markdown post
 * @param moduleKey - The module key of the post
 * @returns The post
 */
export const loadMarkdownContent = async (
	section: KeyOfAllFiles,
	path: string
): Promise<MarkdownPost> => {
	const moduleKey = `/src/routes/(${section})/${section}/[route]/${path}.md`;
	const module = allFiles[section][moduleKey];
	if (!module) {
		console.error(`Module not found for key: ${moduleKey}`);
		console.log(allFiles[section]);
		throw new Error('Module not found');
	}
	const post = await module();
	if (!post.metadata) {
		throw new Error('Metadata is required');
	}
	return {
		default: post.default,
		metadata: post.metadata,
		path
	};
};

/**
 * Get the unix time from a date object
 * @param date - The date object
 * @returns The unix time
 */
export const convertDateToUnixTime = (date: Date): number => {
	return Math.floor(date.getTime() / 1000);
};
