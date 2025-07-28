<script lang="ts">
	import { Home, Library, Cog, type Icon as IconType } from '@lucide/svelte';

	type MenuItem = {
		name: string;
		href: string;
		icon: typeof IconType;
	};

	const menuItems: MenuItem[] = [
		{
			name: 'Home',
			href: '/',
			icon: Home
		},
		{
			name: 'Blog',
			href: '/blog',
			icon: Library
		},
		{
			name: 'Projects',
			href: '/projects',
			icon: Cog
		}
	];
</script>

{#each menuItems as item}
	{@const Icon = item.icon}
	<a href={item.href}>
		<Icon />
		<span>{item.name}</span>
	</a>
{/each}
