<script lang="ts">
	import '../app.css';

	import './firebase';

	let { children } = $props();
</script>

<svelte:head>
	<script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Word Count Visualizer Tool",
      "url": "https://wordcountvisualizer.com",
    })}
	</script>
</svelte:head>

<div class="min-h-screen bg-gray-50" lang="en" dir="ltr">
	{@render children()}
</div>
