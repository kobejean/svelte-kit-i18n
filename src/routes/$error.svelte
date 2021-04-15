<script>
	export let status;
	export let error;
</script>

<h1>{status || 404}</h1>

<p>{(error && error.message) || 'Page not found.'}</p>

<!-- TODO figure out what to do with stacktraces in prod -->
{#if error && error.stack}
	<pre>{error.stack}</pre>
{/if}
