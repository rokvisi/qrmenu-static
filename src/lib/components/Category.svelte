<script lang="ts">
	import { formatCssPropertyValue } from '$lib';

	interface Props {
		title: string;
		href: string;
		bgImg: string;
	}

	let { title, href, bgImg }: Props = $props();
</script>

<div class="relative h-44 w-full rounded-3xl">
	<a
		href="/cat/{href}"
		style="--coverImgUrl: url('{bgImg}'); view-transition-name: cat-image-{formatCssPropertyValue(
			title
		)}"
		class="bgImg flex h-full items-center justify-center rounded-3xl p-4 text-3xl text-white text-shadow-[var(--shadow-text)]"
		onclick={(el) => {
			const clickedCategory = el.currentTarget as HTMLAnchorElement;

			// Set all other category buttons to have be invisible.
			document.querySelectorAll('.bgImg').forEach((category) => {
				if (category !== clickedCategory) {
					const unusedCatImage = category as HTMLAnchorElement;
					const unusedCatTitle = unusedCatImage.children[0] as HTMLHeadingElement;

					// All other category IMAGES will have an opacity of 0.
					unusedCatImage.style.viewTransitionClass = 'cat-image-unused';
					// All other category TITLES be invisible.
					// By removing the view transition name, the titles will follow the transition of the image (opacity 0).
					unusedCatTitle.style.viewTransitionName = '';
				}
			});
		}}
	>
		<h2
			class=""
			style="width: fit-content; view-transition-class: cat-title; view-transition-name: cat-title-{formatCssPropertyValue(
				title
			)}"
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
		background-size: cover;
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
