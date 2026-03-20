<script lang="ts">
  import DarkModeIcon from "$lib/icons/DarkModeIcon.svelte";
  import LightModeIcon from "$lib/icons/LightModeIcon.svelte";
  import SystemIcon from "$lib/icons/SystemIcon.svelte";
  let {theme = $bindable("system")} = $props();
  let isOpen = $state(false);

  const handleToggle = (event: Event) => {
    isOpen = (event.target as HTMLDetailsElement).open;
  };

  const handleSelect = (themeSelection: string) => {
    isOpen = false;
    theme = themeSelection;
  };
</script>

<details class="dropdown theme-dropdown" ontoggle={handleToggle} open={isOpen}>
  <summary>
    <LightModeIcon show={theme === "light"} />
    <DarkModeIcon show={theme === "dark"} />
  </summary>
  <ul dir="ltr">
    <li>
      <button onclick={() => handleSelect("light")} class="always-display" aria-current={theme === "light"}>
        <LightModeIcon /> Light
      </button>
    </li>
    <li>
      <button onclick={() => handleSelect("dark")} class="always-display" aria-current={theme === "dark"}>
        <DarkModeIcon /> Dark
      </button>
    </li>
    <li>
      <button onclick={() => handleSelect("system")} aria-current={theme === "system"}>
        <SystemIcon /> Device
      </button>
    </li>
  </ul>
</details>

<style>
  .dropdown.theme-dropdown > *::after {
    content: unset;
  }

  .dropdown.theme-dropdown summary {
    box-shadow: unset !important;
    background-color: unset !important;
    padding-right: 0px !important;
    margin-top: -4px;
    border: unset !important;
  }

  .dropdown.theme-dropdown ul > li {
    padding: 0px;
    margin: 0px;
  }

  .dropdown > ul > * > * {
    transition: background-color 0s;
  }

  .dropdown.theme-dropdown button {
    all: unset;
    padding: 4px 12px 4px 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
  }

  .dropdown.theme-dropdown button:hover {
    transition: background-color var(--pico-transition);
    background-color: var(--pico-dropdown-hover-background-color);
  }

  .dropdown.theme-dropdown button:hover > :global(.icon > *) {
    fill: var(--pico-primary);
  }

  .dropdown.theme-dropdown button[aria-current="true"] {
    color: var(--pico-dropdown-color);
    background-color: var(--pico-dropdown-hover-background-color);
  }
</style>
