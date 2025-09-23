<script lang="ts">
	import { Eye, Copy, ChevronDown, ChevronUp } from 'lucide-svelte';

	let { displayText } = $props<{
		displayText: string;
	}>();

	let isExpanded = $state(true);

	function printDocument(): void {
		window.print();
	}

	function copyToClipboard(): void {
		navigator.clipboard
			.writeText(displayText)
			.then(() => {
				alert('Text copied to clipboard!');
			})
			.catch(() => {
				alert('Failed to copy text');
			});
	}
</script>

<div class="rounded-lg bg-white p-6 shadow-sm">
	<button
		onclick={() => (isExpanded = !isExpanded)}
		class="flex w-full items-center justify-between text-lg font-semibold hover:text-gray-700 {isExpanded
			? 'mb-4'
			: ''}"
	>
		<div class="flex items-center">
			<Eye class="mr-2 h-5 w-5" />
			Preview & Copy
		</div>
		{#if isExpanded}
			<ChevronUp class="h-5 w-5" />
		{:else}
			<ChevronDown class="h-5 w-5" />
		{/if}
	</button>

	{#if isExpanded}
		<div class="space-y-3">
			<!-- Preview Button -->
			<button
				onclick={printDocument}
				class="flex w-full items-center rounded-lg bg-blue-600 px-4 py-4 text-white transition-colors hover:bg-blue-700"
			>
				<Eye class="mr-4 ml-2 h-8 w-8" />
				<div class="text-left">
					<div class="font-medium">Preview as document</div>
				</div>
			</button>

			<!-- Copy Button -->
			<button
				onclick={copyToClipboard}
				class="flex w-full items-center rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 transition-colors hover:bg-gray-100"
			>
				<Copy class="mr-4 ml-2 h-8 w-8 text-gray-600" />
				<div class="text-left">
					<div class="font-medium text-gray-900">Copy text</div>
				</div>
			</button>
		</div>
	{/if}
</div>
