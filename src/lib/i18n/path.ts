import { page } from '$app/stores';
import { base } from '$app/paths';
import { derived } from 'svelte/store';
import { SUPPORTED_LOCALE } from './constants';

export const getPathWithoutLocale = (path) => {
	if (!path || path === '/') return '';
	const segments = path.split('/').splice(1);
	const first = segments.shift();
	if (SUPPORTED_LOCALE.has(first)) {
		const joined = segments.join('/');
		return joined ? `/${joined}` : joined;
	}
	return path;
};

export const translatePath = (path, locale) => {
	return `${locale}${getPathWithoutLocale(path)}`;
};

export const localeBase = derived(page, ($page) =>
	SUPPORTED_LOCALE.has($page.params.locale) ? `${base}/${$page.params.locale}` : base
);

export const localeRelativePath = derived(page, ({ path }) => getPathWithoutLocale(path));
