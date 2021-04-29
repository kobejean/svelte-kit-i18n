<script context="module">
	import { getPost } from './_posts';

	export async function load({ page }) {
		const post = await getPost(page.params.id, page.params.locale);
		if (post) {
			return { props: { post } };
		}
	}
</script>

<script>
	export let post;
</script>

<header>
	<h1>{post.title}</h1>
	<div>by {post.author}</div>
</header>
<svelte:component this={post.component} />
