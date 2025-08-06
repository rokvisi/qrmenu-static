<script lang="ts">
	import uFuzzy from '@leeoniya/ufuzzy';

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
	/>

	<div class="flex flex-col gap-14">
		{#if order}
			{#each order as ord, i}
				{@const infoIdx = ord}
				{@const item = items[info.idx[infoIdx]]}
				<div class="relative">
					<!-- Item Image -->
					<img
						data-arr-index={i}
						style={i === 0
							? `view-transition-class: cat-image; view-transition-name: vt-cat-image`
							: ''}
						src="/images/{item.folder}/{item.image}"
						alt=""
						class="test z-40 mb-2.5 inline-block aspect-[1.61/1] w-full rounded-[26px] object-cover object-center"
					/>

					<!-- Item Info -->
					<div class="flex items-center justify-between">
						<h3 class="mb-1.5 font-semibold text-[var(--text-color-main)]">
							{item.name}
						</h3>
						<span class="text-sm text-[var(--text-color-muted)]">{item.weight} g</span>
					</div>

					<div class="mb-1.5">
						<p class="mb-2.5 text-sm text-[var(--text-color)]">{item.description}</p>
						{#if item.isVegan}
							<p class="text-sm text-[var(--text-color)]">🌱 Vegan</p>
						{/if}
					</div>

					<div class="flex items-center justify-between">
						<p class="flex gap-0.5 text-2xl font-medium text-[var(--text-color-accent)]">
							{item.price} <span class="align-top text-[16px] font-normal">$</span>
						</p>
						<button
							class="flex size-[38px] cursor-pointer items-center justify-center rounded-full bg-[var(--text-color-accent)] text-[32px] text-white shadow-xl"
							>+</button
						>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>
