<script context="module">
	import { preloadLocale } from '$lib/utils/i18n/preload';

	export async function load({ session }) {
		try {
			await preloadLocale(session.locale);
			return {};
		} catch (error) {
			return { status: 500, error };
		}
	}
</script>

<script>
	import { locale, _ } from 'svelte-i18n';
	import { page, session } from '$app/stores';
	import '../app.css';

	$: if ($locale !== $session.locale && $session.locale) locale.set($session.locale);
</script>

<code>
	Session: {JSON.stringify($session)}
	Page: {''}
	- Host: {$page.host}
	- Path: {$page.path}
	- Query: {JSON.stringify($page.query)}
	- Params: {JSON.stringify($page.params)}
</code>

<br />
<br />

<a href="/en{$page.path}" lang="en">{$_('locale.en')}</a>
<a href="/ja{$page.path}" lang="ja">{$_('locale.ja')}</a>

<br />

<a href="/{$locale}">{$_('home.title')}</a>
<a href="/{$locale}/about">{$_('about.title')}</a>
<a href="/{$locale}/events/event">{$_('events.title')}</a>
<slot />
