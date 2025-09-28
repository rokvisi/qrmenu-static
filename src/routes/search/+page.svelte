<script lang="ts">
	import { vt_set_other_to_home } from '$lib';
	import uFuzzy from '@leeoniya/ufuzzy';

	vt_set_other_to_home();

	const { data } = $props();
	const items = $derived(
		data.categories.flatMap((category) =>
			category.items.map((i) => ({ ...i, folder: category.folder }))
		)
	);
	const itemsFlatNames = $derived(items.flatMap((item) => item.name));

	let query = $state('');
	const uf = new uFuzzy({ intraMode: 1 });

	const [idxs, info, order] = $derived(uf.search(itemsFlatNames, query));
</script>

<div>
	<input
		type="text"
		bind:value={query}
		placeholder="Search"
		class="w-full rounded-3xl bg-[#f3f3f3] px-3.5 py-2.5 text-sm"
		{@attach (element) => {
			element.focus();
		}}
	/>

	<div class="mt-8 flex flex-col gap-14">
		{#if order}
			{@const hasResults = order.length > 0}

			{#if hasResults}
				<!-- Filtered items -->
				{#each order as ord, i}
					{@const infoIdx = ord}
					{@const item = items[info.idx[infoIdx]]}
					{@render ItemView(item, i)}
				{/each}
			{:else if query.trim() !== ''}
				<!-- Query not empty - No results found fallback -->
				<div class="flex flex-col gap-1 text-base">
					<p class="text-center text-muted">No results found</p>
					<p class="text-center text-muted">
						Back to <a href="/" class="text-accent">Catalog</a>?
					</p>
				</div>
			{/if}
		{:else}
			<!-- Query empty (order null) - Fallback to un-filtered items -->
			{#each items as item, i}
				{@render ItemView(item, i)}
			{/each}
		{/if}
	</div>
</div>

{#snippet ItemView(item: (typeof items)[0], itemIdx: number)}
	<div class="relative">
		<!-- Item Image -->
		<img
			data-arr-index={itemIdx}
			style={itemIdx === 0 ? `` : ''}
			src="/images/{item.folder}/{item.image}"
			alt=""
			class="test z-40 mb-2.5 inline-block aspect-[1.61/1] w-full rounded-[26px] object-cover object-center"
		/>

		<!-- Item Info -->
		<div class="flex items-center justify-between">
			<h3 class="mb-1.5 font-semibold text-primary">
				{item.name}
			</h3>
			<span class="text-sm text-muted-foreground">{item.weight} g</span>
		</div>

		<div class="mb-1.5">
			<p class="mb-2.5 text-sm text-muted">{item.description}</p>
			{#if item.isVegan}
				<p class="text-sm text-muted">🌱 Vegan</p>
			{/if}
		</div>

		<div class="flex items-center justify-between">
			<p class="flex gap-0.5 text-2xl font-medium text-accent">
				{item.price} <span class="align-top text-[16px] font-normal">$</span>
			</p>
			<button
				class="flex size-[38px] cursor-pointer items-center justify-center rounded-full bg-accent text-[32px] text-white shadow-xl"
				>+</button
			>
		</div>
	</div>
{/snippet}
