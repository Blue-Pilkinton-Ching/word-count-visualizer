<script lang="ts">
	let {
		title,
		searchTitle,
		description,
		wordCount
	}: { title: string; searchTitle: string; description: string; wordCount?: number } = $props();

	import {
		generateSampleText,
		countWords,
		type TextGenerationOptions
	} from '$lib/utils/text-generation';
	import ContentConfig from '$lib/components/ContentConfig.svelte';
	import TypographyConfig from '$lib/components/TypographyConfig.svelte';
	import Statistics from '$lib/components/Statistics.svelte';
	import DocumentPreview from '$lib/components/DocumentPreview.svelte';
	import Words from '$lib/components/Words.svelte';
	import { ArrowLeft } from 'lucide-svelte';

	import Header from '$lib/components/Header.svelte';

	let wordCountInput: number = $state(wordCount ?? 50);
	let customText = $state('');
	let useCustomText = $state(false);
	let fontSize = $state(12);
	let fontFamily = $state('Arial');
	let lineSpacing = $state(2.0);
	let language = $state('en');
	let includePunctuation = $state(true);
	let averageSentenceLength = $state(12);
	let paragraphLength = $state(80);

	let textPreviewTitle = $derived(
		wordCount ? `${wordCount.toLocaleString()} words` : ' Text Preview'
	);

	function getDisplayText(): string {
		if (useCustomText && customText.trim()) {
			return customText;
		}
		const options: TextGenerationOptions = {
			includePunctuation,
			averageSentenceLength,
			paragraphLength
		};
		return generateSampleText(wordCountInput ?? 0, language, options);
	}

	$effect(() => {
		if (useCustomText && customText.trim()) {
			wordCountInput = countWords(customText);
		}
	});

	const displayText = $derived(getDisplayText());
	const actualWordCount = $derived(countWords(displayText));
	const sentences = $derived(displayText.split(/[.!?]+/).filter((s) => s.trim().length > 0).length);
	const paragraphs = $derived(
		displayText.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length
	);
	const avgWordsPerSentence = $derived(
		sentences > 0 ? Math.round((actualWordCount / sentences) * 10) / 10 : 0
	);
	const avgWordsPerParagraph = $derived(
		paragraphs > 0 ? Math.round((actualWordCount / paragraphs) * 10) / 10 : 0
	);

	// RTL languages detection
	const rtlLanguages = ['ar', 'he'];
	const isRTL = $derived(rtlLanguages.includes(language));
</script>

<svelte:head>
	<title>{searchTitle}</title>
	<meta name="description" content={description} />
	<meta name="language" content="English" />
	<meta
		name="keywords"
		content="word count, pages calculator, document length, essay length, word counter, page estimator, academic writing, professional writing, words visualized, word count visual, word count example, word count preview"
	/>
	<meta property="og:title" content={searchTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta
		name="robots"
		content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
	/>
	<link rel="canonical" href="https://wordcountvisualizer.com" />
</svelte:head>

<Header {title} />
<div class="overlay-scrollbar">
	<main class="container mx-auto p-4">
		<div class="grid gap-6 lg:grid-cols-12" itemscope itemtype="https://schema.org/WebApplication">
			<!-- Controls Panel -->
			<aside class="space-y-6 lg:col-span-4" aria-label="Document configuration controls">
				{#if wordCount}
					<a
						href="/?words={wordCount}"
						class="flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-blue-600"
					>
						<ArrowLeft class="h-4 w-4" />
						Try a different word count
					</a>
				{:else}
					<Words bind:wordCountInput bind:useCustomText />
				{/if}
				<ContentConfig
					bind:useCustomText
					bind:customText
					bind:language
					bind:includePunctuation
					bind:averageSentenceLength
					bind:paragraphLength
				/>
				<TypographyConfig bind:fontFamily bind:fontSize bind:lineSpacing />
				<Statistics
					{displayText}
					{actualWordCount}
					{sentences}
					{paragraphs}
					{avgWordsPerSentence}
					{avgWordsPerParagraph}
				/>
			</aside>

			<!-- Preview Area -->
			<section class="lg:col-span-8" role="main" aria-label="Document preview">
				<DocumentPreview
					{displayText}
					{fontFamily}
					{fontSize}
					{lineSpacing}
					{isRTL}
					previewTitle={textPreviewTitle}
				/>
			</section>
		</div>
	</main>
</div>
