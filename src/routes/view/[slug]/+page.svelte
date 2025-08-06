<script>
	import { onMount } from 'svelte';

	const { src, alt } = {
		src: '/images/breakfasts/english.webp',
		alt: ''
	};

	onMount(() => {
		document.documentElement.style.setProperty('--obj-fit', 'cover');
	});
</script>

<img {src} {alt} />

<style>
	img {
		view-transition-class: vtc-image;
		view-transition-name: vtn-image;

		display: inline-block;
		height: 350px;
		width: 100%;

		object-fit: cover;
		object-position: center;
	}
</style>
