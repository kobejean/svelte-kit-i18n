<script>
	import { t, locales, locale } from 'svelte-intl-precompile';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { translatePath } from '$lib/i18n/path';
</script>

<ul>
	{#each $locales as _locale (_locale)}
		<li>
			<a
				class="btn"
				aria-current={_locale === $locale ? 'page' : undefined}
				href="{base}/{translatePath($page.path, _locale)}"
				sveltekit:noscroll
				lang={_locale}
			>
				{$t(`locale.${_locale}`)}
			</a>
		</li>
	{/each}
</ul>

<!-- <nav>
	{#each [...SUPPORTED_LOCALE] as locale}
		<a href="{base}/{translatePath($page.path, locale)}" lang={locale}>{$t(`locale.${locale}`)}</a>
	{/each}
</nav> -->
<style lang="scss">
	@import './styles/navigation-items.scss';
</style>
