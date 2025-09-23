<script lang="ts">
	import { BarChart3 } from 'lucide-svelte';

	let { displayText, actualWordCount, sentences, paragraphs, avgWordsPerSentence } = $props<{
		displayText: string;
		actualWordCount: number;
		sentences: number;
		paragraphs: number;
		avgWordsPerSentence: number;
	}>();

	function getReadabilityScore(text: string): string {
		const sentenceCount = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
		const words = text
			.trim()
			.split(/\s+/)
			.filter((word) => word.length > 0).length;
		if (sentenceCount === 0) return 'N/A';
		const avgWordsPerSentence = words / sentenceCount;
		if (avgWordsPerSentence <= 15) return 'Easy';
		if (avgWordsPerSentence <= 20) return 'Moderate';
		return 'Complex';
	}
</script>

<div class="rounded-lg bg-white p-6 shadow-sm">
	<h3 class="mb-4 flex items-center text-lg font-semibold">
		<BarChart3 class="mr-2 h-5 w-5" />
		Statistics
	</h3>
	<div class="space-y-3">
		<div class="grid grid-cols-2 gap-4 text-sm">
			<div class="text-center">
				<div class="text-2xl font-bold text-blue-600">{actualWordCount.toLocaleString()}</div>
				<div class="text-xs text-gray-500">Words</div>
			</div>
			<div class="text-center">
				<div class="text-2xl font-bold text-green-600">{displayText.length.toLocaleString()}</div>
				<div class="text-xs text-gray-500">Characters</div>
			</div>
		</div>

		<div class="space-y-2 border-t pt-3 text-sm">
			<div class="flex justify-between">
				<span class="text-gray-700">Characters (no spaces):</span>
				<span class="font-medium text-gray-900"
					>{displayText.replace(/\s/g, '').length.toLocaleString()}</span
				>
			</div>
			<div class="flex justify-between">
				<span class="text-gray-700">Sentences:</span>
				<span class="font-medium text-gray-900">{sentences.toLocaleString()}</span>
			</div>
			<div class="flex justify-between">
				<span class="text-gray-700">Paragraphs:</span>
				<span class="font-medium text-gray-900">{paragraphs.toLocaleString()}</span>
			</div>
			<div class="flex justify-between">
				<span class="text-gray-700">Avg words/sentence:</span>
				<span class="font-medium text-gray-900">{avgWordsPerSentence}</span>
			</div>
			<div class="flex justify-between">
				<span class="text-gray-700">Reading Time:</span>
				<span class="font-medium text-gray-900">{Math.ceil(actualWordCount / 200)} min</span>
			</div>
			<div class="flex justify-between">
				<span class="text-gray-700">Readability:</span>
				<span class="font-medium text-gray-900">{getReadabilityScore(displayText)}</span>
			</div>
		</div>
	</div>
</div>
