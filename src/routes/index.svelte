<script context="module">
	import { SUPPORTED_LOCALE } from '$lib/i18n/constants';

	// export const router = false;

	export async function load({ page }) {
		if (!page.params.locale || SUPPORTED_LOCALE.has(page.params.locale)) {
			return {};
		}
	}
</script>

<script>
	import { t } from 'svelte-intl-precompile';
</script>

<svelte:head>
	<title>{$t('home.title')}</title>
</svelte:head>

<h1>{$t('home.heading')}</h1>
<p>{@html $t('home.instructions')}</p>
