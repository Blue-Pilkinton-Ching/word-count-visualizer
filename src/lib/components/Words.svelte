<script lang="ts">
	import { Hash } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let { useCustomText = $bindable(), wordCountInput = $bindable() } = $props<{
		useCustomText: boolean;
		wordCountInput: number | undefined;
	}>();

	let inputElement: HTMLInputElement | undefined = $state(undefined);

	onMount(() => {
		inputElement?.focus();
	});
</script>

<div class="rounded-lg bg-white p-6 shadow-sm">
	<div
		class="mb-4 flex w-full items-center justify-between text-lg font-semibold"
		aria-controls="content-config-panel"
	>
		<div class="flex items-center">
			<Hash class="mr-2 h-5 w-5" />
			Words
		</div>
	</div>
	<div class="space-y-4" id="content-config-panel">
		<form>
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
		</form>
	</div>
</div>
