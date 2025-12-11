import { writable, derived } from 'svelte/store';

// Genera numero random crittograficamente sicuro
function secureRandom(min: number, max: number): number {
	const range = max - min;
	const array = new Uint32Array(1);
	crypto.getRandomValues(array);
	return min + (array[0] % range);
}

export interface GameState {
	secretNumber: number;
	min: number;
	max: number;
	turns: number;
	gameOver: boolean;
	lastGuess: number | null;
	difficulty: Difficulty | null;
}

export type Difficulty = 'easy' | 'medium' | 'hard' | 'impossible';

export const difficulties: Record<Difficulty, { label: string; range: number; description: string }> = {
	easy: { label: 'Facile', range: 100, description: '100' },
	medium: { label: 'Medio', range: 1000, description: '1.000' },
	hard: { label: 'Difficile', range: 10000, description: '10.000' },
	impossible: { label: 'Impossibile', range: 100000, description: '100.000' }
};

function createGameStore() {
	const initialState: GameState = {
		secretNumber: 0,
		min: 0,
		max: 1000,
		turns: 0,
		gameOver: false,
		lastGuess: null,
		difficulty: null
	};

	const { subscribe, set, update } = writable<GameState>(initialState);

	return {
		subscribe,

		startGame: (difficulty: Difficulty) => {
			const range = difficulties[difficulty].range;
			const secret = secureRandom(1, range); // 1 to range-1, crittograficamente sicuro
			set({
				secretNumber: secret,
				min: 0,
				max: range,
				turns: 0,
				gameOver: false,
				lastGuess: null,
				difficulty
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
