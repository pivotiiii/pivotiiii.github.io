<script lang="ts">
  interface LevelsInputProps {
    description: string;
    levels: number[];
  }

  let {description, levels = $bindable<number[]>([])}: LevelsInputProps = $props();

  function handleLevelSelect(level: number) {
    if (levels.includes(level)) {
      levels = levels.filter((l) => l !== level);
    } else {
      levels = [...levels, level];
    }
  }

  function handleReset() {
    levels = [];
  }

  const possibleLevels = Array.from({length: 12}, (_, i) => i + 1);
</script>

<div class="xyz-input-container">
  <div class="buttons-container">
    {#each possibleLevels as level}
      <button
        class={"level-button" + (levels.includes(level) ? " selected" : "")}
        onclick={() => handleLevelSelect(level)}
      >
        {level}
      </button>
    {/each}
  </div>
  <small>
    <div class="level-button-description">{description}</div>
    {#if levels.length > 0}
      <button class="link-button" onclick={handleReset}>reset</button>
    {/if}
  </small>
</div>

<style>
  .xyz-input-container {
    --hor-margin: 4px;
    --margin-to-next-div: 16px;
  }

  .buttons-container {
    width: calc(100% + 4px);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: var(--pico-spacing);
    margin-left: calc(0 - var(--hor-margin));
    touch-action: manipulation;
  }

  .level-button {
    background-color: var(--pico-form-element-background-color);
    color: unset;
    min-width: 2.8rem;
    height: 50px;
    padding: 12px 12px;
    border-color: var(--pico-form-element-border-color);
    margin-bottom: 8px;
    margin-right: var(--hor-margin);
    word-break: keep-all;
  }

  .level-button.selected {
    box-shadow:
      var(--pico-button-hover-box-shadow, 0 0 0 rgba(0, 0, 0, 0)),
      0 0 0 var(--pico-outline-width) var(--pico-primary-focus);
  }

  @media (max-width: 770px) {
    .level-button {
      flex-basis: calc(100% / 7);
    }
  }

  .level-button:hover {
    /* border-color: var(--pico-primary-focus); */
    background-color: var(--pico-form-element-selected-background-color);
  }

  .level-button:active {
    background-color: var(--pico-form-element-active-background-color);
  }

  .level-button:focus:not(.selected) {
    box-shadow:
      var(--pico-button-hover-box-shadow, 0 0 0 rgba(0, 0, 0, 0)),
      0 0 0 var(--pico-outline-width) var(--pico-secondary-focus);
  }

  .level-button.selected:focus {
    box-shadow:
      var(--pico-button-hover-box-shadow, 0 0 0 rgba(0, 0, 0, 0)),
      0 0 0 calc(var(--pico-outline-width) * 1.5) var(--pico-primary-focus);
  }

  .buttons-container + small {
    color: var(--pico-muted-color);
    margin-top: -20px;
    margin-bottom: var(--pico-spacing);
    display: flex;
  }

  .buttons-container + small button.link-button {
    margin-left: auto;
    margin-right: 0px;
    padding-left: 15px;
  }

  @media (max-width: 416px) {
    .level-button-description {
      width: 270px;
    }
  }
</style>
