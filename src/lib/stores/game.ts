import { writable, derived } from 'svelte/store';

export interface GameState {
	secretNumber: number;
	min: number;
	max: number;
	turns: number;
	gameOver: boolean;
	lastGuess: number | null;
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export const difficulties: Record<Difficulty, { label: string; range: number; description: string }> = {
	easy: { label: 'Facile', range: 100, description: '0 - 100' },
	medium: { label: 'Medio', range: 1000, description: '0 - 1,000' },
	hard: { label: 'Difficile', range: 10000, description: '0 - 10,000' }
};

function createGameStore() {
	const initialState: GameState = {
		secretNumber: 0,
		min: 0,
		max: 1000,
		turns: 0,
		gameOver: false,
		lastGuess: null
	};

	const { subscribe, set, update } = writable<GameState>(initialState);

	return {
		subscribe,

		startGame: (difficulty: Difficulty) => {
			const range = difficulties[difficulty].range;
			const secret = Math.floor(Math.random() * (range - 1)) + 1; // 1 to range-1
			set({
				secretNumber: secret,
				min: 0,
				max: range,
				turns: 0,
				gameOver: false,
				lastGuess: null
			});
		},

		makeGuess: (guess: number): 'hit' | 'higher' | 'lower' => {
			let result: 'hit' | 'higher' | 'lower' = 'higher';

			update(state => {
				if (guess === state.secretNumber) {
					result = 'hit';
					return { ...state, gameOver: true, turns: state.turns + 1, lastGuess: guess };
				}

				if (guess < state.secretNumber) {
					result = 'higher';
					return { ...state, min: guess, turns: state.turns + 1, lastGuess: guess };
				} else {
					result = 'lower';
					return { ...state, max: guess, turns: state.turns + 1, lastGuess: guess };
				}
			});

			return result;
		},

		reset: () => set(initialState)
	};
}

export const gameStore = createGameStore();

export const loseMessages = [
	"BOOM! Il caffè ti aspetta!",
	"Hai vinto... il conto!",
	"La fortuna oggi non era con te!",
	"Congratulazioni! Offri tu!",
	"Il barista ti sta già guardando...",
	"Tocca a te pagare!",
	"Il caffè non si paga da solo!",
	"Indovinato! Ora paga!"
];

export function getRandomLoseMessage(): string {
	return loseMessages[Math.floor(Math.random() * loseMessages.length)];
}
