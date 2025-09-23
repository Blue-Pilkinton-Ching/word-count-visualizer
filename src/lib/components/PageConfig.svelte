<script lang="ts">
	import { Download } from 'lucide-svelte';

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
		<Download class="mr-2 h-5 w-5" />
		Export & Actions
	</h2>

	<div class="space-y-3">
		<!-- Export Button -->
		<button
			onclick={printDocument}
			class="flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-4 text-white transition-colors hover:bg-blue-700"
		>
			<Download class="mr-3 h-5 w-5" />
			<div class="text-left">
				<div class="font-semibold">View to PDF</div>
				<div class="text-sm opacity-90">Print or save as PDF</div>
			</div>
		</button>

		<!-- Copy Button -->
		<button
			onclick={copyToClipboard}
			class="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-gray-100 px-6 py-4 transition-colors hover:bg-gray-200"
		>
			<svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
				></path>
			</svg>
			<div class="text-left">
				<div class="font-semibold">Copy Text</div>
				<div class="text-sm text-gray-600">Copy to clipboard</div>
			</div>
		</button>
	</div>
</div>
