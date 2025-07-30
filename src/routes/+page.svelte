<script lang="ts">
	import { setTransitionToRight, setTransitionToLeft } from '$lib';
	import Category from '$lib/components/Category.svelte';
	import { onMount } from 'svelte';

	const { data } = $props();

	onMount(() => {
		setTransitionToLeft();
	});
</script>

<div class="flex flex-col gap-4">
	{#each data.categories as category}
		{@const bannerImage = category.items[0]?.image || ''}
		<Category
			title={category.name}
			href={category.folder}
			bgImg="/images/{category.folder}/{bannerImage}"
		/>
	{/each}
</div>
