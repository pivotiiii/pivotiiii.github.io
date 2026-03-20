<script lang="ts">
  import ProjectCard from "./components/ProjectCard.svelte";
  import ogImage from "./assets_layout/og_image_main.png?format=webp&imagetools";

  const title = "pivotiiii - Projects";
  const description = "All projects and mods made by pivotiiii.";

  let {data} = $props();
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={__URL__} />
  <meta property="og:site_name" content="pivotiiii" />
  <meta property="og:description" content={description} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />
  <link rel="canonical" href={__URL__} />
</svelte:head>

<div>
  <h1>Projects</h1>
  {#each data.projects as project}
    <ProjectCard {project} />
  {/each}
</div>
