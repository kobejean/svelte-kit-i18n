<script>
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { translatePath } from '$lib/i18n/path';
	import { FALLBACK_LOCALE, SUPPORTED_LOCALE } from '$lib/i18n/constants';
</script>

<link
	rel="alternate"
	hreflang="x-default"
	href="{base}/{translatePath($page.path, FALLBACK_LOCALE)}"
/>
{#each [...SUPPORTED_LOCALE] as locale}
	<link rel="alternate" hreflang={locale} href="{base}/{translatePath($page.path, locale)}" />
{/each}
