<script lang="ts">
	import {
		generateSampleText,
		countWords,
		type TextGenerationOptions
	} from '$lib/utils/textGeneration';
	import ContentConfig from '$lib/components/ContentConfig.svelte';
	import TypographyConfig from '$lib/components/TypographyConfig.svelte';
	import PageConfig from '$lib/components/PageConfig.svelte';
	import Statistics from '$lib/components/Statistics.svelte';
	import DocumentPreview from '$lib/components/DocumentPreview.svelte';

	let wordCountInput = $state(500);
	let customText = $state('');
	let useCustomText = $state(false);
	let fontSize = $state(12);
	let fontFamily = $state('Arial');
	let lineSpacing = $state(2.0);
	let margins = $state(1);
	let language = $state('lorem');
	let includePunctuation = $state(true);
	let averageSentenceLength = $state(12);
	let paragraphLength = $state(80);

	function getDisplayText(): string {
		if (useCustomText && customText.trim()) {
			return customText;
		}
		const options: TextGenerationOptions = {
			includePunctuation,
			averageSentenceLength,
			paragraphLength
		};
		return generateSampleText(wordCountInput, language, options);
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
</script>

<svelte:head>
	<title>Word Count Visualizer - See How Many Pages Your Words Fill</title>
	<meta
		name="description"
		content="Instantly visualize how many pages your words will fill. Adjust fonts, spacing, and margins to see exactly how your document will look. Free tool for students and professionals."
	/>
	<meta
		name="keywords"
		content="word count, pages calculator, document length, essay length, word counter, page estimator, academic writing, professional writing"
	/>
	<meta property="og:title" content="Word Count Visualizer - Free Document Length Calculator" />
	<meta
		property="og:description"
		content="See exactly how your words will look on paper. Perfect for students and professionals."
	/>
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Word Count Visualizer" />
	<meta
		name="twitter:description"
		content="Visualize document length with our free word count calculator."
	/>
	<link rel="canonical" href="https://wordcountvisualizer.com" />
</svelte:head>

<div class="grid gap-6 lg:grid-cols-12">
	<!-- Controls Panel -->
	<div class="space-y-6 lg:col-span-4">
		<ContentConfig
			bind:useCustomText
			bind:wordCountInput
			bind:customText
			bind:language
			bind:includePunctuation
			bind:averageSentenceLength
			bind:paragraphLength
		/>

		<TypographyConfig bind:fontFamily bind:fontSize bind:lineSpacing bind:margins />

		<PageConfig {displayText} />

		<Statistics {displayText} {actualWordCount} {sentences} {paragraphs} {avgWordsPerSentence} {avgWordsPerParagraph} />
	</div>

	<!-- Preview Area -->
	<DocumentPreview {displayText} {fontFamily} {fontSize} {lineSpacing} {margins} />
</div>
