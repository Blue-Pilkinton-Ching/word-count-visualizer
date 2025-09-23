<script lang="ts">
	import { FileText, Globe, ChevronDown, ChevronUp, Settings } from 'lucide-svelte';

	let {
		useCustomText = $bindable(),
		wordCountInput = $bindable(),
		customText = $bindable(),
		language = $bindable(),
		includePunctuation = $bindable(),
		averageSentenceLength = $bindable(),
		paragraphLength = $bindable()
	} = $props<{
		useCustomText: boolean;
		wordCountInput: number;
		customText: string;
		language: string;
		includePunctuation: boolean;
		averageSentenceLength: number;
		paragraphLength: number;
	}>();

	let showAdvancedSettings = $state(false);

	const languageOptions = [
		{ value: 'lorem', label: 'Lorem Ipsum', placeholder: 'Type your text here...' },
		{ value: 'en', label: 'English', placeholder: 'Type your text here...' },
		{ value: 'es', label: 'Español', placeholder: 'Escribe tu texto aquí...' },
		{ value: 'fr', label: 'Français', placeholder: 'Tapez votre texte ici...' },
		{ value: 'de', label: 'Deutsch', placeholder: 'Geben Sie hier Ihren Text ein...' },
		{ value: 'it', label: 'Italiano', placeholder: 'Digita il tuo testo qui...' },
		{ value: 'pt', label: 'Português', placeholder: 'Digite seu texto aqui...' }
	];

	const currentLanguage = $derived(
		languageOptions.find((lang) => lang.value === language) || languageOptions[0]
	);
</script>

<div class="rounded-lg bg-white p-6 shadow-sm">
	<h2 class="mb-4 flex items-center text-lg font-semibold">
		<FileText class="mr-2 h-5 w-5" />
		Content
	</h2>

	<div class="space-y-4">
		<!-- Language Selector -->
		<div>
			<label for="language" class="mb-2 block text-sm font-medium text-gray-700">
				<Globe class="mr-1 inline h-4 w-4" />
				Language
			</label>
			<select
				id="language"
				bind:value={language}
				class="w-full rounded-md border border-gray-300 px-3 py-2"
			>
				{#each languageOptions as lang (lang.value)}
					<option value={lang.value}>{lang.label}</option>
				{/each}
			</select>
		</div>

		<!-- Word Count Input -->
		<div>
			<label for="wordCount" class="mb-2 block text-sm font-medium text-gray-700">
				Number of Words
			</label>
			<input
				id="wordCount"
				type="number"
				bind:value={wordCountInput}
				min="1"
				max="10000"
				class="w-full rounded-md border border-gray-300 px-3 py-2"
				disabled={useCustomText}
			/>
		</div>

		<!-- Advanced Settings -->
		<div class="border-t pt-4">
				<button
					onclick={() => (showAdvancedSettings = !showAdvancedSettings)}
					class="flex w-full items-center justify-between text-sm font-medium text-gray-700 hover:text-gray-900"
				>
					<div class="flex items-center">
						<Settings class="mr-2 h-4 w-4" />
						Advanced Content Settings
					</div>
					{#if showAdvancedSettings}
						<ChevronUp class="h-4 w-4" />
					{:else}
						<ChevronDown class="h-4 w-4" />
					{/if}
				</button>

				{#if showAdvancedSettings}
					<div class="mt-4 space-y-4 rounded-md bg-gray-50 p-4">
						<!-- Custom Text Option -->
						<div>
							<label class="flex items-center">
								<input type="checkbox" bind:checked={useCustomText} class="mr-2" />
								<span class="text-sm">Use custom text instead of generated content</span>
							</label>
						</div>

						{#if useCustomText}
							<div>
								<label for="customText" class="mb-2 block text-sm font-medium text-gray-700">
									Your Text
								</label>
								<textarea
									id="customText"
									bind:value={customText}
									placeholder={currentLanguage.placeholder}
									rows="4"
									class="w-full rounded-md border border-gray-300 px-3 py-2"
								></textarea>
							</div>
						{:else}
							<div>
								<label class="flex items-center">
									<input type="checkbox" bind:checked={includePunctuation} class="mr-2" />
									<span class="text-sm">Include punctuation and paragraphs</span>
								</label>
							</div>
						{/if}

						{#if includePunctuation && !useCustomText}
							<div>
								<label for="sentenceLength" class="mb-2 block text-sm font-medium text-gray-700">
									Average Sentence Length ({averageSentenceLength} words)
								</label>
								<input
									id="sentenceLength"
									type="range"
									bind:value={averageSentenceLength}
									min="5"
									max="25"
									step="1"
									class="w-full"
								/>
								<div class="flex justify-between text-xs text-gray-500">
									<span>5 (Short)</span>
									<span>25 (Long)</span>
								</div>
							</div>

							<div>
								<label for="paragraphLength" class="mb-2 block text-sm font-medium text-gray-700">
									Paragraph Length ({paragraphLength} words)
								</label>
								<input
									id="paragraphLength"
									type="range"
									bind:value={paragraphLength}
									min="30"
									max="150"
									step="10"
									class="w-full"
								/>
								<div class="flex justify-between text-xs text-gray-500">
									<span>30 (Short)</span>
									<span>150 (Long)</span>
								</div>
							</div>
						{/if}
					</div>
				{/if}
			</div>
	</div>
</div>
