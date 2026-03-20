<script lang="ts">
  interface Message {
    sender: string;
    msg: string;
  }

  interface ChatProps {
    messages: Message[];
    onSend: (message: string) => void;
  }

  let {messages, onSend}: ChatProps = $props();
  let messagesContainer: HTMLDivElement;
  let inputValue = $state("");

  $effect(() => {
    if (messagesContainer && messages) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  });
</script>

<div class="chat_container">
  <div class="messages_container" bind:this={messagesContainer}>
    {#each messages as message, index (index)}
      {#if message.sender === "System"}
        <div class="message">
          <span class="text italic">{message.msg}</span>
        </div>
      {:else}
        <div class="message">
          <strong class="sender">{message.sender}:</strong>
          <span class="text">{message.msg}</span>
        </div>
      {/if}
    {/each}
  </div>
  <div class="input_area">
    <input
      type="text"
      placeholder="Type your message..."
      bind:value={inputValue}
      onkeydown={(e) => {
        if (e.key === "Enter") {
          onSend(inputValue);
          inputValue = "";
        }
      }}
    />
    <button
      onclick={() => {
        onSend(inputValue);
        inputValue = "";
      }}>Send</button
    >
  </div>
</div>

<style>
  .chat_container {
    display: flex;
    flex-direction: column;
    margin-top: 0;
    flex: 1 1 0;
    min-height: 0;
    /* max-height: 600px; */
    height: auto;
    border: 1px solid;
    border-color: var(--pico-form-element-border-color);
    border-radius: 4px;
    overflow: hidden;
  }

  .messages_container {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 0.9em;
  }

  .message {
    display: flex;
    gap: 8px;
    word-break: break-word;
  }

  .sender {
    flex-shrink: 0;
    min-width: fit-content;
  }

  .text {
    flex: 1;
  }

  .text.italic {
    font-style: italic;
    color: var(--pico-h4-color);
  }

  .input_area {
    display: flex;
    border-top: 1px solid;
    border-color: var(--pico-form-element-border-color);
    height: 3em;
  }

  .input_area input {
    flex: 1;
    border: 1px solid;
    border-color: var(--pico-form-element-border-color);
    border-radius: 0px;
    font-size: 14px;
    height: 3.5em;
    border-radius: 0px 0px 0px 4px;
  }

  .input_area button {
    border: 1px solid;
    border-color: var(--pico-form-element-border-color);
    border-radius: 0px 0px 4px 0px;
    cursor: pointer;
    font-weight: 500;
    height: 3em;
    padding-left: 2px;
    padding-right: 2px;
  }

  @media (max-width: 768px) {
    .chat_container {
      min-height: 600px;
      max-height: 600px;
    }

    .input_area button {
      padding-left: 30px;
      padding-right: 30px;
    }
  }
</style>
