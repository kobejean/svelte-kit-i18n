<script>
	import { t } from 'svelte-intl-precompile';
	import { localeRelativePath, localeBase } from '$lib/i18n/path';

	$: navTabs = [
		{
			title: $t('home.nav.title'),
			path: '/',
			regex: /^\/?$/
		},
		{
			title: $t('about.nav.title'),
			path: '/about',
			regex: /^\/about\/?/,
			prefetch: true
		},
		{
			title: $t('blog.nav.title'),
			path: '/blog',
			regex: /^\/blog\/?/,
			prefetch: true
		}
	];
</script>

<ul>
	{#each navTabs as tab (tab.path)}
		<li>
			<a
				class="btn"
				sveltekit:prefetch={tab.prefetch || undefined}
				aria-current={tab.regex.test($localeRelativePath) ? 'page' : undefined}
				href="{$localeBase}{tab.path}"
			>
				{tab.title}
			</a>
		</li>
	{/each}
</ul>

<style lang="scss">
	@import './styles/navigation-items.scss';
</style>
