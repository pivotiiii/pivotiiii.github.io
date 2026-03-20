<script lang="ts">
  let {show = true, size = 32, viewBox = "0 0 256 256"} = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  {viewBox}
  class={show ? "icon" : "icon hide"}
>
  <path
    d="M36 23c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 5.82-13 13-13m4-12v4a4 4 0 0 1-8 0v-4a4 4 0 0 1 8 0m16.506 10.151-2.828 2.828a4 4 0 0 1-5.657-5.657l2.828-2.828a4 4 0 0 1 5.657 5.657M61 40h-4a4 4 0 0 1 0-8h4a4 4 0 0 1 0 8M50.849 56.506l-2.828-2.828a4 4 0 0 1 5.657-5.657l2.828 2.828a4 4 0 0 1-5.657 5.657M32 61v-4a4 4 0 0 1 8 0v4a4 4 0 0 1-8 0M15.494 50.849l2.828-2.828a4 4 0 0 1 5.657 5.657l-2.828 2.828a4 4 0 0 1-5.657-5.657M11 32h4a4 4 0 0 1 0 8h-4a4 4 0 0 1 0-8m10.151-16.506 2.828 2.828a4 4 0 0 1-5.657 5.657l-2.828-2.828a4 4 0 0 1 5.657-5.657"
    transform="scale(3.55556)"
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

  :root[data-theme="dark"] .icon.hide {
    display: none;
  }
</style>
