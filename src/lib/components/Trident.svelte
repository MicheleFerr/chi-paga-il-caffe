<script lang="ts">
	let { size = 80 }: { size?: number } = $props();
</script>

<svg
	width={size}
	height={size * 1.2}
	viewBox="0 0 100 120"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	class="trident"
>
	<!-- Sfondo nero arrotondato -->
	<rect x="5" y="0" width="90" height="115" rx="8" fill="#1a1a1a"/>

	<!-- Punta sinistra -->
	<path
		d="M22 20 L22 75 L35 75 L35 85 L35 75 L22 75"
		stroke="#d4a574"
		stroke-width="3"
		fill="none"
	/>
	<path
		d="M24 22 L24 73 L33 73 L33 22 Z"
		fill="#b33a3a"
	/>
	<polygon points="28.5,8 20,25 37,25" fill="#b33a3a" stroke="#d4a574" stroke-width="2"/>

	<!-- Punta centrale -->
	<path
		d="M43 20 L43 85 L57 85 L57 20"
		stroke="#d4a574"
		stroke-width="3"
		fill="none"
	/>
	<path
		d="M45 22 L45 83 L55 83 L55 22 Z"
		fill="#b33a3a"
	/>
	<polygon points="50,8 41,25 59,25" fill="#b33a3a" stroke="#d4a574" stroke-width="2"/>

	<!-- Punta destra -->
	<path
		d="M78 20 L78 75 L65 75 L65 85 L65 75 L78 75"
		stroke="#d4a574"
		stroke-width="3"
		fill="none"
	/>
	<path
		d="M76 22 L76 73 L67 73 L67 22 Z"
		fill="#b33a3a"
	/>
	<polygon points="71.5,8 63,25 80,25" fill="#b33a3a" stroke="#d4a574" stroke-width="2"/>

	<!-- Base connettore -->
	<path
		d="M35 75 L35 85 L43 85 L43 100 L57 100 L57 85 L65 85 L65 75"
		stroke="#d4a574"
		stroke-width="3"
		fill="none"
	/>
	<path
		d="M37 77 L37 83 L45 83 L45 98 L55 98 L55 83 L63 83 L63 77 Z"
		fill="#b33a3a"
	/>
</svg>

<style>
	.trident {
		filter: drop-shadow(0 2px 8px rgba(212, 165, 116, 0.4));
	}
</style>
