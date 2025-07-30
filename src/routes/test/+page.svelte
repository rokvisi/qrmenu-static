<script lang="ts">
	import InfoDiv from '$lib/components/InfoDiv.svelte';
	import { scrollY } from 'svelte/reactivity/window';
</script>

<div>
	<p class="fixed top-0 left-0">ScrollY: {scrollY.current}</p>
	<div>
		{#each { length: 20 } as _, i}
			<InfoDiv />
		{/each}
	</div>
</div>
