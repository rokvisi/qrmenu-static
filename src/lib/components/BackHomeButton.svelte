<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import { quintInOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
</script>

{#if page.url.pathname !== '/'}
	<div class="fixed top-0 z-50">
		<a
			href="/"
			class="absolute top-3 left-3 inline-block rounded-full bg-white p-[10px] shadow-xl"
			transition:scale={{ duration: 200, easing: quintInOut }}
		>
			<ArrowLeft class="size-5" />
		</a>
	</div>
{/if}
