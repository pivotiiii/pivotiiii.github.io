<script lang="ts">
  import FeedbackPin from "./FeedbackPin.svelte";
  import {FeedbackType} from "./types";

  interface FeedbackProps {
    feedback: FeedbackType[];
    enabled: boolean;
    onFeedbackChange: (position: number, type: FeedbackType) => void;
  }
  let {
    feedback = $bindable<FeedbackType[]>([
      FeedbackType.Empty,
      FeedbackType.Empty,
      FeedbackType.Empty,
      FeedbackType.Empty
    ]),
    enabled,
    onFeedbackChange
  }: FeedbackProps = $props();

  // svelte-ignore non_reactive_update
  let gridWidth = 2;
  if (feedback.length > 4) {
    gridWidth = 3;
  }
</script>

<div class="container" class:disabled={!enabled} style="grid-template-columns: repeat({gridWidth}, auto);">
  {#each feedback as _, index}
    <!-- svelte-ignore binding_property_non_reactive -->
    <FeedbackPin bind:type={feedback[index]} onTypeChange={(type) => onFeedbackChange(index, type)} />
  {/each}
</div>

<style>
  .container {
    display: grid;
    row-gap: 8px;
    column-gap: 8px;
    width: auto;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .disabled {
    pointer-events: none;
  }
</style>
