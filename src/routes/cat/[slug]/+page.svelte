<script lang="ts">
	import { beforeNavigate, onNavigate } from '$app/navigation';
	import { formatCssPropertyValue, setTransitionToLeft } from '$lib';
	import { onMount } from 'svelte';

	const { data } = $props();

	onMount(() => {
		setTransitionToLeft();
	});

	// beforeNavigate((navigation) => {
	// 	// Get the element closes to the center of the viewport.
	// 	const centeredElement = document.elementFromPoint(
	// 		window.innerWidth / 2,
	// 		window.innerHeight / 2
	// 	);

	// 	const closestImage = centeredElement?.closest('img');

	//     // Set the closest image as the transition element.
	//     if (closestImage) {
	// 		closestImage.style.viewTransitionClass = "cat-image";
	//         closestImage.style.viewTransitionName = `cat-image-${formatCssPropertyValue(data.category)}`;
	//     }

	// 	console.log(closestImage);
	// });
</script>

<div>
	<h2
		class="z-50 mb-[18px] text-xl text-[var(--text-color-main)]"
		style="width: fit-content; view-transition-class: cat-title; view-transition-name: cat-title-{formatCssPropertyValue(
			data.category.name
		)}"
	>
		{data.category.name}
	</h2>
	<div class="flex flex-col gap-14">
		{#each data.category.items as item, i}
			<div>
				<img
					style={i === 0
						? `view-transition-class: cat-image; view-transition-name: cat-image-${formatCssPropertyValue(data.category.name)}`
						: ''}
					src="/images/{data.category.folder}/{item.image}"
					alt=""
					class="z-40 mb-2.5 inline-block h-[327px] w-full rounded-[26px] object-cover object-center"
				/>
				<div class="flex items-center justify-between">
					<h3 class="mb-1.5 font-semibold text-[var(--text-color-main)]">{item.name}</h3>
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
