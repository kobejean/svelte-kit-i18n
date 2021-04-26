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
	$: if ($locale !== $session.locale && $session.locale) locale.set($session.locale);
</script>

<a href="{base}/en{$page.path}" lang="en">{$_('locale.en')}</a>
<a href="{base}/ja{$page.path}" lang="ja">{$_('locale.ja')}</a>

<br />

<a href="{base}/{$locale}">{$_('home.title')}</a>
<a href="{base}/{$locale}/about">{$_('about.title')}</a>
<slot />
