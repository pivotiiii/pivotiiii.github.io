<script lang="ts">
  import Codebreaker from "./components/Codebreaker.svelte";

  const title = "Codebreaker - Multiplayer";
  const description = "Play the classic board game Codebreaker with friends online!";
  const urlRoute = "/codebreaker";
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <!-- <meta property="og:image" content={ogImage} /> -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={__URL__ + urlRoute} />
  <meta property="og:site_name" content="pivotiiii" />
  <meta property="og:description" content={description} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <!-- <meta name="twitter:image" content={ogImage} /> -->
  <link rel="canonical" href={__URL__ + urlRoute} />
</svelte:head>

<div>
  <h1>Codebreaker - Multiplayer</h1>
  <Codebreaker />
</div>
