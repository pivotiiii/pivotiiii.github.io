<script lang="ts">
  interface PlayersProps {
    codeBreakerName: string | null;
    codeMakerName: string | null;
    activePlayer: string | null;
    codeBreakerOnline: boolean;
    codeMakerOnline: boolean;
  }
  let {
    codeBreakerName,
    codeMakerName,
    activePlayer,
    codeBreakerOnline = false,
    codeMakerOnline = false
  }: PlayersProps = $props();
</script>

<div class="container">
  {#if codeMakerName !== null}
    <div class="player-container">
      <p>Code Maker</p>
      <div class="name-container">
        <p class="name" class:active={activePlayer === codeMakerName}>{codeMakerName}</p>
        <div class="dot" class:online={codeMakerOnline}></div>
      </div>
    </div>
  {/if}
  {#if codeBreakerName !== null}
    <div class="player-container">
      <p>Code Breaker</p>
      <div class="name-container">
        <p class="name" class:active={activePlayer === codeBreakerName}>{codeBreakerName}</p>
        <div class="dot" class:online={codeBreakerOnline}></div>
      </div>
    </div>
  {/if}
</div>

<style>
  .container {
    display: flex;
    flex-wrap: wrap;
    column-gap: 20px;
    justify-content: left;
    align-items: start;
  }

  .active {
    font-weight: bold;
    text-decoration: underline;
  }

  .name-container {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
  }

  .name {
    margin-bottom: 0px;
  }

  .player-container > :first-child {
    font-size: 0.7em;
    margin-bottom: 0px;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-left: 5px;
  }

  .dot.online {
    background-color: green;
  }
</style>
