<script context="module">
	// import { preloadLocale } from '$lib/utils/i18n/preload';
	// import { waitLocale } from 'svelte-i18n';
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
		// await preloadLocale(fetch, page, session);
		// await waitLocale();
		return {
			props: {
				locale: session.locale
			}
		};
	}
</script>

<script>
	import '../app.scss';

	export let locale;
</script>

{locale}

<slot />
