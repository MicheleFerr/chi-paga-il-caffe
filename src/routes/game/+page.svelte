<script lang="ts">
	import { goto } from '$app/navigation';
	import { gameStore, getRandomLoseMessage } from '$lib/stores/game';
	import Confetti from '$lib/components/Confetti.svelte';
	import { onMount } from 'svelte';

	let guess = $state('');
	let error = $state('');
	let shaking = $state(false);
	let showLose = $state(false);
	let loseMessage = $state('');

	// Redirect if no game started
	onMount(() => {
		const unsubscribe = gameStore.subscribe(state => {
			if (state.max === 1000 && state.min === 0 && state.turns === 0 && state.secretNumber === 0) {
				goto('/difficulty');
			}
		});
		return unsubscribe;
	});

	function handleSubmit(e: Event) {
		e.preventDefault();
		error = '';

		const num = parseInt(guess, 10);
		let state: typeof $gameStore;
		gameStore.subscribe(s => state = s)();

		// Validation
		if (isNaN(num)) {
			triggerError('Inserisci un numero valido');
			return;
		}

		if (num <= state.min || num >= state.max) {
			triggerError(`Il numero deve essere tra ${state.min} e ${state.max}`);
			return;
		}

		// Make the guess
		const result = gameStore.makeGuess(num);

		if (result === 'hit') {
			loseMessage = getRandomLoseMessage();
			showLose = true;
			vibrate();
		}

		guess = '';
	}

	function triggerError(msg: string) {
		error = msg;
		shaking = true;
		vibrate();
		setTimeout(() => shaking = false, 400);
	}

	function vibrate() {
		if ('vibrate' in navigator) {
			navigator.vibrate(200);
		}
	}

	function playAgain() {
		showLose = false;
		goto('/difficulty');
	}

	function goHome() {
		gameStore.reset();
		goto('/');
	}
</script>

{#if showLose}
	<Confetti />
	<div class="container lose-screen">
		<div class="lose-emoji">💥☕</div>
		<h1 class="lose-title pulse">{loseMessage}</h1>
		<p class="lose-subtitle">Il numero era: <strong>{$gameStore.secretNumber}</strong></p>
		<p class="lose-turns">Turni giocati: {$gameStore.turns}</p>

		<div class="lose-actions">
			<button class="btn btn-primary" onclick={playAgain}>
				Nuova Partita
			</button>
			<button class="btn btn-secondary" onclick={goHome}>
				Home
			</button>
		</div>
	</div>
{:else}
	<div class="container game-screen">
		<div class="turn-counter">Turno {$gameStore.turns + 1}</div>

		<div class="range-display fade-in">
			<span class="range-num">{$gameStore.min}</span>
			<span class="range-separator">—</span>
			<span class="range-num">{$gameStore.max}</span>
		</div>

		<p class="instruction">Scegli un numero in questo range</p>

		<form onsubmit={handleSubmit} class="guess-form">
			<input
				type="number"
				bind:value={guess}
				class="guess-input"
				class:shake={shaking}
				placeholder="???"
				inputmode="numeric"
				autocomplete="off"
			/>

			{#if error}
				<p class="error-msg">{error}</p>
			{/if}

			<button type="submit" class="btn btn-primary submit-btn">
				PROVA
			</button>
		</form>

		<a href="/" class="quit-link" onclick={goHome}>Abbandona</a>
	</div>
{/if}

<style>
	.game-screen {
		gap: 1rem;
	}

	.turn-counter {
		font-size: 0.9rem;
		color: var(--text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.range-display {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin: 1rem 0;
	}

	.range-num {
		font-size: 3rem;
		font-weight: 800;
		color: var(--accent);
	}

	.range-separator {
		font-size: 2rem;
		color: var(--text-secondary);
	}

	.instruction {
		color: var(--text-secondary);
		font-size: 0.9rem;
		margin-bottom: 1rem;
	}

	.guess-form {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		width: 100%;
		max-width: 280px;
	}

	.guess-input {
		width: 100%;
		padding: 1rem;
		font-size: 2rem;
		font-weight: 700;
		text-align: center;
		background: var(--bg-card);
		border: 2px solid var(--bg-secondary);
		border-radius: 1rem;
		color: var(--text-primary);
		transition: border-color 0.2s;
	}

	.guess-input:focus {
		border-color: var(--accent);
	}

	.guess-input::placeholder {
		color: var(--text-secondary);
		opacity: 0.5;
	}

	.error-msg {
		color: var(--accent);
		font-size: 0.85rem;
	}

	.submit-btn {
		width: 100%;
		margin-top: 0.5rem;
	}

	.quit-link {
		margin-top: 2rem;
		color: var(--text-secondary);
		text-decoration: none;
		font-size: 0.85rem;
	}

	/* Lose Screen */
	.lose-screen {
		background: radial-gradient(circle at center, var(--bg-secondary), var(--bg-primary));
	}

	.lose-emoji {
		font-size: 4rem;
		margin-bottom: 1rem;
	}

	.lose-title {
		font-size: 1.75rem;
		font-weight: 800;
		color: var(--accent);
		margin-bottom: 1rem;
	}

	.lose-subtitle {
		font-size: 1.25rem;
		margin-bottom: 0.5rem;
	}

	.lose-subtitle strong {
		color: var(--coffee);
		font-size: 1.5rem;
	}

	.lose-turns {
		color: var(--text-secondary);
		font-size: 0.9rem;
		margin-bottom: 2rem;
	}

	.lose-actions {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		width: 100%;
		max-width: 250px;
	}
</style>
