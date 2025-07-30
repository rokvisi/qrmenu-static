<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { formatCssPropertyValue } from '$lib';
	import { onViewTransitionEnd } from '$lib/onViewTransitionEnd';

	interface Props {
		title: string;
		href: string;
		bgImg: string;
	}
	let { title, href, bgImg }: Props = $props();

	let anchorEl: HTMLAnchorElement | null = $state(null);
	let headingEl: HTMLHeadingElement | null = $state(null);
	afterNavigate(async (nav) => {
		// Return if we have navigated from a different category (or unrelated page).
		if (nav.from?.params?.slug !== href) return;

		// Will never happen, because component is already mounted.
		// Makes typescript happy.
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

<div class="relative h-44 w-full rounded-3xl">
	<a
		bind:this={anchorEl}
		href="/cat/{href}"
		style="--coverImgUrl: url('{bgImg}'); view-transition-class: cat-image;"
		class="bgImg flex h-full items-center justify-center rounded-3xl p-4 text-3xl text-white text-shadow-[var(--shadow-text)]"
		onclick={(el) => {
			const clickedCatImage = el.currentTarget as HTMLAnchorElement;
			const clickedCatTitle = clickedCatImage.children[0] as HTMLHeadingElement;

			// Set view-transition properties for the clicked category.
			clickedCatImage.style.viewTransitionName = 'vt-cat-image';
			clickedCatTitle.style.viewTransitionName = `vt-cat-title`;

			// Set all other category buttons to have be invisible.
			document.querySelectorAll('.bgImg').forEach((category) => {
				if (category !== clickedCatImage) {
					const unusedCatImage = category as HTMLAnchorElement;
					const unusedCatTitle = unusedCatImage.children[0] as HTMLHeadingElement;

					// Set the other category IMAGES to have an opacity of 0 (comes from transition-class).
					// Must also set a unique transition name to make it transition in the first place.
					unusedCatImage.style.viewTransitionClass = 'cat-image-unused';
					unusedCatImage.style.viewTransitionName = `${formatCssPropertyValue(category.textContent ?? 'a')}`;

					// All other category TITLES be invisible.
					// By removing the view transition name, the titles will follow the transition of 'unusedCatImage' (opacity 0).
					unusedCatTitle.style.viewTransitionName = '';
				}
			});
		}}
	>
		<h2
			bind:this={headingEl}
			class="z-50"
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
		/* Disable the animation of the new-image */
		animation: none;
		mix-blend-mode: normal;

		height: 100%; /* Animate the height of the image changing. !REMOVE IF PERFORMANCE IS SLOW! */

		overflow: clip; /* Clip any overflow from the transition */
		border-radius: 26px; /* Rounded corners */

		/* Animate the cover of the image */
		object-fit: cover;
		/* background-size: cover; */
	}

	.bgImg {
		background-image: var(--coverImgUrl);
		background-size: cover;
		background-position: center;
	}
	.bgImg::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 24px;
		background-position: auto;
		background-color: #252525;
		opacity: 0.3;
	}
</style>
