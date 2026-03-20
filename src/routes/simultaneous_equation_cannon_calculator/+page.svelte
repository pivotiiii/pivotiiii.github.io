<script lang="ts">
  import SECC from "./components/SECC.svelte";
  import ogImage from "./assets/og_image_secc.png?format=webp&imagetools";

  const title = "Simultaneous Equation Cannons - Calculator";
  const description =
    "Calculate all possible combinations of extra deck monsters to activate the Yu-Gi-Oh! trap card Simultaneous Equation Cannons for a given game state.";
  const urlRoute = "/simultaneous_equation_cannon_calculator";
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={__URL__ + urlRoute} />
  <meta property="og:site_name" content="pivotiiii" />
  <meta property="og:description" content={description} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />
  <link rel="canonical" href={__URL__ + urlRoute} />
</svelte:head>

<div class="pink">
  <div>
    <h1>Simultaneous Equation Cannons - Calculator</h1>
  </div>
  <SECC />
</div>
