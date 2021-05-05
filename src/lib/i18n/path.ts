import { page } from '$app/stores';
import { base } from '$app/paths';
import { derived } from 'svelte/store';
import { locale } from 'svelte-intl-precompile';
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

export const localeBase = derived(locale, ($locale) =>
	SUPPORTED_LOCALE.has($locale) ? `${base}/${$locale}` : base
);

export const localeRelativePath = derived(page, ({ path }) => getPathWithoutLocale(path));
