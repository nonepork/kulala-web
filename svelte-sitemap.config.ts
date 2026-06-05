import type { OptionsSvelteSitemap } from 'svelte-sitemap';

const config: OptionsSvelteSitemap = {
	domain: 'https://kulala.app',
	trailingSlashes: false,
	ignore: ['/404.html', '/500.html', '/google*.html']
};

export default config;
