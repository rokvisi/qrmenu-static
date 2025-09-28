<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { getElementClosestToViewportTop, vt_set_other_to_home } from '$lib';
	import { onMount } from 'svelte';
	import Plus from '@lucide/svelte/icons/plus';

	const { data } = $props();

	vt_set_other_to_home();
	onMount(() => {
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

		// Darken the image (because the same image in '/' is darkened)
		closest_img_el.style.filter = 'brightness(90%)';
	});
</script>

<div>
	<!-- Category Name -->
	<h2
		class="mb-[18px] text-xl text-primary"
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
					<h3 class="mb-1.5 font-semibold text-primary">
						{item.name}
					</h3>
					<span class="text-sm text-muted-extra">{item.weight} g</span>
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
						class="flex size-9 cursor-pointer items-center justify-center rounded-full bg-accent text-[32px] text-white shadow-xl"
						><Plus strokeWidth={2.5} /></button
					>
				</div>
			</div>
		{/each}
	</div>
</div>
