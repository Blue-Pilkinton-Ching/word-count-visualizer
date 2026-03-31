<script lang="ts">
	import { Eye, Copy, Check, Printer } from 'lucide-svelte';

	let {
		displayText,
		fontFamily,
		fontSize,
		lineSpacing,
		isRTL = false
	} = $props<{
		displayText: string;
		fontFamily: string;
		fontSize: number;
		lineSpacing: number;
		isRTL?: boolean;
	}>();

	let copied = $state(false);

	function printDocument(): void {
		window.print();
	}

	async function copyText(): Promise<void> {
		try {
			await navigator.clipboard.writeText(displayText);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy text:', err);
		}
	}
</script>

<div class="lg:col-span-8">
	<div
		class="flex flex-col gap-4 rounded-lg bg-white px-6 py-6 shadow-sm sm:gap-6 sm:px-12 sm:py-10"
	>
		<div class="flex items-center justify-between">
			<h2 class="text-xl font-semibold">Sample Text</h2>
			<div class="flex gap-2">
				<button
					class="flex items-center rounded-lg border-gray-500 px-2 py-2 transition-colors hover:bg-gray-200 sm:border sm:px-4"
					onclick={copyText}
				>
					{#if copied}
						<Check class="h-5 w-5 sm:mr-2" />
						<span class="hidden sm:inline">Copied!</span>
					{:else}
						<Copy class="h-5 w-5 sm:mr-2" />
						<span class="hidden sm:inline">Copy text</span>
					{/if}
				</button>
				<button
					onclick={printDocument}
					class="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
				>
					<Eye class="hidden h-5 w-5 sm:mr-2 sm:inline" />
					<Printer class="inline h-5 w-5 sm:mr-2 sm:hidden" />
					<span class="hidden sm:inline">View as pdf</span>
				</button>
			</div>
		</div>
		{#if displayText}
			<div class="overflow-x-auto">
				<div
					id="document-content"
					class="prose max-w-none break-words"
					dir={isRTL ? 'rtl' : 'ltr'}
					style="
							font-family: '{fontFamily}', sans-serif;
							font-size: {fontSize}pt;
							line-height: {lineSpacing};
							color: black;
							background: white;
							text-align: {isRTL ? 'right' : 'left'};
						"
				>
					<p class="whitespace-pre-wrap">
						{displayText}
					</p>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	@media print {
		* {
			visibility: hidden;
		}

		#document-content,
		#document-content * {
			visibility: visible;
		}

		#document-content {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: white !important;
			color: black !important;
			box-sizing: border-box;
		}
	}
</style>
