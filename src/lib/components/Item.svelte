<script lang="ts">
	import type { DataType } from '$lib/schemas/data';
	import { onMount } from 'svelte';

	interface Props {
		imageFolder: string;
		item: DataType['categories'][number]['items'][number];
		index: number;
	}

	let { item, imageFolder, index }: Props = $props();

	import { scrollY } from 'svelte/reactivity/window';

	let ref: HTMLImageElement | undefined = $state();

	const boundingRect = $derived(
		ref?.getBoundingClientRect() ?? {
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			width: 0,
			height: 0,
			x: 0,
			y: 0
		}
	);

	const foo = $derived(boundingRect.top + boundingRect.height);
</script>

<div>
	<img
		bind:this={ref}
		style={index === 0
			? `view-transition-class: cat-image; view-transition-name: vt-cat-image`
			: ''}
		data-arr-index={index}
		src="/images/{imageFolder}/{item.image}"
		alt=""
		class="z-40 mb-2.5 inline-block h-[327px] w-full rounded-[26px] object-cover object-center"
	/>
	<div class="flex items-center justify-between">
		<h3 class="mb-1.5 font-semibold text-[var(--text-color-main)]">
			{item.name}
			{foo}
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
