<script>
	import NavigationItems from './NavigationItems.svelte';
	import LanguagePicker from './LanguagePicker.svelte';
</script>

<nav>
	<NavigationItems />
	<LanguagePicker />
</nav>

<style lang="scss">
	@import '../../styles/colors.scss';

	nav {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid rgba($primary, 0.1);
		font-weight: 300;
		padding: 0 1em;
	}
</style>
