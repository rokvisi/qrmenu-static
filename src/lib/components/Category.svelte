<script lang="ts">
	interface Props {
		title: string;
		href: string;
		bgImg: string;
	}

	let { title, href, bgImg }: Props = $props();
</script>

<div class="relative h-44 w-full rounded-3xl">
	<a
		href="/cat/{href}"
		style="--coverImgUrl: url('{bgImg}')"
		class="bgImg flex h-full items-center justify-center rounded-3xl p-4 text-3xl text-white text-shadow-[var(--shadow-text)]"
	>
		<h2 class="z-10">{title}</h2>
	</a>
</div>

<style>
	.bgImg {
		background-image: var(--coverImgUrl);
		background-size: cover;
		background-position: center;
	}
	.bgImg::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 24px;
		background-position: auto;
		background-color: #252525;
		opacity: 0.3;
	}
</style>
