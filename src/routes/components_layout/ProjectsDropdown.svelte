<script lang="ts">
  import {projects} from "../assets_layout/projects";
  import {page} from "$app/state";
  import ExternalLinkIcon from "$lib/icons/ExternalLinkIcon.svelte";

  let isOpen = $state(false);
  let wrapperEl: HTMLDivElement;
  let ulEl: HTMLUListElement;

  const handleToggle = (event: Event) => {
    isOpen = (event.target as HTMLDetailsElement).open;
    if (isOpen) {
      requestAnimationFrame(() => {
        const wrapperRight = wrapperEl.getBoundingClientRect().right;
        const ulWidth = ulEl.getBoundingClientRect().width;
        ulEl.style.left = `${wrapperRight - ulWidth - wrapperEl.getBoundingClientRect().left}px`;
      });
    }
  };
</script>

{#snippet externalIcon()}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    stroke-width="2.4"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <g fill="none" fill-rule="evenodd">
      <path d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5M15 3h6v6M10 14L20.2 3.8" />
    </g>
  </svg>
{/snippet}

<div class="dropdown-wrapper" bind:this={wrapperEl}>
  <details class="dropdown" ontoggle={handleToggle} open={isOpen}>
    <summary>Projects</summary>
    <ul bind:this={ulEl}>
      <li>
        <a href="/" onclick={() => (isOpen = false)} aria-current={page.url.pathname === "/"}>View all</a>
      </li>
      {#each projects as project}
        <li>
          {#if project.link.startsWith("http")}
            <a href={project.link} target="_blank">
              <ExternalLinkIcon size={18} view={32} />
              {project.shortname}
            </a>
          {:else}
            <a
              href={project.link}
              onclick={() => (isOpen = false)}
              aria-current={page.url.pathname === project.link}
            >
              {project.shortname}
            </a>
          {/if}
        </li>
      {/each}
    </ul>
  </details>
</div>

<style>
  .dropdown-wrapper {
    position: relative;
  }

  .dropdown > ul > * > * {
    transition: background-color 0s;
  }

  .dropdown > ul {
    left: -150px;
    right: 0;
    text-align: right;
  }
</style>
