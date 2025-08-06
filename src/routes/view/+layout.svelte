<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';

	const { children } = $props();
	const href = $derived(page.url.pathname === '/view/test' ? '/view' : '/view/test');
</script>

<div>
	<Button {href} class="mb-5 px-10 py-5">{href === '/view/test' ? 'Next' : 'Back'}</Button>

	{@render children()}
</div>
