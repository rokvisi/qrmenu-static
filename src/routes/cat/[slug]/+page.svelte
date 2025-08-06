<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { getElementClosestToViewportTop, setTransitionToRight } from '$lib';
	import { onMount } from 'svelte';
	import OrderDrawer from '$lib/components/OrderDrawer.svelte';

	const { data } = $props();

	onMount(() => {
		setTransitionToRight();

		// Set the object-fit property for the image transition.
		document.documentElement.style.setProperty('--obj-fit', 'cover');
	});

	beforeNavigate((navigation) => {
		// Remove the view-transition from the first image element.
		const first_img_el = document.querySelector<HTMLImageElement>('img[data-arr-index="0"]')!;
		first_img_el.style.viewTransitionClass = '';
		first_img_el.style.viewTransitionName = '';

		// If the user is not going home, don't attach any new view transitions.
		if (navigation.to?.url.pathname !== '/') return;

		// Add the view-transition to the image closest to the top of the viewport.
		const closest_img_el = getElementClosestToViewportTop<HTMLImageElement>('img[data-arr-index]')!;
		closest_img_el.style.viewTransitionClass = 'cat-image';
		closest_img_el.style.viewTransitionName = `vt-cat-image`;

		// Darken the image (because the image in '/' is darkened)
		closest_img_el.style.filter = 'brightness(90%)';
	});
</script>

<div>
	<!-- Category Name -->
	<h2
		class="mb-[18px] text-xl text-[var(--text-color-main)]"
		style="width: fit-content; view-transition-class: cat-title; view-transition-name: vt-cat-title"
	>
		{data.category.name}
	</h2>

	<!-- <OrderDrawer /> -->

	<!-- Category Items -->
	<div class="flex flex-col gap-14">
		{#each data.category.items as item, i}
			<div class="relative">
				<!-- Item Image -->
				<img
					data-arr-index={i}
					style={i === 0
						? `view-transition-class: cat-image; view-transition-name: vt-cat-image`
						: ''}
					src="/images/{data.category.folder}/{item.image}"
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
	</div>
</div>
