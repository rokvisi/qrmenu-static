<script lang="ts">
	import '../app.css';
	import bannerImgSrc from '$lib/static/images/banner.webp';
	import Badge from '$lib/components/Badge.svelte';
	import MapPin from '@lucide/svelte/icons/map-pin';
	import Phone from '@lucide/svelte/icons/phone';
	import Wifi from '@lucide/svelte/icons/wifi';
	import Clock4 from '@lucide/svelte/icons/clock-4';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';

	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { scale } from 'svelte/transition';
	import { cubicIn, cubicInOut, quartInOut, quintInOut } from 'svelte/easing';

	let { children } = $props();

	let dataLoaded = $state(false);
	onMount(async () => {
		const res = await fetch('/data/data.json');
		const json = await res.json();

		console.log(json);

		dataLoaded = true;
	});
</script>

<svelte:head>
	<title>Menu Demo</title>
</svelte:head>

<div class="grid min-h-screen grid-rows-1 bg-[#F3F1EF]">
	<div class="relative mx-auto flex w-full max-w-[560px] flex-col bg-white">
		<!-- Back Button -->
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

		<!-- Banner Image -->
		{#if !dataLoaded}
			<div class="flex h-[162px] items-center justify-center bg-[#F3F1EF]">
				<LoaderCircle class="mx-auto my-auto size-12 animate-spin text-[var(--text-color)]" />
			</div>
		{:else}
			<img src="/images/banner.jpg" alt="" class="h-[162px]" />
		{/if}

		<!-- Main Section -->
		<main
			class="z-10 -mt-8 grow rounded-t-3xl bg-white px-4 pt-6 pb-8 shadow-[var(--shadow-border)]"
		>
			{#if !dataLoaded}
				<LoaderCircle class="mx-auto mt-12 size-12 animate-spin text-[var(--text-color)]" />
			{:else}
				<div class="mb-4 space-y-2">
					<h1 class="text-[32px]">Planas B</h1>

					<!-- Info Badge Area -->
					<div class="flex flex-wrap items-center justify-start gap-2 text-sm">
						<Badge icon={MapPin}>Vilniaus g. 1, Kuršėnai, 81154 Šiaulių r. sav.</Badge>
						<Badge icon={Phone}>+370 662 40 200</Badge>
						<Badge icon={Clock4}>09:00 - 18:00</Badge>
						<Badge icon={Wifi}>slaptazodis123</Badge>
					</div>

					<!-- Restaurant Info Area -->
					<div class="text-sm text-[var(--text-color)]">
						<p>
							Here you can add additional information for your guests, like taxes, service fees,
							restaurant working hours, contacts, delivery terms, general QR code menu information,
							and so on
						</p>
					</div>
				</div>
				{@render children()}
			{/if}
		</main>
	</div>
</div>

<style>
	:global(html) {
		background-color: #f3f1ef;
	}
</style>
