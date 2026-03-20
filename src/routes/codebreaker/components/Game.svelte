<script lang="ts">
  import Row from "./Row.svelte";
  import {Role, type Guess, type Player, FeedbackType, type GameState, GameStatus} from "./types";

  interface GameProps {
    playerName: Player;
    gameState: GameState;
    updateGuess: (position: number, color: number) => void;
    updateFeedback: (position: number, type: FeedbackType) => void;
  }

  let {playerName, gameState = $bindable<GameState>(), updateGuess, updateFeedback}: GameProps = $props();

  // just to make the compiler happy about the bind:guess and bind:feedback in the empty rows
  let emptyGuessState = $derived(Array.from({length: gameState.numPositions}, () => 0));
  let emptyFeedbackState = $derived(Array.from({length: gameState.numPositions}, () => FeedbackType.Empty));
</script>

{#if playerName === gameState.codeMaker}
  <Row
    numColors={gameState.numColors}
    numPositions={gameState.numPositions}
    bind:guess={gameState.secret}
    bind:feedback={emptyFeedbackState}
    highlighted={!gameState.secretIsSet}
    enabledGuess={!gameState.secretIsSet}
    enabledFeedback={false}
    isSecret={true}
  />
{:else if playerName === gameState.codeBreaker && !gameState.secretIsSet}
  <div class="secret-text">{gameState.codeMaker} is setting the secret code...</div>
{/if}

{#each gameState.guessHistory as _, index}
  <Row
    numColors={gameState.numColors}
    numPositions={gameState.numPositions}
    bind:guess={gameState.guessHistory[index]}
    bind:feedback={gameState.feedbackHistory[index]}
  />
{/each}

{#if gameState.status === GameStatus.Playing}
  <Row
    numColors={gameState.numColors}
    numPositions={gameState.numPositions}
    bind:guess={gameState.currentGuess}
    bind:feedback={gameState.currentFeedback}
    highlighted={gameState.secretIsSet && gameState.activePlayer === playerName}
    enabledGuess={gameState.activePlayer === gameState.codeBreaker && playerName === gameState.codeBreaker}
    enabledFeedback={gameState.activePlayer === gameState.codeMaker && playerName === gameState.codeMaker}
    onGuessChange={updateGuess}
    onFeedbackChange={updateFeedback}
  />
{/if}

{#each Array.from({length: gameState.maxAttempts - gameState.guessHistory.length - (gameState.status === GameStatus.Playing ? 1 : 0)}, (_, i) => i) as i}
  <Row
    numColors={gameState.numColors}
    numPositions={gameState.numPositions}
    bind:guess={emptyGuessState}
    bind:feedback={emptyFeedbackState}
  />
{/each}

<style>
  .secret-text {
    display: flex;
    justify-content: center;
    font-size: 1.2em;
    font-weight: 400;
    color: var(--pico-h2-color) !important;
  }
</style>
