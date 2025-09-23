<script lang="ts">
	import { Printer, Type, FileText, Globe, Moon, Sun } from 'lucide-svelte';

	let wordCountInput = $state(500);
	let customText = $state('');
	let useCustomText = $state(false);
	let fontSize = $state(12);
	let fontFamily = $state('Arial');
	let lineSpacing = $state(2.0);
	let margins = $state(1);
	let language = $state('en');
	let darkMode = $state(false);

	const fontOptions = [
		'Arial',
		'Times New Roman',
		'Calibri',
		'Georgia',
		'Helvetica'
	];

	const languageOptions = [
		{ value: 'en', label: 'English', placeholder: 'Type your text here...' },
		{ value: 'es', label: 'Español', placeholder: 'Escribe tu texto aquí...' },
		{ value: 'fr', label: 'Français', placeholder: 'Tapez votre texte ici...' },
		{ value: 'de', label: 'Deutsch', placeholder: 'Geben Sie hier Ihren Text ein...' },
		{ value: 'it', label: 'Italiano', placeholder: 'Digita il tuo testo qui...' },
		{ value: 'pt', label: 'Português', placeholder: 'Digite seu texto aqui...' }
	];


	function generateSampleText(wordCount: number): string {
		const words = [
			'Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
			'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
			'magna', 'aliqua', 'Ut', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
			'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
			'consequat', 'Duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
			'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'Excepteur', 'sint',
			'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
			'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
		];

		let text = '';
		for (let i = 0; i < wordCount; i++) {
			text += words[i % words.length];
			if (i < wordCount - 1) text += ' ';
		}
		return text;
	}

	function getDisplayText(): string {
		if (useCustomText && customText.trim()) {
			return customText;
		}
		return generateSampleText(wordCountInput);
	}

	function countWords(text: string): number {
		return text.trim().split(/\s+/).filter(word => word.length > 0).length;
	}

	function printDocument(): void {
		window.print();
	}

	$effect(() => {
		if (useCustomText && customText.trim()) {
			wordCountInput = countWords(customText);
		}
	});

	const displayText = $derived(getDisplayText());
	const actualWordCount = $derived(countWords(displayText));
	const currentLanguage = $derived(languageOptions.find(lang => lang.value === language) || languageOptions[0]);
</script>

<svelte:head>
	<title>Word Count Visualizer - See How Many Pages Your Words Fill</title>
	<meta name="description" content="Instantly visualize how many pages your words will fill. Adjust fonts, spacing, and margins to see exactly how your document will look. Free tool for students and professionals.">
	<meta name="keywords" content="word count, pages calculator, document length, essay length, word counter, page estimator, academic writing, professional writing">
	<meta property="og:title" content="Word Count Visualizer - Free Document Length Calculator">
	<meta property="og:description" content="See exactly how your words will look on paper. Perfect for students and professionals.">
	<meta property="og:type" content="website">
	<meta name="twitter:card" content="summary">
	<meta name="twitter:title" content="Word Count Visualizer">
	<meta name="twitter:description" content="Visualize document length with our free word count calculator.">
	<link rel="canonical" href="https://wordcountvisualizer.com">
</svelte:head>

