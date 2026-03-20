<script lang="ts">
  import {browser} from "$app/environment";
  interface ToggleComponentProps {
    description: string;
    state: boolean;
    localStorageKey?: string;
  }
  let {description, state = $bindable(), localStorageKey}: ToggleComponentProps = $props();

  function handleChange() {
    state = !state;
    if (browser && localStorageKey) {
      localStorage.setItem(localStorageKey, JSON.stringify(state));
    }
  }
</script>

<label>
  <input type="checkbox" role="switch" checked={state} onchange={handleChange} />
  {description}
</label>
