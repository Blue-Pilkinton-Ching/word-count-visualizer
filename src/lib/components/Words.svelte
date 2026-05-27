<script lang="ts">
	import { MAX_WORD_COUNT, WORD_COUNT_EVENT_SUBMISSION_DELAY } from '$lib/config';
	import { Hash } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { logWordCountEvent } from '$lib/utils/log-event';

	let { useCustomText = $bindable(), wordCountInput = $bindable() } = $props<{
		useCustomText: boolean;
		wordCountInput: number | undefined;
	}>();

	let inputElement: HTMLInputElement | undefined = $state(undefined);

	onMount(() => {
		inputElement?.focus();
	});

	$effect(() => {
		const value = wordCountInput;
		const timeout = setTimeout(() => {
			logWordCountEvent(value);
		}, WORD_COUNT_EVENT_SUBMISSION_DELAY);
		return () => clearTimeout(timeout);
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
				value={wordCountInput}
				oninput={(e) => {
					const val = e.currentTarget.valueAsNumber;
					wordCountInput = isNaN(val) ? undefined : Math.min(val, MAX_WORD_COUNT);
				}}
				placeholder="Enter the number of words..."
				class="h-11 w-full rounded-md border border-gray-300 px-3 py-2"
				disabled={useCustomText}
			/>
		</form>
	</div>
</div>
