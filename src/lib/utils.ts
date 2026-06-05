export const smoothScrollToAnchor = (evt: Event) => {
	evt.preventDefault();
	const link = evt.currentTarget as HTMLAnchorElement;
	const anchorId = new URL(link.href).hash.replace('#', '');
	const anchor = document.getElementById(anchorId);
	window.scrollTo({
		top: anchor?.offsetTop,
		behavior: 'smooth'
	});
};
