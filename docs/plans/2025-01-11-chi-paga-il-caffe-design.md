# Chi Paga il Caffè - Design Document

## Overview

PWA per un gioco da tavolo dove i giocatori, a turno, cercano di NON indovinare un numero segreto. Chi lo indovina paga il caffè!

## Decisioni di Design

- **Dispositivo:** Singolo dispositivo che passa di mano in mano
- **Numero segreto:** Generato casualmente dall'app
- **Range:** Preset rapidi (Facile, Medio, Difficile)
- **Feedback sconfitta:** Animazioni drammatiche + suoni + messaggi ironici
- **Stack:** SvelteKit + PWA

---

## Flusso del Gioco

### Schermate

```
[Home] → [Selezione Difficoltà] → [Gioco] → [Perdente!] → [Home]
```

### 1. Home Screen
- Nome del gioco: "Chi Paga il Caffè? ☕"
- Pulsante grande "GIOCA"
- Design minimale e accattivante

### 2. Selezione Difficoltà
- **Facile** (0-100) - ~7 turni max
- **Medio** (0-1000) - ~10 turni max
- **Difficile** (0-10000) - ~14 turni max

### 3. Schermata di Gioco
- Range attuale ben visibile: **"127 - 893"**
- Campo input per inserire il numero
- Pulsante "PROVA"
- Contatore turni

### 4. Schermata Perdente
- Animazione coriandoli
- Messaggio ironico random
- Suono drammatico
- Pulsante "Nuova Partita"

---

## Logica del Gioco

### Stato

```typescript
interface GameState {
  secretNumber: number;    // Numero segreto (random)
  min: number;             // Limite inferiore attuale
  max: number;             // Limite superiore attuale
  turns: number;           // Contatore turni
  gameOver: boolean;       // Partita finita?
}
```

### Algoritmo

1. **Inizio partita:**
   - Genera `secretNumber` random nel range scelto
   - Imposta `min = 0`, `max = rangeMax`

2. **Quando un giocatore inserisce N:**
   ```
   SE N === secretNumber:
       → GAME OVER! Il giocatore perde

   ALTRIMENTI SE N < secretNumber:
       → min = N (il range si alza)

   ALTRIMENTI SE N > secretNumber:
       → max = N (il range si abbassa)

   turns++
   ```

3. **Validazione input:**
   - Il numero deve essere > min E < max
   - Solo numeri interi

### Esempio (range 0-1000, segreto = 687)

| Turno | Range     | Guess | Risultato        |
|-------|-----------|-------|------------------|
| 1     | 0-1000    | 500   | Range → 500-1000 |
| 2     | 500-1000  | 750   | Range → 500-750  |
| 3     | 500-750   | 600   | Range → 600-750  |
| 4     | 600-750   | 687   | PERSO!           |

---

## Struttura Progetto

```
chi-paga-il-caffe/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── NumberInput.svelte
│   │   │   ├── RangeDisplay.svelte
│   │   │   ├── LoseScreen.svelte
│   │   │   └── Confetti.svelte
│   │   ├── stores/
│   │   │   └── game.ts
│   │   └── sounds/
│   │       └── lose.mp3
│   ├── routes/
│   │   ├── +page.svelte              # Home
│   │   ├── +layout.svelte
│   │   ├── difficulty/
│   │   │   └── +page.svelte
│   │   └── game/
│   │       └── +page.svelte
│   ├── app.html
│   └── app.css
├── static/
│   ├── manifest.json
│   ├── icon-192.png
│   └── icon-512.png
├── svelte.config.js
├── vite.config.ts
└── package.json
```

---

## UI/UX

### Stile Visivo
- **Tema:** Scuro con accenti arancione/giallo caffè
- **Font:** Sans-serif bold per i numeri
- **Range:** Numeri GRANDI (visibili da tutti al tavolo)

### Animazioni
- Transizione fly/fade quando il range cambia
- Shake su input invalido
- Scale sui pulsanti

### Schermata Perdente
1. Coriandoli CSS
2. Testo pulsante
3. Flash sfondo rosso/arancione
4. Vibrazione mobile
5. Suono drammatico

### Messaggi Ironici
```
- "BOOM! 💥 Il caffè ti aspetta!"
- "Hai vinto... il conto! ☕"
- "La fortuna oggi non era con te!"
- "Congratulazioni! Offri tu! 🎉"
- "Il barista ti sta già guardando..."
- "Tocca a te pagare! ☕💸"
```

### Responsive
- Mobile-first
- Bottoni grandi (touch-friendly)
- Input numerico con tastierino

---

## PWA

- Service Worker per funzionamento offline
- Manifest con icone e colori tema
- Installabile su home screen
