<script lang="ts">
	import { Eye } from 'lucide-svelte';

	let { displayText, fontFamily, fontSize, lineSpacing, margins } = $props<{
		displayText: string;
		fontFamily: string;
		fontSize: number;
		lineSpacing: number;
	}>();

	function printDocument(): void {
		window.print();
	}
</script>

<div class="lg:col-span-8">
	<div class="rounded-lg bg-white shadow-sm">
		<div class="flex items-center justify-between border-b p-4">
			<h2 class="p-2 text-lg font-semibold">Text view</h2>
			<button
				onclick={printDocument}
				class="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
			>
				<Eye class="mr-2 h-5 w-5" />
				View as pdf
			</button>
		</div>
		<div class="p-6 sm:p-12">
			<div class="overflow-x-auto">
				<div
					id="document-content"
					class="prose max-w-none break-words"
					style="
							font-family: '{fontFamily}', sans-serif;
							font-size: {fontSize}pt;
							line-height: {lineSpacing};
							color: black;
							background: white;
						"
				>
					<p class="whitespace-pre-wrap">{displayText}</p>
				</div>
			</div>
		</div>
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
