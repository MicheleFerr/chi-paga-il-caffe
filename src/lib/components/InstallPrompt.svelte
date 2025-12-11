<script lang="ts">
	import { onMount } from 'svelte';

	let deferredPrompt: any = $state(null);
	let showPrompt = $state(false);
	let isInstalled = $state(false);

	onMount(() => {
		// Check if already installed
		if (window.matchMedia('(display-mode: standalone)').matches) {
			isInstalled = true;
			return;
		}

		// Listen for install prompt
		window.addEventListener('beforeinstallprompt', (e) => {
			e.preventDefault();
			deferredPrompt = e;
			showPrompt = true;
		});

		// Listen for successful install
		window.addEventListener('appinstalled', () => {
			showPrompt = false;
			isInstalled = true;
			deferredPrompt = null;
		});
	});

	async function handleInstall() {
		if (!deferredPrompt) return;

		deferredPrompt.prompt();
		const { outcome } = await deferredPrompt.userChoice;

		if (outcome === 'accepted') {
			showPrompt = false;
		}
		deferredPrompt = null;
	}

	function dismiss() {
		showPrompt = false;
	}
</script>

{#if showPrompt && !isInstalled}
	<div class="install-banner">
		<span class="install-text">Installa l'app per giocare offline!</span>
		<div class="install-actions">
			<button class="install-btn" onclick={handleInstall}>
				Installa
			</button>
			<button class="dismiss-btn" onclick={dismiss}>
				✕
			</button>
		</div>
	</div>
{/if}

<style>
	.install-banner {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: linear-gradient(135deg, var(--bg-card), var(--bg-secondary));
		padding: 1rem 1.25rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		border-top: 2px solid var(--accent);
		z-index: 1000;
		animation: slideUp 0.3s ease-out;
	}

	@keyframes slideUp {
		from {
			transform: translateY(100%);
		}
		to {
			transform: translateY(0);
		}
	}

	.install-text {
		font-size: 0.9rem;
		color: var(--text-primary);
	}

	.install-actions {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.install-btn {
		background: var(--accent);
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		font-weight: 600;
		font-size: 0.85rem;
		transition: transform 0.15s;
	}

	.install-btn:active {
		transform: scale(0.95);
	}

	.dismiss-btn {
		background: transparent;
		color: var(--text-secondary);
		padding: 0.5rem;
		font-size: 1rem;
	}

	.dismiss-btn:hover {
		color: var(--text-primary);
	}
</style>
