<script lang="ts">
	import { onMount } from 'svelte';

	const colors = ['#e94560', '#ff6b6b', '#4ade80', '#fbbf24', '#60a5fa', '#d4a574'];
	const confettiCount = 50;

	interface ConfettiPiece {
		id: number;
		left: number;
		delay: number;
		duration: number;
		color: string;
		size: number;
	}

	let confetti = $state<ConfettiPiece[]>([]);

	onMount(() => {
		confetti = Array.from({ length: confettiCount }, (_, i) => ({
			id: i,
			left: Math.random() * 100,
			delay: Math.random() * 0.5,
			duration: 2 + Math.random() * 2,
			color: colors[Math.floor(Math.random() * colors.length)],
			size: 8 + Math.random() * 8
		}));
	});
</script>

<div class="confetti-container">
	{#each confetti as piece (piece.id)}
		<div
			class="confetti-piece"
			style="
				left: {piece.left}%;
				animation-delay: {piece.delay}s;
				animation-duration: {piece.duration}s;
				background-color: {piece.color};
				width: {piece.size}px;
				height: {piece.size}px;
			"
		></div>
	{/each}
</div>

<style>
	.confetti-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		overflow: hidden;
		z-index: 100;
	}

	.confetti-piece {
		position: absolute;
		top: -20px;
		border-radius: 2px;
		animation: confetti-fall linear forwards;
	}

	@keyframes confetti-fall {
		0% {
			transform: translateY(-100vh) rotate(0deg);
			opacity: 1;
		}
		100% {
			transform: translateY(100vh) rotate(720deg);
			opacity: 0;
		}
	}
</style>
