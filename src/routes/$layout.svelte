<script context="module">
	import { loadLocale } from '$lib/i18n/load';
	export async function load({ session }) {
		try {
			await loadLocale(session.locale);
			return {};
		} catch (error) {
			return { status: 500, error: 'Error Occurred' };
		}
	}
</script>

<script>
	import { locale, _ } from 'svelte-intl-precompile';
	import { page, session } from '$app/stores';
	import { syncLocale } from '$lib/i18n/sync';
	import LanguageAlternateLinks from '$lib/components/LanguageAlternateLinks.svelte';
	import NavigationBar from '$lib/components/NavigationBar/index.svelte';

	$: syncLocale(locale, $page, $session);
</script>

<svelte:head>
	<LanguageAlternateLinks />
</svelte:head>

<!-- {JSON.stringify($page, null, 2)} -->

<NavigationBar />
<slot />
