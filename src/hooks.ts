import { getInitialLocale } from '$lib/i18n/initialization';
import { addLocaleToResponseBody, addLocaleRelativeRoutePath } from '$lib/i18n/modifier';

/** @type {import('@sveltejs/kit').GetContext} */
export async function getContext(request) {
	return {
		locale: getInitialLocale(request)
	};
}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession({ context }) {
	return {
		locale: context.locale
	};
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ request, render }) {
	addLocaleRelativeRoutePath(request);
	const response = await render(request);
	addLocaleToResponseBody(request, response);
	return response;
}
