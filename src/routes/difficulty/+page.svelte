<script lang="ts">
	import { goto } from '$app/navigation';
	import { gameStore, difficulties, type Difficulty } from '$lib/stores/game';

	function selectDifficulty(diff: Difficulty) {
		gameStore.startGame(diff);
		goto('/game');
	}
</script>

<div class="container">
	<h1 class="title">Scegli Difficoltà</h1>
	<p class="subtitle">Più grande il range, più suspense!</p>

	<div class="difficulty-list">
		{#each Object.entries(difficulties) as [key, value]}
			<button
				class="btn-difficulty diff-{key}"
				onclick={() => selectDifficulty(key as Difficulty)}
			>
				<span class="diff-label">{value.label}</span>
				<span class="diff-range">{value.description}</span>
			</button>
		{/each}
	</div>

	<a href="/" class="back-link">← Indietro</a>
</div>

<style>
	.difficulty-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-top: 1.5rem;
		width: 100%;
		max-width: 300px;
	}

	.diff-label {
		display: block;
		font-size: 1.25rem;
		font-weight: 700;
		margin-bottom: 0.25rem;
	}

	.diff-range {
		display: block;
		font-size: 0.9rem;
		opacity: 0.8;
	}

	/* Facile - Bianco */
	.diff-easy .diff-label,
	.diff-easy .diff-range {
		color: white;
	}

	/* Medio - Bianco */
	.diff-medium .diff-label,
	.diff-medium .diff-range {
		color: white;
	}

	/* Difficile - Arancio */
	.diff-hard .diff-label,
	.diff-hard .diff-range {
		color: #ff9500;
	}

	/* Impossibile - Rosso */
	.diff-impossible .diff-label,
	.diff-impossible .diff-range {
		color: #ff3b30;
	}

	.back-link {
		margin-top: 2rem;
		color: var(--text-secondary);
		text-decoration: none;
		font-size: 0.9rem;
	}

	.back-link:hover {
		color: var(--accent);
	}
</style>
