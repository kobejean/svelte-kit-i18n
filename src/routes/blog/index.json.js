import { SUPPORTED_LOCALE } from '$lib/i18n/constants';
import { getPosts } from './_posts';

// const cache = new Map();
// SUPPORTED_LOCALE.forEach(async (locale) => cache.set(locale, await getPosts(locale)));

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params }) {
	const { locale } = params;

	const posts = await getPosts(locale);

	if (posts) {
		return {
			body: {
				posts
			}
		};
	}
}
