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
			<h2 class="p-2 text-lg font-semibold">Text view</h2>
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
