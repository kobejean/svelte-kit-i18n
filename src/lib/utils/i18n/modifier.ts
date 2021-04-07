import { DOCUMENT_REGEX, LOCALE_PATHNAME_REGEX, SUPPORTED_LOCALE } from '$lib/utils/i18n/constants';

export const addLocaleToResponseBody = (request, response) => {
	if (DOCUMENT_REGEX.test(request.path) && response.body) {
		response.body = response.body.replace('%svelte.i18.locale%', request.context.locale);
	}
};

export const addLocaleRelativeRoutePath = (request) => {
	const firstSegment = request.path.match(LOCALE_PATHNAME_REGEX)[1];
	if (SUPPORTED_LOCALE.has(firstSegment)) {
		request.path = request.path.replace(LOCALE_PATHNAME_REGEX, '/');
	}
};
