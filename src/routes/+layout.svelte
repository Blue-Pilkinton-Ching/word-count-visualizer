<script lang="ts">
	import '../app.css';

	import './firebase';

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: 'Word Count Visualizer',
		url: 'https://wordcountvisualizer.com',
		applicationCategory: 'UtilitiesApplication',
		operatingSystem: 'All',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD'
		}
	};

	let { children } = $props();
</script>

<svelte:head>
	<!-- eslint-disable-next-line no-useless-escape eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd, null, 2)}<\/script>`}
</svelte:head>

<div class="min-h-screen bg-gray-50" lang="en" dir="ltr">
	{@render children()}
</div>
