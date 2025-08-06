<script>
	import { onMount } from 'svelte';

	const { src, alt } = {
		src: '/images/breakfasts/english.webp',
		alt: ''
	};

	onMount(() => {
		document.documentElement.style.setProperty('--obj-fit', 'contain');
	});
</script>

<img {src} {alt} />

<style>
	img {
		view-transition-class: vtc-image;
		view-transition-name: vtn-image;

		display: inline-block;
		height: 200px;
		width: 100%;

		object-fit: cover;
		object-position: center;
	}

	:root::view-transition-old(.vtc-image),
	:root::view-transition-new(.vtc-image) {
		/* Prevent the default animation,
        so both views remain opacity: 1 throughout the transition */
		animation: none;
		mix-blend-mode: normal;

		/* Animate the height of the image changing. !REMOVE IF PERFORMANCE IS SLOW! */
		height: 100%;
		width: 100%;

		overflow: clip; /* Clip any overflow from the transition */

		/* Animate the cover of the image */
		object-fit: cover;
	}

	:root::view-transition-new(.vtc-image) {
		/* object-fit: contain; Works from '/cat/[slug]' to '/' */
		/* object-fit: cover  ; Works from '/cat/[slug]' to '/cat/[slug]' */
		object-fit: var(--obj-fit);
	}
</style>
