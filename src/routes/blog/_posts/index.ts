import { FALLBACK_LOCALE } from '$lib/i18n/constants';
import { map, mapValues, groupBy, keys, keyBy, filter, isNil, pick, get } from 'lodash-es';

const IMPORT_PATH_REGEX = /^\.\/(\d{4})-(\d{2})-(\d{2})-(.+)\/([a-z]{2}-?[A-Z]{0,2})\.svelte$/;

let posts = mapValues(import.meta.glob('./*/*.svelte'), (importer, importPath) => {
	if (!IMPORT_PATH_REGEX.test(importPath)) return null;

	const [, year, month, day, slug, locale] = importPath.match(IMPORT_PATH_REGEX);
	return {
		importer,
		id: `${year}/${month}/${day}/${slug}`,
		date: `${year}-${month}-${day}`,
		path: `/${locale}/blog/${year}/${month}/${day}/${slug}`,
		locale
	};
});

// remove posts that do not match regex
posts = filter(posts, (post) => !isNil(post));
// group files
posts = groupBy(posts, 'id');
// final data mapping
posts = mapValues(posts, (translations) => {
	// key translations by locale
	translations = keyBy(translations, 'locale');
	// retrieve post data
	const { id, date } = translations[FALLBACK_LOCALE];
	// just keep data we need for translations
	translations = mapValues(translations, (translation) =>
		pick(translation, ['locale', 'importer', 'path'])
	);
	return {
		id,
		date,
		translations
	};
});

export async function getPost(id, locale) {
	const meta = get(posts, [id]);
	const date = get(meta, ['date']);
	const translation = get(meta, ['translations', locale], {});
	if (translation.importer) {
		const post = await translation.importer();
		return {
			component: post.default,
			title: post.title,
			date,
			author: post.author,
			path: translation.path,
			locale: translation.locale
		};
	}
}

const HTML_TO_TEXT_REGEX = /<[^>]*>/g;
export async function getPosts(locale) {
	const resolved = await Promise.all(map(keys(posts), async (id) => getPost(id, locale)));
	const filtered = filter(resolved, (post) => !isNil(post));
	return map(filtered, ({ component, ...post }) => {
		const { html } = component.render();
		const summary = html.replace(HTML_TO_TEXT_REGEX, '');
		return { ...post, summary };
	});
}
export default posts;
