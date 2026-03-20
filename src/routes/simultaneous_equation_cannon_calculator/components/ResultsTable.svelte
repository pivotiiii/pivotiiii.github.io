<script lang="ts">
  import type {Combination} from "./SECC";

  interface ResultsTableBodyComponentProps {
    combinations: Combination[];
    showRelative?: boolean;
    totalCards?: number;
  }
  let {combinations, showRelative = false, totalCards = 0}: ResultsTableBodyComponentProps = $props();

  function showTotal(c: Combination) {
    if (!showRelative) {
      return c.total_cards;
    }
    if (c.total_cards != 0 && c.total_cards - totalCards > 0) {
      return "+" + (c.total_cards - totalCards);
    }
    return c.total_cards - totalCards;
  }

  function sortRelatives(a: Combination, b: Combination) {
    if (a.total_cards === b.total_cards) {
      if (a.xyz > b.xyz) {
        return 1;
      }
    }
    if (Math.abs(a.total_cards - totalCards) >= Math.abs(b.total_cards - totalCards)) {
      return 1;
    }
    return -1;
  }
</script>

<table class="striped rounded-corners">
  <thead>
    <tr>
      <th>Total Cards</th>
      <th>XYZ Rank</th>
      <th>Fusion Level</th>
      <th>Target Level</th>
    </tr>
  </thead>
  <tbody style="display: {combinations.length > 0 ? '' : 'none'}">
    {#each [...combinations].sort(sortRelatives) as comb}
      <tr>
        <td>{showTotal(comb)}</td>
        <td>{comb.xyz}</td>
        <td>{comb.fusion}</td>
        <td>{comb.target}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  th,
  td {
    text-align: center;
  }

  table.rounded-corners {
    --corner-radius: var(--pico-border-radius);
  }

  table.rounded-corners tr th:first-of-type {
    border-top-left-radius: var(--corner-radius);
  }

  table.rounded-corners tr:first-of-type th:last-of-type {
    border-top-right-radius: var(--corner-radius);
  }

  table.rounded-corners tr:last-of-type td:first-of-type {
    border-bottom-left-radius: var(--corner-radius);
  }

  table.rounded-corners tr:last-of-type td:last-of-type {
    border-bottom-right-radius: var(--corner-radius);
  }
</style>
