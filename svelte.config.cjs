const preprocess = require('svelte-preprocess');
const precompileIntl = require('svelte-intl-precompile/sveltekit-plugin');

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		vite: {
			plugins: [precompileIntl('src/lib/i18n/locale')]
		},

		alternateRoutes: (segments) => {
			// const locales = ['ja', 'en'];
			return [
				segments,
				[[{ content: 'locale', dynamic: true, spread: false }], ...segments]
				// ...locales.map((locale) => [
				// 	[{ content: locale, dynamic: false, spread: false }],
				// 	...segments
				// ])
			];
		}
	}
};
