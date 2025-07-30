<script lang="ts">
	import { scrollY } from 'svelte/reactivity/window';

	let ref: HTMLDivElement | undefined = $state();

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

	const foo = $derived(boundingRect.top + boundingRect.height - (scrollY.current ?? 0));
</script>

<div class="mb-10 border border-red-200" bind:this={ref}>
	<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
	<div>
		{foo}
	</div>
</div>
