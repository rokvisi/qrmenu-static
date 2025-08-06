<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { normalizeCssValue } from '$lib';
	import { onViewTransitionEnd } from '$lib/hooks/onViewTransitionEnd';
	import { onMount } from 'svelte';

	interface Props {
		title: string;
		href: string;
		bgImg: string;
	}
	let { title, href, bgImg }: Props = $props();

	let anchorEl: HTMLAnchorElement | null = $state(null);
	let headingEl: HTMLHeadingElement | null = $state(null);

	onMount(() => {
		// Set the object-fit property for the image transition.
		document.documentElement.style.setProperty('--obj-fit', 'contain');
	});

	afterNavigate(async (nav) => {
		// Return if we have navigated from a different category (or unrelated page).
		if (nav.from?.params?.slug !== href) return;

		// Will never happen, because component is already mounted. Makes typescript happy.
		if (!anchorEl || !headingEl) return;

		// We need to attach the view transition-names to the elements,
		// so that navigation from '/cat/[slug]' to '/' (where this element is located) can be animated.

		// Attach the view transition name to the anchor and heading elements.
		anchorEl.style.viewTransitionName = 'vt-cat-image';
		headingEl.style.viewTransitionName = `vt-cat-title`;

		// Remove the transition-names so they don't interfere with navigations to unrelated pages.
		onViewTransitionEnd(() => {
			anchorEl!.style.viewTransitionName = '';
		});
	});
</script>

<div class="relative aspect-[3/1] w-full rounded-3xl">
	<a
		bind:this={anchorEl}
		href="/cat/{href}"
		style="--coverImgUrl: url('{bgImg}'); view-transition-class: cat-image;"
		class="bgImg flex h-full items-center justify-center rounded-3xl p-4"
		onclick={(el) => {
			const clickedCatImageEl = el.currentTarget as HTMLAnchorElement;
			const clickedCatTitleEl = clickedCatImageEl.children[0] as HTMLHeadingElement;

			// Set view-transition properties for the clicked category.
			clickedCatImageEl.style.viewTransitionName = 'vt-cat-image';
			clickedCatTitleEl.style.viewTransitionName = `vt-cat-title`;

			// Set all other category buttons to have be invisible.
			document.querySelectorAll('.bgImg').forEach((catImageEl) => {
				// Skip the clicked category image.
				if (catImageEl === clickedCatImageEl) return;

				const unusedCatImage = catImageEl as HTMLAnchorElement;
				const unusedCatTitle = unusedCatImage.children[0] as HTMLHeadingElement;

				// Set the other category IMAGES to have an opacity of 0 (comes from transition-class).
				// Must also set a unique transition name to make it transition in the first place.
				unusedCatImage.style.viewTransitionClass = 'cat-image-unused';
				unusedCatImage.style.viewTransitionName = `${normalizeCssValue(catImageEl.textContent ?? 'a')}`;

				// All other category TITLES be invisible.
				// By removing the view transition name, the titles will follow the transition of 'unusedCatImage' (opacity 0).
				unusedCatTitle.style.viewTransitionName = '';
			});
		}}
	>
		<h2
			bind:this={headingEl}
			class="z-50 text-center text-2xl text-white text-shadow-[var(--shadow-text)] xs:text-[28px]"
			style="width: fit-content; view-transition-class: cat-title;"
		>
			{title}
		</h2>
	</a>
</div>

<style>
	:root::view-transition-group(.cat-title) {
		z-index: 100;
	}

	:root::view-transition-group(.cat-image-unused) {
		opacity: 0;
	}

	:root::view-transition-new(.cat-image),
	:root::view-transition-old(.cat-image) {
		/* Prevent the default animation,
        so both views remain opacity: 1 throughout the transition */
		animation: none;
		mix-blend-mode: normal;

		/* Animate the height of the image changing. !REMOVE IF PERFORMANCE IS SLOW! */
		height: 100%;

		overflow: clip; /* Clip any overflow from the transition */
		border-radius: 26px; /* Rounded corners */

		/* Animate the cover of the image */
		object-fit: cover;
	}

	:root::view-transition-new(.cat-image) {
		/* object-fit: contain; Works from '/cat/[slug]' to '/' */
		/* object-fit: cover  ; Works from '/cat/[slug]' to '/cat/[slug]' */
		object-fit: var(--obj-fit);
	}

	.bgImg {
		/* Set the background image */
		background-image: var(--coverImgUrl);
		background-size: cover;
		background-position: center;

		/* Darken the background image */
		background-color: #2525251f;
		background-blend-mode: multiply;
	}
</style>
