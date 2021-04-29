export const FALLBACK_LOCALE = 'ja';

export const LOCALE_IMPORTS = {
	en: () => import(`$lib/i18n/locale/en.json`),
	ja: () => import(`$lib/i18n/locale/ja.json`)
};

export const SUPPORTED_LOCALE = new Set(Object.keys(LOCALE_IMPORTS));

export const LOCALE_PATHNAME_REGEX = /^\/(.*?)([/]|$)/;

export const DOCUMENT_REGEX = /(^([^.?#@]+)?([?#](.+)?)?|service-worker.*?\.html)$/;
