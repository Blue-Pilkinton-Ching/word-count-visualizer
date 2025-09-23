<script lang="ts">
	import { Eye, Copy } from 'lucide-svelte';

	let { displayText } = $props<{
		displayText: string;
	}>();

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
	<h2 class="mb-4 flex items-center text-lg font-semibold">
		<Eye class="mr-2 h-5 w-5" />
		Preview & Copy
	</h2>

	<div class="space-y-3">
		<!-- Preview Button -->
		<button
			onclick={printDocument}
			class="flex w-full items-center rounded-lg bg-blue-600 px-4 py-4 text-white transition-colors hover:bg-blue-700"
		>
			<Eye class="mr-4 ml-2 h-8 w-8" />
			<div class="text-left">
				<div class="font-medium">Preview as PDF</div>
			</div>
		</button>

		<!-- Copy Button -->
		<button
			onclick={copyToClipboard}
			class="flex w-full items-center rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 transition-colors hover:bg-gray-100"
		>
			<Copy class="mr-4 ml-2 h-8 w-8 text-gray-600" />
			<div class="text-left">
				<div class="font-medium text-gray-900">Copy Text</div>
			</div>
		</button>
	</div>
</div>
