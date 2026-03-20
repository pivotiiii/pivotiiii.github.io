<script lang="ts">
  interface RoomSelectProps {
    playerName: string;
    roomName: string;
    onCreateRoom?: () => void;
  }

  let {
    playerName = $bindable<string>(""),
    roomName = $bindable<string>(""),
    onCreateRoom
  }: RoomSelectProps = $props();
</script>

<div>
  <input
    type="text"
    placeholder="Enter player name"
    autocomplete="off"
    maxlength="10"
    bind:value={playerName}
  />
  <small>Player Name</small>
</div>
<div>
  <input type="text" placeholder="Enter room name" autocomplete="off" maxlength="10" bind:value={roomName} />
  <small>Room Name</small>
</div>
<button onclick={onCreateRoom}>Connect</button>
