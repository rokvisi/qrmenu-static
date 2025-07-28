<script lang="ts">
	import type { Snippet } from 'svelte';
	import { type Icon as IconType } from '@lucide/svelte';

	interface Props {
		icon?: typeof IconType;
		children: Snippet;
	}
	let { icon: Icon, children }: Props = $props();
</script>

<div class="inline-flex items-center justify-between gap-1 rounded-xl border px-2">
	<Icon color="var(--text-color)" size={16} strokeWidth={1.5} />
	<span class="text-[var(--text-color)]">{@render children()}</span>
</div>
