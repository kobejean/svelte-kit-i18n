<script context="module">
	import { loadLocale } from '$lib/i18n/load';
	export async function load({ session }) {
		try {
			await loadLocale(session.locale);
			return {};
		} catch (error) {
			return { status: 500, error };
		}
	}
</script>

<script>
	import { locale, _ } from 'svelte-intl-precompile';
	import { page, session } from '$app/stores';
	import { base } from '$app/paths';
	import { translatePath } from '$lib/i18n/path';
	import { SUPPORTED_LOCALE } from '$lib/i18n/constants';

	$: if ($locale !== $session.locale && $session.locale) locale.set($session.locale);

	const locales = [...SUPPORTED_LOCALE];
</script>

{#each locales as locale}
	<a href="{base}/{translatePath($page.path, locale)}" lang={locale} rel="external"
		>{$_(`locale.${locale}`)}</a
	>
{/each}

<br />

<a href="{base}/{$locale}">{$_('home.title')}</a>
<a href="{base}/{$locale}/about">{$_('about.title')}</a>
<slot />
