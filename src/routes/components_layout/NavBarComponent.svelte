<script lang="ts">
  import userIcon from "../assets_layout/user.png?w=90&format=webp&imagetools";
  import ProjectsDropdown from "./ProjectsDropdown.svelte";
  import ThemeDropdown from "./ThemeDropdown.svelte";
  import GithubIcon from "$lib/icons/GithubIcon.svelte";

  let {theme = $bindable("system")} = $props();
</script>

<div class="nav-container">
  <nav>
    <ul class="home-link">
      <li>
        <a href="/" class="contrast">
          <strong>pivotiiii</strong>
        </a>
      </li>
      <li>
        <a href="/">
          <img src={userIcon} alt="user icon" width="30" height="30" class="user-icon" />
        </a>
      </li>
    </ul>
    <ul>
      <li><ThemeDropdown bind:theme /></li>
      <li>
        <a href="https://github.com/pivotiiii" title="pivotiiii on Github">
          <GithubIcon />
        </a>
      </li>
      <li><ProjectsDropdown /></li>
    </ul>
  </nav>
  <hr />
</div>

<style>
  @media (min-width: 0px) {
    nav > ul > li {
      padding: 0px 8px;
    }
  }
  @media (min-width: 768px) {
    nav > ul > li {
      padding: 16px 8px;
    }
  }

  .nav-container {
    min-height: 5vh;
  }

  .home-link:hover > li > * {
    text-decoration: underline;
  }

  /* .home-link:hover .user-icon {
    outline: 2px solid var(--pico-primary) !important;
} */

  .user-icon {
    border-radius: 50%;
  }

  :global([data-theme="light"]) .user-icon {
    outline: 1px solid var(--pico-h4-color);
  }
</style>
