<script lang="ts">
  import "@picocss/pico/css/pico.cyan.min.css";
  import "../css/pico.colors.css";
  import "../css/pico.overwrites.css";
  import "../css/custom.css";

  import favicon from "$lib/assets/favicon.ico";
  import {browser} from "$app/environment";
  import {page} from "$app/state";
  import ParticlesComponent from "./components_layout/ParticlesComponent.svelte";
  import FooterBarComponent from "./components_layout/FooterBarComponent.svelte";
  import NavBarComponent from "./components_layout/NavBarComponent.svelte";

  import {onMount} from "svelte";

  let {children} = $props();

  const routeColors: {[key: string]: string} = {
    "/": "cyan",
    "/simultaneous_equation_cannon_calculator": "pink"
  };

  let defaultTheme = "system";
  if (browser) {
    defaultTheme = localStorage.getItem("theme") || defaultTheme;
  }

  let color = $derived(routeColors[page.url.pathname] || "cyan");
  let theme = $state(defaultTheme);
  let isDarkMode = $state(false);

  onMount(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    isDarkMode = media.matches;
    const listener = (e: MediaQueryListEvent) => (isDarkMode = e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  });

  $effect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "system") {
      document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div style="min-height: 100vh; padding-block-start: 16px; padding-block-end: 16px;" class={color}>
  <NavBarComponent bind:theme />
  <ParticlesComponent {color} />
  {@render children()}
  <FooterBarComponent />
</div>
