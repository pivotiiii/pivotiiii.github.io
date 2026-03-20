<script lang="ts">
  import TrashIcon from "./TrashIcon.svelte";
  import {onMount} from "svelte";
  import {browser} from "$app/environment";

  interface FeedbackPinProps {
    pinColor: number;
    numColors: number;
    onColorChange: (color: number) => void;
  }

  let {pinColor = $bindable<number>(0), numColors, onColorChange}: FeedbackPinProps = $props();

  let showMenu = $state(false);
  let containerRef: HTMLDivElement;
  // svelte-ignore state_referenced_locally
  const colors = Array.from({length: numColors + 1}, (_, i) => i);
  // svelte-ignore state_referenced_locally
  const radius = numColors * 5 + 5;

  function toggleMenu() {
    showMenu = !showMenu;
  }

  function selectColor(color: number) {
    pinColor = color;
    showMenu = false;
    onColorChange(color);
  }

  function getMenuItemPosition(index: number, total: number) {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return {x, y};
  }

  function handleClickOutside(event: MouseEvent) {
    if (containerRef && !containerRef.contains(event.target as Node)) {
      showMenu = false;
    }
  }

  if (browser) {
    onMount(() => {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    });
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="pin-container" bind:this={containerRef}>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div class={"guess_pin c" + pinColor} onclick={toggleMenu}></div>
  {#if showMenu}
    <div class="radial-menu">
      {#each colors as color, index}
        {@const pos = getMenuItemPosition(index, colors.length)}
        {#if color === 0}
          <button
            class="menu-item trash-icon"
            style="--x: {pos.x}px; --y: {pos.y}px"
            onclick={() => selectColor(color)}
            aria-label="Clear color"
          >
            <TrashIcon size="24px" viewBox="0 1 24 24" />
          </button>
        {:else}
          <button
            class={"menu-item c" + color}
            style="--x: {pos.x}px; --y: {pos.y}px"
            onclick={() => selectColor(color)}
            aria-label="Color {color}"
          ></button>
        {/if}
      {/each}
    </div>
  {/if}
</div>

<style>
  .pin-container {
    position: relative;
    width: 30px;
    height: 30px;
  }

  .guess_pin {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    border-color: black;
    border-width: 2px;
    border-style: solid;
  }

  .radial-menu {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 3;
  }

  .menu-item {
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid black;
    cursor: pointer;
    padding: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) translate(var(--x), var(--y));
    pointer-events: all;
    transition: transform 0.1s ease;
  }

  .menu-item.trash-icon {
    border: unset;
    background-color: transparent;
  }

  .menu-item:hover {
    transform: translate(-50%, -50%) translate(var(--x), var(--y)) scale(1.2);
  }

  .c0 {
    background-color: var(--pico-form-element-selected-background-color);
  }

  .c1 {
    background-color: white;
  }

  .c2 {
    background-color: yellow;
  }

  .c3 {
    background-color: orange;
  }

  .c4 {
    background-color: red;
  }

  .c5 {
    background-color: palevioletred;
  }

  .c6 {
    background-color: purple;
  }

  .c7 {
    background-color: aqua;
  }

  .c8 {
    background-color: mediumseagreen;
  }
</style>
