<script lang="ts">
  import Feedback from "./Feedback.svelte";
  import Guess from "./Guess.svelte";
  import {FeedbackType} from "./types";

  interface RowProps {
    numColors: number;
    numPositions: number;
    guess: number[];
    feedback: FeedbackType[];
    highlighted?: boolean;
    enabledGuess?: boolean;
    enabledFeedback?: boolean;
    onGuessChange?: (position: number, color: number) => void;
    onFeedbackChange?: (position: number, type: FeedbackType) => void;
    isSecret?: boolean;
  }
  let {
    numColors,
    numPositions,
    guess = $bindable<number[]>([0, 0, 0, 0]),
    feedback = $bindable<FeedbackType[]>([
      FeedbackType.Empty,
      FeedbackType.Empty,
      FeedbackType.Empty,
      FeedbackType.Empty
    ]),
    highlighted = false,
    enabledGuess = false,
    enabledFeedback = false,
    onGuessChange = () => {},
    onFeedbackChange = () => {},
    isSecret = false
  }: RowProps = $props();
</script>

<div class="row" class:highlighted class:hidden-feedback={isSecret}>
  <div><Feedback bind:feedback enabled={enabledFeedback} {onFeedbackChange} /></div>
  {#if isSecret}
    <div class="secret-text">Secret</div>
  {/if}
  <Guess {numColors} bind:guess enabled={enabledGuess} {onGuessChange} />
</div>

<style>
  .secret-text {
    font-size: 1.2em;
    font-weight: 400;
    color: var(--pico-h2-color) !important;
    margin-left: 15px;
    position: absolute;
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .hidden-feedback :first-child {
    visibility: hidden;
  }

  .row.highlighted {
    background-color: var(--pico-dropdown-hover-background-color);
    border-radius: 8px;
  }
</style>
