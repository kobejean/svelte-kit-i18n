import { SUPPORTED_LOCALE } from './constants';

const getPathWithoutLocale = (path) => {
	if (!path || path === '/') return '';
	const parts = path.split('/').splice(1);
	const first = parts.shift();
	if (SUPPORTED_LOCALE.has(first)) {
		const joined = parts.join('/');
		return joined ? `/${joined}` : joined;
	}
	return path;
};

export const translatePath = (path, locale) => {
	return `${locale}${getPathWithoutLocale(path)}`;
};
