<script context="module">
	export const prerender = true;
</script>

<script>
	import { _ } from 'svelte-intl-precompile';
</script>

<svelte:head>
	<title>{$_('about.title')}</title>
</svelte:head>

<h1>{$_('about.heading')}</h1>
<p>{@html $_('about.description')}</p>
