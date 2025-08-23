<script lang="ts">
	import { setVT_HomeToOther } from '$lib';
	import Category from '$lib/components/Category.svelte';

	const { data } = $props();

	setVT_HomeToOther();
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
