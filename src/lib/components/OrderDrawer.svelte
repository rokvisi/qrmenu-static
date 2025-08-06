<script lang="ts">
	import { Drawer } from 'vaul-svelte';
	import { Button } from '$lib/components/ui/button/index.js';

	let activeSnapPoint: string | number = $state(0.8);
	let drawerOpen: boolean = $state(true);
</script>

<Drawer.Root snapPoints={[0.8]} bind:activeSnapPoint bind:open={drawerOpen}>
	<Drawer.Trigger>Open Drawer</Drawer.Trigger>
	<Drawer.Overlay class="fixed inset-0 bg-black/40" />
	<Drawer.Portal>
		<Drawer.Content
			class="inset fixed right-0 bottom-0 left-0 mx-auto flex h-full max-w-[560px] rounded-t-3xl bg-white"
		>
			<div
				class={[
					'flex w-full flex-col p-4 pt-5',
					activeSnapPoint === 1 ? 'overflow-y-auto' : 'overflow-hidden'
				]}
			>
				<div class="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-zinc-300"></div>
				<Drawer.Title class="mb-4 font-medium">My Order</Drawer.Title>
				<div class="">
					<div class="mx-2 flex items-center justify-between">
						<div class=" flex gap-4">
							<img
								src="/images/breakfasts/english.webp"
								alt=""
								class="inline-block aspect-square w-20 rounded-2xl object-cover object-center"
							/>
							<div class="flex flex-col justify-between">
								<p>Full English Breakfast</p>
								<p class="flex gap-0.5 text-2xl font-medium text-[var(--text-color-accent)]">
									6.99 <span class="align-top text-[16px] font-normal">$</span>
								</p>
							</div>
						</div>

						<div
							class="flex items-center justify-between gap-5 text-2xl text-[var(--text-color-accent)]"
						>
							<button>-</button>
							<span class="text-xl">1</span>
							<button>+</button>
						</div>
					</div>
				</div>
			</div>
		</Drawer.Content>
	</Drawer.Portal>
</Drawer.Root>
