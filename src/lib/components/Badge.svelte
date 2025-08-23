<script lang="ts">
	import type { Snippet } from 'svelte';
	import { type Icon as IconType } from '@lucide/svelte';

	interface Props {
		icon?: typeof IconType;
		children: Snippet;
	}
	const { icon: Icon, children }: Props = $props();
</script>

<div class="inline-flex items-center justify-between gap-1 rounded-xl border px-2">
	<Icon size={16} strokeWidth={1.5} />
	<span>{@render children()}</span>
</div>
