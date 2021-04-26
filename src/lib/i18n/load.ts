import { get } from 'svelte/store';
import { browser } from '$app/env';
import { locale as localeStore, init, register, waitLocale } from 'svelte-intl-precompile';
import { SUPPORTED_LOCALE, LOCALE_IMPORTS, FALLBACK_LOCAL } from '$lib/i18n/constants';

// register locale lifes
Object.entries(LOCALE_IMPORTS).forEach(([locale, fn]) => register(locale, fn));

/**
 * Preloads all language data on server-side.
 */
let hasPreloaded = false;
const preloadAllLanguageData = () => {
	if (hasPreloaded) return;

	if (!browser) {
		// server side preloading
		SUPPORTED_LOCALE.forEach((locale) => localeStore.set(locale));
		hasPreloaded = true;
	}
};

/**
 * Handles locale initialization and preloading locale data.
 * To be used in sapper `preload` function.
 *
 * @param {object} preloadMethods - In the `preload` function just pass in `this` so that this function has access to sending errors, etc.
 * @param {object} page - The `preload` function `page` parameter.
 * @param {object} session - The `preload` function `session` parameter.
 */
export const loadLocale = async (locale) => {
	const currentLocale = get(localeStore);

	preloadAllLanguageData();

	if (!SUPPORTED_LOCALE.has(locale)) {
		throw new Error(`Language "${locale}" could not be found`);
	}

	if (!currentLocale) {
		// if locale is currently null we probably missed initialization
		init({ fallbackLocale: FALLBACK_LOCAL, initialLocale: locale });
	}

	await waitLocale();
};
