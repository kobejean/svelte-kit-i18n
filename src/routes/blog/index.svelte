<script context="module">
	export async function load({ page, fetch }) {
		const res = await fetch(`/${page.params.locale}/blog.json`);
		if (res.ok) {
			const { posts } = await res.json();
			return { props: { posts } };
		}
	}
</script>

<script>
	import { t } from 'svelte-intl-precompile';

	export let posts;
</script>

<svelte:head>
	<title>{$t('blog.title')}</title>
</svelte:head>

<h1>{$t('blog.heading')}</h1>

{#each posts as post}
	<article>
		<header>
			<h2>
				<a sveltekit:prefetch href={post.path}>
					{post.title}
				</a>
			</h2>
			<div>{post.author}</div>
			<time datetime={post.date}>{post.date}</time>
		</header>
		<p>
			{post.summary}
		</p>
	</article>
{/each}
