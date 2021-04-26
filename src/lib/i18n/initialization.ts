import { browser } from '$app/env';
import { FALLBACK_LOCAL, SUPPORTED_LOCALE, LOCALE_PATHNAME_REGEX } from '$lib/i18n/constants';

/**
 * Gets pathname from location.pathname if code is client-side.
 *
 * @return {string} Returns the user language
 */
const getClientPathname = () => browser && location.pathname;

/**
 * Gets pathname from the request url.
 *
 * @param {Request=} req - The request to retrieve user language from
 * @return {string} Returns the user language
 */
const getServerPathname = (req) => req && req.path;

/**
 * Gets pathname,
 * For server-side code, provide the `req` and user language will be retrieved from the request url.
 * For client side code do not pass a `req` parameter and user language will be retrieved from `location.pathname`.
 *
 * @param {Request=} req - The request to retrieve user language from (for server-side)
 * @return {string} Returns the user language
 */
const getPathname = (req) => getClientPathname() || getServerPathname(req);

/**
 * Gets user language from navigator.
 *
 * @return {string} Returns the user language
 */
const getClientUserLanguage = () => browser && (navigator.language || navigator['userLanguage']);

/**
 * Gets user language from the request `accept-language` header.
 *
 * @param {Request=} req - The request to retrieve user language from
 * @return {string} Returns the user language
 */
const getServerUserLanguage = (req) => req && req.headers['accept-language'];

/**
 * Gets user language,
 * For server-side code, provide the `req` and user language will be retrieved from the request url.
 * For client side code do not pass a `req` parameter and user language will be retrieved from `navigator`.
 *
 * @param {Request=} req - The request to retrieve user language from (for server-side)
 * @return {string} Returns the user language
 */
const getUserLanguage = (req) => getClientUserLanguage() || getServerUserLanguage(req);

/**
 * Gets the available locale from path.
 * For server-side code, provide the `req` and locale will be retrieved from the request url.
 * For client side code do not pass a `req` parameter and locale will be retrieved from `location.pathname`.
 *
 * @param {Request} req - The request to retrieve path locale from
 * @return {string} Returns the available matching locale.
 *
 * @example
 * // when path is '/ja/about'
 * getAvailableLocaleFromPathname(req) // 'ja'
 * // when path is '/en-US/blog'
 * getAvailableLocaleFromPathname(req) // 'en'
 * // when path is '/de/locations'
 * getAvailableLocaleFromPathname(req) // undefined
 */
const getAvailableLocaleFromPathname = (req) => {
	const pathname = getPathname(req);
	const match = LOCALE_PATHNAME_REGEX.exec(pathname);
	const matchedLocale = match && match[1];
	return SUPPORTED_LOCALE.has(matchedLocale) && matchedLocale;
};

/**
 * Gets the available locale from browser settings.
 * For server-side code, provide the `req` and locale will be retrieved from the request `accept-language` header.
 * For client side code do not pass a `req` parameter and locale will be retrieved from navigator.
 *
 * @param {Request=} req - The request to retrieve locale browser settings from (for server-side)
 * @return {string} Returns the available matching locale.
 *
 * @example
 * // when user language setting is 'ja'
 * getAvailableLocaleFromUserLanguage(req) // 'ja'
 * // when user language setting is 'en-US'
 * getAvailableLocaleFromUserLanguage(req) // 'en'
 * // when user language setting is 'de'
 * getAvailableLocaleFromUserLanguage(req) // undefined
 */
const getAvailableLocaleFromUserLanguage = (req) => {
	let lang = getUserLanguage(req);
	// just use prefix to keep simple
	lang = lang && lang.split('-')[0].toLocaleLowerCase();
	return SUPPORTED_LOCALE.has(lang) && lang;
};

/**
 * Gets initial local,
 * It tries to get the locale from the path first, then the user language settings, then defaults to fallback locale.
 *
 * @param {Request=} req - The request to retrieve locale from (for server-side)
 * @return {string} Returns the matching locale or fallback.
 */
export const getInitialLocale = (req) => {
	return (
		getAvailableLocaleFromPathname(req) || getAvailableLocaleFromUserLanguage(req) || FALLBACK_LOCAL
	);
};