<div class="grid gap-6 lg:grid-cols-12" class:dark={darkMode}>
	<!-- Controls Panel -->
	<div class="space-y-6 lg:col-span-4">
		<div class="rounded-lg bg-white p-6 shadow-sm">
			<h2 class="mb-4 flex items-center text-lg font-semibold">
				<FileText class="mr-2 h-5 w-5" />
				Content
			</h2>

			<div class="space-y-4">
				<div>
					<label class="mb-2 block text-sm font-medium text-gray-700">
						Input Method
					</label>
					<div class="space-y-2">
						<label class="flex items-center">
							<input
								type="radio"
								bind:group={useCustomText}
								value={false}
								class="mr-2"
							/>
							Word Count
						</label>
						<label class="flex items-center">
							<input
								type="radio"
								bind:group={useCustomText}
								value={true}
								class="mr-2"
							/>
							Custom Text
						</label>
					</div>
				</div>

				{#if !useCustomText}
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
						/>
					</div>
				{:else}
					<div>
						<label for="customText" class="mb-2 block text-sm font-medium text-gray-700">
							Your Text
						</label>
						<textarea
							id="customText"
							bind:value={customText}
							placeholder={currentLanguage.placeholder}
							rows="4"
							class="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
						></textarea>
					</div>
				{/if}
			</div>
		</div>

		<!-- Font Settings -->
		<div class="rounded-lg bg-white p-6 shadow-sm">
			<h2 class="mb-4 flex items-center text-lg font-semibold">
				<Type class="mr-2 h-5 w-5" />
				Typography
			</h2>

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
						{#each fontOptions as font}
							<option value={font}>{font}</option>
						{/each}
					</select>
				</div>

				<div>
					<label for="fontSize" class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
						Font Size ({fontSize}pt) <span class="text-xs text-gray-500 dark:text-gray-400">(Standard: 12pt)</span>
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
						Line Spacing ({lineSpacing})
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
		</div>

		<!-- Page Settings -->
		<div class="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
			<h2 class="mb-4 flex items-center text-lg font-semibold dark:text-white">
				<Printer class="mr-2 h-5 w-5" />
				Page Setup
			</h2>

			<div class="space-y-4">
				<div>
					<label for="margins" class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
						Margins ({margins} inch)
					</label>
					<input
						id="margins"
						type="range"
						bind:value={margins}
						min="0.5"
						max="2.0"
						step="0.1"
						class="w-full"
					/>
				</div>

				<!-- Export Button -->
				<button
					onclick={printDocument}
					class="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
				>
					<Printer class="mr-2 h-5 w-5" />
					View as PDF
				</button>
			</div>
		</div>

		<!-- Language & Settings -->
		<div class="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
			<h3 class="mb-4 flex items-center text-lg font-semibold dark:text-white">
				<Globe class="mr-2 h-5 w-5" />
				Language & Settings
			</h3>
			<div class="space-y-4">
				<div>
					<label for="language" class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
						Language
					</label>
					<select
						id="language"
						bind:value={language}
						class="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
					>
						{#each languageOptions as lang}
							<option value={lang.value}>{lang.label}</option>
						{/each}
					</select>
				</div>

				<div>
					<label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
						Theme
					</label>
					<button
						onclick={() => darkMode = !darkMode}
						class="flex w-full items-center justify-center rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
					>
						{#if darkMode}
							<Sun class="mr-2 h-4 w-4" />
							Light Mode
						{:else}
							<Moon class="mr-2 h-4 w-4" />
							Dark Mode
						{/if}
					</button>
				</div>
			</div>
		</div>

		<!-- Statistics -->
		<div class="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
			<h3 class="mb-3 text-lg font-semibold dark:text-white">Statistics</h3>
			<div class="space-y-2 text-sm">
				<div class="flex justify-between">
					<span class="dark:text-gray-300">Words:</span>
					<span class="font-medium dark:text-white">{actualWordCount.toLocaleString()}</span>
				</div>
				<div class="flex justify-between">
					<span class="dark:text-gray-300">Characters:</span>
					<span class="font-medium dark:text-white">{displayText.length.toLocaleString()}</span>
				</div>
				<div class="flex justify-between">
					<span class="dark:text-gray-300">Characters (no spaces):</span>
					<span class="font-medium dark:text-white">{displayText.replace(/\s/g, '').length.toLocaleString()}</span>
				</div>
				<div class="flex justify-between">
					<span class="dark:text-gray-300">Reading Time:</span>
					<span class="font-medium dark:text-white">{Math.ceil(actualWordCount / 200)} min</span>
				</div>
			</div>
		</div>

	</div>

	<!-- Preview Area -->
	<div class="lg:col-span-8">
		<div class="rounded-lg bg-white shadow-sm">
			<div class="border-b p-4">
				<h2 class="text-lg font-semibold">Document Preview</h2>
			</div>
			<div class="p-6">
				<div
					class="mx-auto bg-white shadow-lg"
					class:w-[612px]={pageSize === 'letter' || pageSize === 'legal'}
					class:w-[595px]={pageSize === 'a4'}
					style="min-height: {pageSize === 'letter' ? '792px' : pageSize === 'a4' ? '842px' : '1008px'}"
				>
					<div
						id="document-content"
						class="prose max-w-none"
						style="
							font-family: '{fontFamily}', serif;
							font-size: {fontSize}pt;
							line-height: {lineSpacing};
							padding: {margins}in;
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
		body * {
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
			background: white;
		}

		@page {
			margin: 0;
			size: letter;
		}
	}
</style>