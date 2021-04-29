import { get } from 'svelte/store';
import { SUPPORTED_LOCALE } from './constants';

export const syncLocale = (locale, $page, $session) => {
	const $locale = get(locale);
	const recievedLocale = SUPPORTED_LOCALE.has($page.params.locale)
		? $page.params.locale
		: $session.locale;
	if ($locale !== recievedLocale && recievedLocale) {
		locale.set(recievedLocale);
	}
};
