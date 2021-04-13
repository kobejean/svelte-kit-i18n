<script>
	import { page, session } from '$app/stores';
	import '../app.scss';

	const translations = {
		en: {
			home: 'Home',
			about: 'About',
			events: 'Events'
		},
		ja: {
			home: 'ホーム',
			about: '情報',
			events: 'イベント'
		}
	};

	$: t = translations[$session.locale];
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

<a href="/en" lang="en">English</a>
<a href="/ja" lang="ja">日本語</a>

<br />

<a href="/{$session.locale}">{t.home}</a>
<a href="/{$session.locale}/about">{t.about}</a>
<a href="/{$session.locale}/events/event">{t.events}</a>
<slot />
