<script lang="ts">
  import {page} from "$app/state";
</script>

<svelte:head>
  <title>{page.status} - pivotiiii</title>
</svelte:head>

<div style="display: flex; align-items: start; justify-content: center; margin-top: 3vh;">
  <article style="width: 100%; text-align: center;">
    <h2>{page.status}</h2>
    <h4>{page.error?.message}</h4>
  </article>
</div>
