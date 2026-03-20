<script lang="ts">
  import UpDownButtons from "./UpDownButtons.svelte";

  interface TotalCardsInputProps {
    totalCards: number;
    onEnter: Function;
    invalidTotalCardsInput: boolean;
  }

  let {
    totalCards = $bindable(0),
    onEnter = () => {},
    invalidTotalCardsInput = $bindable(false)
  }: TotalCardsInputProps = $props();

  const minCards = 1;
  const maxCards = 142;
  const descriptionDefault = "Total cards on board and in hand.";
  const descriptionError = "Must be a number between " + minCards + " and " + maxCards + ".";

  let totalCardsInput = $state(isNaN(totalCards) ? "" : totalCards.toString());

  function validateInput(input: string) {
    const cleanInput: string = input.replace(/\D/g, "");
    totalCardsInput = cleanInput;
    const val: number = parseInt(cleanInput);
    if (val < minCards || val > maxCards || cleanInput.length === 0) {
      invalidTotalCardsInput = true;
    } else {
      invalidTotalCardsInput = false;
      totalCards = val;
    }
  }
</script>

<div>
  <div style="display: flex; align-items: start;">
    <input
      type="text"
      inputmode="numeric"
      placeholder={descriptionDefault}
      autocomplete="off"
      maxlength="12"
      value={totalCardsInput}
      aria-invalid={invalidTotalCardsInput}
      onkeydown={(e) => {
        if (e.key.length === 1 && !/[0-9]/.test(e.key) && !e.ctrlKey && !e.metaKey) e.preventDefault();
      }}
      onpaste={(e) => {
        e.preventDefault();
        const text = e.currentTarget.value + (e.clipboardData?.getData("text") ?? "");
        validateInput(text);
      }}
      oninput={(e) => validateInput(e.currentTarget.value)}
      onkeyup={(e) => (e.key === "Enter" ? onEnter() : "")}
    />
    <UpDownButtons change={1} bind:state={totalCardsInput} onchange={validateInput} />
  </div>
  <small>{invalidTotalCardsInput ? descriptionError : descriptionDefault}</small>
</div>

<style>
  small {
    position: relative;
    top: -15px;
    color: var(--pico-muted-color);
  }
</style>
