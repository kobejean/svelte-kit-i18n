<script>
	import { t } from 'svelte-intl-precompile';
</script>

<svelte:head>
	<title>{$t('home.title')}</title>
</svelte:head>

<h1>{$t('home.heading')}</h1>
<p>{@html $t('home.instructions')}</p>
