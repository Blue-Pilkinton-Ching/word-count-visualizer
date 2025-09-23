<script lang="ts">
	import { Type, ChevronDown, ChevronUp } from 'lucide-svelte';

	let {
		fontFamily = $bindable(),
		fontSize = $bindable(),
		lineSpacing = $bindable()
	} = $props<{
		fontFamily: string;
		fontSize: number;
		lineSpacing: number;
	}>();

	const fontOptions = ['Arial', 'Times New Roman', 'Calibri', 'Georgia', 'Helvetica'];
	let isExpanded = $state(false);
</script>

<div class="rounded-lg bg-white p-6 shadow-sm">
	<button
		onclick={() => (isExpanded = !isExpanded)}
		class="flex w-full items-center justify-between text-left text-lg font-semibold hover:text-gray-700 {isExpanded
			? 'mb-4'
			: ''}"
	>
		<div class="flex items-center">
			<Type class="mr-2 h-5 w-5" />
			Typography
		</div>
		{#if isExpanded}
			<ChevronUp class="h-5 w-5" />
		{:else}
			<ChevronDown class="h-5 w-5" />
		{/if}
	</button>

	{#if isExpanded}
		<div class="space-y-4">
			<div>
				<label for="fontFamily" class="mb-2 block text-sm font-medium text-gray-700">
					Font Family
				</label>
				<select
					id="fontFamily"
					bind:value={fontFamily}
					class="w-full rounded-md border border-gray-300 px-3 py-2"
				>
					{#each fontOptions as font (font)}
						<option value={font}>{font}</option>
					{/each}
				</select>
			</div>

			<div>
				<label for="fontSize" class="mb-2 block text-sm font-medium text-gray-700">
					Font Size ({fontSize}pt) <span class="text-xs text-gray-500">(Standard: 12pt)</span>
				</label>
				<input
					id="fontSize"
					type="range"
					bind:value={fontSize}
					min="8"
					max="24"
					step="1"
					class="w-full"
				/>
			</div>

			<div>
				<label for="lineSpacing" class="mb-2 block text-sm font-medium text-gray-700">
					Line Spacing ({lineSpacing}) <span class="text-xs text-gray-500">(Standard: 2.0)</span>
				</label>
				<input
					id="lineSpacing"
					type="range"
					bind:value={lineSpacing}
					min="1.0"
					max="3.0"
					step="0.1"
					class="w-full"
				/>
			</div>
		</div>
	{/if}
</div>
