<script>
	import { _ } from 'svelte-intl-precompile';
</script>

<svelte:head>
	<title>{$_('home.title')}</title>
</svelte:head>

<h1>{$_('home.heading')}</h1>
<p>{@html $_('home.instructions')}</p>
