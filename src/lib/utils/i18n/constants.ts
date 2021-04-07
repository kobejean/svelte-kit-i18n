export const FALLBACK_LOCAL = 'ja';

export const LOCALE_IMPORTS = {
	en: () => import(`$lib/locale/en.json`),
	ja: () => import(`$lib/locale/ja.json`)
};

export const SUPPORTED_LOCALE = new Set(Object.keys(LOCALE_IMPORTS));

export const LOCALE_PATHNAME_REGEX = /^\/(.*?)([/]|$)/;

export const DOCUMENT_REGEX = /(^([^.?#@]+)?([?#](.+)?)?|service-worker.*?\.html)$/;
