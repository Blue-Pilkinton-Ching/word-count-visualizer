<script lang="ts">
	let { displayText, fontFamily, fontSize, lineSpacing, margins } = $props<{
		displayText: string;
		fontFamily: string;
		fontSize: number;
		lineSpacing: number;
	}>();
</script>

<div class="lg:col-span-8">
	<div class="rounded-lg bg-white shadow-sm">
		<div class="border-b p-4">
			<h2 class="text-lg font-semibold">Document Preview</h2>
			<p class="mt-1 text-sm text-gray-500">Letter size (8.5" × 11")</p>
		</div>
		<div class="p-2 sm:p-6">
			<div class="overflow-x-auto">
				<div
					class="mx-auto bg-white shadow-lg"
					style="width: 612px; min-height: 792px; max-width: 100%;"
				>
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
