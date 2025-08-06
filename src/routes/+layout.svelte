<script lang="ts">
	import '../app.css';
	import '@fontsource-variable/rubik';

	import Badge from '$lib/components/Badge.svelte';
	import MapPin from '@lucide/svelte/icons/map-pin';
	import Phone from '@lucide/svelte/icons/phone';
	import Wifi from '@lucide/svelte/icons/wifi';
	import Clock4 from '@lucide/svelte/icons/clock-4';
	import { dev } from '$app/environment';
	import { getTimezoneTime } from '$lib';
	import { goto, onNavigate } from '$app/navigation';
	import { triggerViewTransitionEndCallbacks } from '$lib/hooks/onViewTransitionEnd';
	import BackHomeButton from '$lib/components/BackHomeButton.svelte';

	// Enable page transitions.
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			const viewTransition = document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});

			viewTransition.finished.then(() => {
				triggerViewTransitionEndCallbacks();
			});
		});
	});

	let { children, data } = $props();

	const timezoneTime = getTimezoneTime(data.restaurant.timezone);
	const restaurantHours = data.restaurant.time[timezoneTime.dayOfWeekName];
</script>

<svelte:head>
	<title>
		{`${dev ? 'DEV' : 'BUILD'} | Menu Demo`}
	</title>
</svelte:head>

<div class="main-outter-wrapper no-transition grid min-h-screen grid-rows-1 bg-[#F3F1EF]">
	<div
		class="relative mx-auto flex w-full max-w-[560px] flex-col overflow-hidden bg-white"
		data-vaul-drawer-wrapper
	>
		<!-- Back Button -->
		<BackHomeButton />

		<!-- Banner Image -->
		<img
			src="/images/{data.restaurant.bannerImage}"
			alt=""
			class=" h-[162px] object-cover object-center"
		/>

		<!-- Main Section -->
		<main
			class="z-10 -mt-8 grow rounded-t-3xl bg-white px-4 pt-6 pb-12 shadow-[var(--shadow-border)]"
		>
			<div class="mb-4 flex flex-col gap-2">
				<h1 class="text-[32px]">Planas B</h1>

				<!-- Info Badge Area -->
				<div class="flex flex-wrap items-center justify-start gap-2 text-sm">
					<Badge icon={MapPin}>{data.restaurant.address}</Badge>
					<Badge icon={Phone}>{data.restaurant.phone}</Badge>
					<Badge icon={Clock4}>{restaurantHours}</Badge>
					<Badge icon={Wifi}>{data.restaurant.wifiPassword}</Badge>
				</div>

				<!-- Restaurant Info Area -->
				<div class="text-sm text-[var(--text-color)]">
					<p>
						Here you can add additional information for your guests, like taxes, service fees,
						restaurant working hours, contacts, delivery terms, general QR code menu information,
						and so on
					</p>
				</div>

				<a href="/search">Search</a>
			</div>

			<div class="vt-main-content">
				{@render children()}
			</div>
		</main>
	</div>
</div>

<style>
	.main-outter-wrapper {
		view-transition-name: main-outter-wrapper;
	}
	:root::view-transition-group(main-outter-wrapper) {
		/* Don't animate the background of the page */
		/* Otherwise the background color will start twitching. */
		opacity: 1;
		animation: none;
	}

	.vt-main-content {
		view-transition-name: vt-main-content;
	}
	:root::view-transition-old(vt-main-content) {
		animation: var(--vt-old);
	}

	:root::view-transition-new(vt-main-content) {
		animation: var(--vt-new);
	}
</style>
