<script lang="ts">
	let { size = 80 }: { size?: number } = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 100 120"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	class="trident"
>
	<!-- Tridente con bordo dorato -->
	<path
		d="M50 5 L50 85 M50 85 L35 85 L35 115 L65 115 L65 85 L50 85
		   M20 5 L20 70 L35 70 L35 85
		   M80 5 L80 70 L65 70 L65 85
		   M50 5 L45 0 L50 5 L55 0 L50 5
		   M20 5 L15 0 L20 5 L25 0 L20 5
		   M80 5 L75 0 L80 5 L85 0 L80 5"
		stroke="#d4a574"
		stroke-width="3"
		fill="none"
	/>
	<!-- Riempimento rosso -->
	<path
		d="M47 8 L47 82 L38 82 L38 112 L62 112 L62 82 L53 82 L53 8 Z"
		fill="#c94040"
	/>
	<path
		d="M17 8 L17 67 L32 67 L32 82 L38 82 L38 67 L23 67 L23 8 Z"
		fill="#c94040"
	/>
	<path
		d="M77 8 L77 67 L62 67 L62 82 L68 82 L68 67 L83 67 L83 8 Z"
		fill="#c94040"
	/>
	<!-- Punte -->
	<polygon points="50,0 45,15 55,15" fill="#c94040" stroke="#d4a574" stroke-width="2"/>
	<polygon points="20,0 15,15 25,15" fill="#c94040" stroke="#d4a574" stroke-width="2"/>
	<polygon points="80,0 75,15 85,15" fill="#c94040" stroke="#d4a574" stroke-width="2"/>
</svg>

<style>
	.trident {
		filter: drop-shadow(0 2px 8px rgba(212, 165, 116, 0.3));
	}
</style>
