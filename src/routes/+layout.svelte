<script lang="ts">
	import '../app.css';
	import { pwaInfo } from 'virtual:pwa-info';
	import { onMount } from 'svelte';
	import InstallPrompt from '$lib/components/InstallPrompt.svelte';

	let { children } = $props();

	onMount(async () => {
		if (pwaInfo) {
			const { registerSW } = await import('virtual:pwa-register');
			registerSW({
				immediate: true,
				onRegistered(r: ServiceWorkerRegistration | undefined) {
					console.log('SW Registered');
				},
				onOfflineReady() {
					console.log('PWA ready for offline use');
				}
			});
		}
	});
</script>

<svelte:head>
	<title>Chi Paga il Caffè?</title>
	<meta name="description" content="Il gioco dove chi indovina paga il caffè!" />
</svelte:head>

{@render children()}
<InstallPrompt />
