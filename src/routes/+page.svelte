<script lang="ts">
	import { goto } from '$app/navigation';

	function startGame() {
		goto('/difficulty');
	}
</script>

<div class="container">
	<div class="logo">☕</div>
	<h1 class="title">Chi Paga il Caffè?</h1>
	<p class="subtitle">Indovina il numero... e paghi tu!</p>

	<button class="btn btn-primary play-btn" onclick={startGame}>
		GIOCA
	</button>

	<div class="rules">
		<p>A turno, scegliete un numero.</p>
		<p>Chi indovina quello segreto... offre!</p>
	</div>
</div>

<style>
	.logo {
		font-size: 5rem;
		margin-bottom: 1rem;
		animation: float 3s ease-in-out infinite;
	}

	@keyframes float {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-10px); }
	}

	.play-btn {
		margin-top: 2rem;
		padding: 1.25rem 3rem;
		font-size: 1.5rem;
		letter-spacing: 0.1em;
	}

	.rules {
		margin-top: 3rem;
		color: var(--text-secondary);
		font-size: 0.9rem;
		line-height: 1.8;
	}
</style>
