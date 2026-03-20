<script lang="ts">
  import {Role} from "./types";

  interface RoomSettingsProps {
    numPositions: number;
    numColors: number;
    maxAttempts: number;
    players: string[];
    selectedRole: Role;
    onStartGame: () => void;
    onChangeSettings: (setting: "numPositions" | "numColors" | "maxAttempts", delta: number) => void;
  }

  let {
    numPositions = $bindable<number>(4),
    numColors = $bindable<number>(8),
    maxAttempts = $bindable<number>(12),
    players,
    selectedRole = $bindable<Role>(Role.Unassigned),
    onStartGame,
    onChangeSettings
  }: RoomSettingsProps = $props();
</script>

<h3>Room Settings</h3>

<div class="container-up-down">
  <div class="label">Number of Positions</div>
  <button class="small" onclick={() => onChangeSettings("numPositions", -1)}>-</button>
  <div class="value">{numPositions}</div>
  <button class="small" onclick={() => onChangeSettings("numPositions", 1)}>+</button>
</div>

<div class="container-up-down">
  <div class="label">Number of Colors</div>
  <button class="small" onclick={() => onChangeSettings("numColors", -1)}>-</button>
  <div class="value">{numColors}</div>
  <button class="small" onclick={() => onChangeSettings("numColors", 1)}>+</button>
</div>

<div class="container-up-down">
  <div class="label">Maximum Attempts</div>
  <button class="small" onclick={() => onChangeSettings("maxAttempts", -1)}>-</button>
  <div class="value">{maxAttempts}</div>
  <button class="small" onclick={() => onChangeSettings("maxAttempts", 1)}>+</button>
</div>

<div class="container-up-down">
  <div class="label">Select Role</div>
  <div>
    <label>
      <input type="radio" name="role" value={Role.CodeMaker} bind:group={selectedRole} />
      Code Maker
    </label>
    <label>
      <input type="radio" name="role" value={Role.CodeBreaker} bind:group={selectedRole} />
      Code Breaker
    </label>
  </div>
</div>

<button class="start" onclick={onStartGame}>Start Game</button>

<style>
  .container-up-down {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 15px;
    background-color: var(--pico-dropdown-hover-background-color);
    padding: 10px;
    border-radius: 4px;
  }

  .label {
    flex: 1;
  }

  .value {
    font-size: 1.5em;
    width: 2.5em;
    text-align: center;
  }

  .small {
    font-size: 0.8em;
    padding: 5px 10px;
    width: 35px;
    height: 35px;
  }

  .start {
    margin-top: auto;
    font-size: 1.2em;
  }
</style>
