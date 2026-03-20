<script lang="ts">
  let {show = true, size = 32, viewBox = "-8 0 60 50"} = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  {viewBox}
  class={show ? "icon" : "icon hide"}
>
  <path
    d="M35.477 2.979A1.5 1.5 0 0 0 34 4.5V6h-1.5a1.5 1.5 0 1 0 0 3H34v1.5a1.5 1.5 0 1 0 3 0V9h1.5a1.5 1.5 0 1 0 0-3H37V4.5a1.5 1.5 0 0 0-1.523-1.521M22.5 6C11.748 6 3 14.748 3 25.5S11.748 45 22.5 45c7 0 13.498-3.803 16.959-9.922a1.5 1.5 0 0 0-1.121-2.226C29.595 31.772 23 24.313 23 15.5c0-2.533.548-5 1.629-7.33a1.502 1.502 0 0 0-1.3-2.129l-.253-.016A9 9 0 0 0 22.5 6m17.977 9.979A1.5 1.5 0 0 0 39 17.5V19h-1.5a1.5 1.5 0 1 0 0 3H39v1.5a1.5 1.5 0 1 0 3 0V22h1.5a1.5 1.5 0 1 0 0-3H42v-1.5a1.5 1.5 0 0 0-1.523-1.521"
  />
</svg>

<style>
  .icon > * {
    fill: var(--pico-h4-color);
    transition: fill var(--pico-transition);
    -webkit-transition: fill var(--pico-transition);
    -ms-transition: fill var(--pico-transition);
  }

  .icon:hover > * {
    fill: var(--pico-primary);
  }

  :root[data-theme="light"] .icon.hide {
    display: none;
  }
</style>
