<script lang="ts">
  import Chat from "./Chat.svelte";

  interface ChatFloaterProps {
    chatMessages: {sender: string; msg: string}[];
    sendChatMessage: (message: string) => void;
    chatDialogOpen: boolean;
    newChatMessage: boolean;
  }
  let {
    chatMessages,
    sendChatMessage,
    chatDialogOpen = $bindable(false),
    newChatMessage = $bindable(false)
  }: ChatFloaterProps = $props();
</script>

{#snippet chatIcon()}
  <svg width="40px" height="40px" viewBox="-1 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_15_90)">
      <rect width="24" height="24" />
      <path
        d="M20 12C20 16.4183 16.4183 20 12 20C10.5937 20 9.27223 19.6372 8.12398 19C7.53267 18.6719 4.48731 20.4615 3.99998 20C3.44096 19.4706 5.4583 16.6708 5.07024 16C4.38956 14.8233 3.99999 13.4571 3.99999 12C3.99999 7.58172 7.58171 4 12 4C16.4183 4 20 7.58172 20 12Z"
        stroke="white"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_15_90">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
{/snippet}

<div class="chat-floater">
  <button
    style="padding: 5px;"
    onclick={() => {
      chatDialogOpen = true;
      newChatMessage = false;
    }}>{@render chatIcon()}</button
  >
  {#if newChatMessage}
    <div class="chat-floater-bubble"></div>
  {/if}
</div>
<dialog open={chatDialogOpen} onclose={() => (chatDialogOpen = false)}>
  <article style="position: relative;">
    <div>
      <Chat messages={chatMessages} onSend={sendChatMessage} />
      <button class="dialog-close" onclick={() => (chatDialogOpen = false)}>X</button>
    </div>
  </article>
</dialog>

<style>
  .chat-floater {
    display: block;
    position: fixed;
    bottom: 0%;
    right: 0%;
    transform: translate(85%, 80%);
    min-width: 400px;
    min-height: 400px;
    z-index: 10;
  }

  .chat-floater-bubble {
    display: block;
    border-radius: 50%;
    background-color: tomato;
    width: 22px;
    height: 22px;
    position: absolute;
    top: -10px;
    right: 340px;
    z-index: 12;
  }

  .dialog-close {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: tomato;
    border-radius: 50%;
    width: 55px;
    height: 55px;
    top: 0%;
    right: 0%;
    z-index: 12;
  }
</style>
