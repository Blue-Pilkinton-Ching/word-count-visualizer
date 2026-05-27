<script lang="ts">
	import { page } from '$app/state';

	let { title = 'Word Count Visualizer' }: { title?: string } = $props();

	const pathname = $derived(page.url.pathname);
</script>

<header class="overlay-scrollbar border-b border-gray-300 bg-white">
	<div class="container mx-auto flex h-16 items-center justify-between px-4">
		<div class="flex w-full items-center justify-between space-x-2">
			<a href="/">
				<h1 class="text-xl font-semibold text-gray-900">{title}</h1>
			</a>
			<nav class="flex items-center gap-4 text-sm">
				<a
					href="/quick-preview"
					class={pathname === '/quick-preview' ? 'font-medium text-blue-600' : 'hover:underline'}
					>Quick preview</a
				>
				<a
					href="/about"
					class={pathname === '/about' ? 'font-medium text-blue-600' : 'hover:underline'}>About</a
				>
			</nav>
		</div>
	</div>
</header>
