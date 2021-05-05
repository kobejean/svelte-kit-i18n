import { FALLBACK_LOCALE } from '$lib/i18n/constants';
import {
	map,
	mapValues,
	groupBy,
	omit,
	keys,
	keyBy,
	filter,
	isNil,
	get,
	truncate
} from 'lodash-es';

const IMPORT_PATH_REGEX = /^\.\/(\d{4})-(\d{2})-(\d{2})-(.+)\/([a-z]{2}(?:-[A-Z]{2})?)\.svelte$/;
function getPostTranslations() {
	// extract meta data from import path
	let posts = mapValues(import.meta.glob('./*/*.svelte'), (importer, importPath) => {
		if (!IMPORT_PATH_REGEX.test(importPath)) return null;

		const [, year, month, day, slug, locale] = importPath.match(IMPORT_PATH_REGEX);
		return {
			importer,
			id: `${year}/${month}/${day}/${slug}`,
			date: `${year}-${month}-${day}`,
			locale
		};
	});
	// filter out files that don't match regex
	posts = filter(posts, (post) => !isNil(post));
	// group files by post id so that translations of the same post are grouped together
	posts = groupBy(posts, 'id');
	// final data mapping
	posts = mapValues(posts, (translations) => {
		// key translations by locale
		translations = keyBy(translations, 'locale');
		// retrieve post data
		const { id, date } = translations[FALLBACK_LOCALE];
		// just keep data we need for translations
		translations = mapValues(translations, (translation) => omit(translation, ['id', 'date']));
		return {
			id,
			date,
			translations
		};
	});
	return posts;
}

export const POST_TRANSLATIONS = getPostTranslations();

const HTML_TO_TEXT_REGEX = /<[^>]*>/g;
function getSummary(html) {
	const summary = html.replace(HTML_TO_TEXT_REGEX, '');
	return truncate(summary, { length: 150 });
}

export async function getPost(id, locale) {
	const meta = get(POST_TRANSLATIONS, [id]);
	const translation = get(meta, ['translations', locale], {});
	if (translation.importer) {
		const imported = await translation.importer();
		const component = imported.default;
		const importedMeta = omit(imported, ['default']);
		return {
			component,
			...omit(meta, ['translations']),
			...omit(translation, ['importer']),
			...importedMeta
		};
	}
}

export async function getPosts(locale) {
	let posts = await Promise.all(map(keys(POST_TRANSLATIONS), async (id) => getPost(id, locale)));
	posts = filter(posts, (post) => !isNil(post));
	posts = map(posts, ({ component, ...post }) => {
		const { html } = component.render();
		const summary = getSummary(html);
		return { ...post, summary };
	});
	return posts;
}
