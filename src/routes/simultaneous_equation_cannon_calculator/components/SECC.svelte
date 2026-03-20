<script lang="ts">
  import type {Combination} from "./SECC";
  import {getAllCombinations} from "./SECC";
  import {browser} from "$app/environment";
  import LevelsInput from "./LevelsInput.svelte";
  import TotalCardsInput from "./TotalCardsInput.svelte";
  import Toggle from "./Toggle.svelte";
  import ResultsTable from "./ResultsTable.svelte";

  const showRelativeValuesLsKey = "showRelVals";
  const showRelativeValuesDefault = browser
    ? JSON.parse(localStorage.getItem(showRelativeValuesLsKey) || "false")
    : false;

  let tableDivRef = $state<HTMLDivElement | null>(null);
  let minTableHeight = $state(0);

  let totalCards = $state(NaN);
  let invalidTotalCardsInput = $state(null as unknown as boolean);
  let monsterLevels = $state([] as number[]);
  let xyzRanks = $state([] as number[]);
  let fusionLevels = $state([] as number[]);

  let showRelativeValues = $state(showRelativeValuesDefault);
  let showResults = $state(false);
  let showCardText = $state(false);

  $effect(() => {
    if (showTable && tableDivRef) {
      minTableHeight = tableDivRef.offsetHeight;
    } else {
      minTableHeight = 0;
    }
  });

  function onCalculateClicked() {
    if (showResults === false) {
      if (invalidTotalCardsInput === false && monsterLevels.length > 0) {
        setTimeout(() => tableDivRef?.scrollIntoView({behavior: "smooth", block: "end"}), 50);
        showResults = true;
      } else {
        if (monsterLevels.length > 0) {
          invalidTotalCardsInput = true;
        }
      }
    }
  }

  function filterFunc(c: Combination) {
    return (
      (xyzRanks.length === 0 || xyzRanks.includes(c.xyz)) &&
      (fusionLevels.length === 0 || fusionLevels.includes(c.fusion))
    );
  }

  let results = $derived.by(() => {
    if (showResults) {
      return getAllCombinations(totalCards, monsterLevels);
    }
    return [[], []];
  });

  let validCombinations = $derived(results[0].filter((c) => filterFunc(c)));
  let potentialCombinations = $derived(results[1].filter((c) => filterFunc(c)));

  let showTable = $derived(showResults && (validCombinations.length > 0 || potentialCombinations.length > 0));
</script>

<article>
  <h4>Board State</h4>
  <TotalCardsInput bind:totalCards bind:invalidTotalCardsInput onEnter={onCalculateClicked} />
  <LevelsInput description="Levels/Ranks of opponents monsters." bind:levels={monsterLevels} />
  <h4>Extra Deck (optional)</h4>
  <LevelsInput description="XYZ monster ranks in your Extra Deck." bind:levels={xyzRanks} />
  <LevelsInput description="Fusion monster levels in your Extra Deck." bind:levels={fusionLevels} />
  <input type="button" value="Calculate" onclick={onCalculateClicked} />
  <div style="display: flex">
    <div>
      <Toggle
        description="Show relative values"
        bind:state={showRelativeValues}
        localStorageKey={showRelativeValuesLsKey}
      />
    </div>
    <div style="margin-left: auto; margin-right: 0;">
      <button onclick={() => (showCardText = true)} class="link-button underlined"> View card text </button>
    </div>
  </div>
</article>
{#if showCardText}
  {#await import("./CardTextDialog.svelte")}
    <dialog open aria-busy="true"></dialog>
  {:then module}
    <module.default bind:showCardText />
  {/await}
{/if}

<div bind:this={tableDivRef} style="min-height: {minTableHeight}px">
  {#if showResults}
    <article>
      {#if showTable}
        {#if validCombinations.length > 0}
          <h4>Possible Combinations</h4>
          <ResultsTable combinations={validCombinations} />
        {:else}
          <h4>No possible combinations for this game state.</h4>
        {/if}
        {#if potentialCombinations.length > 0}
          <h4>Almost possible Combinations</h4>
          <ResultsTable combinations={potentialCombinations} showRelative={showRelativeValues} {totalCards} />
        {:else}
          <h4>No almost possible combinations for this game state.</h4>
        {/if}
      {:else}
        <h4>No possible or almost possible combinations for this game state.</h4>
      {/if}
    </article>
  {/if}
</div>
