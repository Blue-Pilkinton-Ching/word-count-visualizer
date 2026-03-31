<script lang="ts">
	import '../app.css';

	import './firebase';

	let { children } = $props();
</script>

<div class="min-h-screen bg-gray-50" lang="en" dir="ltr">
	<header class="overlay-scrollbar border-b border-gray-300 bg-white">
		<div class="container mx-auto flex h-16 items-center justify-between px-4">
			<div class="flex w-full items-center justify-between space-x-2">
				<a href="/">
					<h1 class="text-xl font-semibold text-gray-900">Word Count Visualizer</h1>
				</a>
				<a href="/about" class="text-sm hover:underline">About</a>
			</div>
		</div>
	</header>
	<div class="overlay-scrollbar">
		<main class="container mx-auto p-4">
			{@render children()}
		</main>
	</div>
</div>
