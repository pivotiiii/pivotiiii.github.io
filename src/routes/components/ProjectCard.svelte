<script lang="ts">
  import ExternalLinkIcon from "$lib/icons/ExternalLinkIcon.svelte";

  interface ProjectsProps {
    project: ProjectProperties & {fetchedDescription: string | Promise<string>};
  }
  let props: ProjectsProps = $props();

  const matches = $derived.by(() => {
    if (props.project.link != null) {
      return props.project.link.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    } else {
      return null;
    }
  });
</script>

<article>
  <h4>{props.project.name}</h4>
  <p>
    {#await props.project.fetchedDescription}
      <span aria-busy="true"></span>
    {:then description}
      {description}
    {/await}
  </p>
  {#if matches != null && matches.length > 1}
    <a href={props.project.link} target="_blank">
      <div role="button">
        {"View on " + matches[1] + " "}
        <ExternalLinkIcon size={20} />
      </div>
    </a>
  {:else}
    <a href={props.project.link}>
      <div role="button">Open</div>
    </a>
  {/if}
</article>

<style>
  a {
    text-decoration: none;
  }
</style>
