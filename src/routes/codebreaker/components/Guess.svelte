<script lang="ts">
  import GuessPin from "./GuessPin.svelte";

  interface GuessProps {
    guess: number[];
    enabled: boolean;
    onGuessChange: (position: number, color: number) => void;
    numColors: number;
  }
  let {guess = $bindable<number[]>([0, 0, 0, 0]), enabled, onGuessChange, numColors}: GuessProps = $props();
</script>

<div class="guess_container" class:disabled={!enabled}>
  {#each guess as _, index}
    <!-- svelte-ignore binding_property_non_reactive -->
    <GuessPin
      bind:pinColor={guess[index]}
      {numColors}
      onColorChange={(color) => onGuessChange(index, color)}
    />
  {/each}
</div>

<style>
  .guess_container {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }

  .disabled {
    pointer-events: none;
  }
</style>
