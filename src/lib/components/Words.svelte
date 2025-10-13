<script lang="ts">
	import { FileText, Globe, ChevronDown, ChevronUp, Settings } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let { useCustomText = $bindable(), wordCountInput = $bindable() } = $props<{
		useCustomText: boolean;
		wordCountInput: number | undefined;
	}>();

	let isExpanded = $state(true);

	let inputElement: HTMLInputElement | undefined = $state(undefined);

	onMount(() => {
		inputElement?.focus();
	});
</script>

<div class="rounded-lg bg-white p-6 shadow-sm">
	<button
		onclick={() => (isExpanded = !isExpanded)}
		class="{isExpanded
			? 'mb-4'
			: ''} flex w-full items-center justify-between text-lg font-semibold hover:text-gray-700"
		aria-expanded={isExpanded}
		aria-controls="content-config-panel"
	>
		<div class="flex items-center">
			<FileText class="mr-2 h-5 w-5" />
			Words
		</div>
		{#if isExpanded}
			<ChevronUp class="h-5 w-5" />
		{:else}
			<ChevronDown class="h-5 w-5" />
		{/if}
	</button>

	{#if isExpanded}
		<div class="space-y-4" id="content-config-panel">
			<div>
				<label for="wordCount" class="mb-2 block text-sm font-medium text-gray-700">
					Number of Words
				</label>
				<input
					bind:this={inputElement}
					id="wordCount"
					type="number"
					bind:value={wordCountInput}
					placeholder="Enter the number of words..."
					min="1"
					max="10000"
					class="h-11 w-full rounded-md border border-gray-300 px-3 py-2"
					disabled={useCustomText}
				/>
			</div>
		</div>
	{/if}
</div>
