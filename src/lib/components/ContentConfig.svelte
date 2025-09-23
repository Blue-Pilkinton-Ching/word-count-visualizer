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
	let isExpanded = $state(true);

	const languageOptions = [
		{ value: 'lorem', label: 'Lorem Ipsum', placeholder: 'Type your text here...' },
		{ value: 'en', label: 'English', placeholder: 'Type your text here...' },
		{ value: 'es', label: 'Español', placeholder: 'Escribe tu texto aquí...' },
		{ value: 'fr', label: 'Français', placeholder: 'Tapez votre texte ici...' },
		{ value: 'de', label: 'Deutsch', placeholder: 'Geben Sie hier Ihren Text ein...' },
		{ value: 'it', label: 'Italiano', placeholder: 'Digita il tuo testo qui...' },
		{ value: 'pt', label: 'Português', placeholder: 'Digite seu texto aqui...' },
		{ value: 'nl', label: 'Nederlands', placeholder: 'Typ hier je tekst...' },
		{ value: 'ru', label: 'Русский', placeholder: 'Введите ваш текст здесь...' },
		{ value: 'ja', label: '日本語', placeholder: 'ここにテキストを入力してください...' },
		{ value: 'zh', label: '中文', placeholder: '在这里输入你的文字...' },
		{ value: 'ko', label: '한국어', placeholder: '여기에 텍스트를 입력하세요...' },
		{ value: 'ar', label: 'العربية', placeholder: 'اكتب النص هنا...' },
		{ value: 'hi', label: 'हिन्दी', placeholder: 'यहाँ अपना टेक्स्ट लिखें...' },
		{ value: 'sv', label: 'Svenska', placeholder: 'Skriv din text här...' },
		{ value: 'no', label: 'Norsk', placeholder: 'Skriv teksten din her...' },
		{ value: 'da', label: 'Dansk', placeholder: 'Skriv din tekst her...' },
		{ value: 'pl', label: 'Polski', placeholder: 'Wpisz tutaj swój tekst...' },
		{ value: 'tr', label: 'Türkçe', placeholder: 'Metninizi buraya yazın...' },
		{ value: 'he', label: 'עברית', placeholder: 'הקלד כאן את הטקסט שלך...' },
		{ value: 'fi', label: 'Suomi', placeholder: 'Kirjoita tekstisi tähän...' }
	];

	const currentLanguage = $derived(
		languageOptions.find((lang) => lang.value === language) || languageOptions[0]
	);
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
			Content
		</div>
		{#if isExpanded}
			<ChevronUp class="h-5 w-5" />
		{:else}
			<ChevronDown class="h-5 w-5" />
		{/if}
	</button>

	{#if isExpanded}
		<div class="space-y-4" id="content-config-panel">
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
	{/if}
</div>
