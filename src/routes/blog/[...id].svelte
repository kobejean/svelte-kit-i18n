<script context="module">
	import { getPost } from './_posts';

	export async function load({ page: { params } }) {
		const post = await getPost(params.id, params.locale);
		if (post) return { props: { post } };
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
