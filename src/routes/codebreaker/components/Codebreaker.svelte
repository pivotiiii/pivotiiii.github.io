<!-- TODO: Game Over screen
player change sound only happens if control is gained rn, not lost-->

<script lang="ts">
  import Chat from "./Chat.svelte";
  import Game from "./Game.svelte";
  import Players from "./Players.svelte";
  import RoomSelect from "./RoomSelect.svelte";
  import RoomSettings from "./RoomSettings.svelte";
  import {Role, GameStatus, type GameState, FeedbackType} from "./types";
  import chatSound from "../assets/chat.mp3";
  import playerChangeSound from "../assets/playerChange.wav";
  import winSound from "../assets/win.wav";
  import lossSound from "../assets/loss.wav";
  import ChatFloater from "./ChatFloater.svelte";

  const NUM_COLORS_MIN = 2;
  const NUM_COLORS_MAX = 12;
  const NUM_POSITIONS_MIN = 2;
  const NUM_POSITIONS_MAX = 8;
  const MAX_ATTEMPTS_MIN = 2;
  const MAX_ATTEMPTS_MAX = 100;

  let ws: WebSocket | null = $state(null);
  let gameState: GameState = $state({
    status: GameStatus.RoomSelect,
    players: [],
    connectedPlayers: [],
    codeBreaker: "",
    codeMaker: "",
    activePlayer: "",
    secret: [],
    secretIsSet: false,
    currentGuess: [],
    currentFeedback: [],
    numPositions: 4,
    numColors: 8,
    maxAttempts: 10,
    guessHistory: [],
    feedbackHistory: []
  });
  let playerName: string = $state("");
  let roomName: string = $state("");
  let selectedRole: Role = $state(Role.Unassigned);
  let chatMessages: {sender: string; msg: string}[] = $state([]);
  let newChatMessage: boolean = $state(false);
  let chatDialogOpen: boolean = $state(false);
  let firstStateUpdateReceived: boolean = $state(false);
  let winner = $state("");
  let showError = $state(false);

  async function connectWebSocket() {
    ws = new WebSocket(`${__WORKER_URL__}/room/${roomName}?player=${playerName}`);
    ws.onclose = () => {
      ws = null;
      showError = true;
      setTimeout(() => {
        showError = false;
      }, 3000);
    };
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      console.log("message: ", event.data);
      if (msg.type === "stateUpdate") {
        handleStateUpdate(msg.gameState);
      } else if (msg.type === "error") {
        console.log("error: ", msg.data);
      } else if (msg.type === "gameOver") {
        handleGameOver(msg.winner);
      } else if (msg.type === "chatMessage") {
        handleChatMessage(msg.sender, msg.message);
      } else if (msg.type === "playerConnected") {
        handleChatMessage("System", msg.name + " joined the game.");
      } else if (msg.type === "playerDisconnected") {
        handleChatMessage("System", msg.name + " left the game.");
      }
    };
    while (!ws || ws.readyState !== WebSocket.OPEN) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    ws.send(JSON.stringify({type: "getState"}));
    gameState.status = GameStatus.Lobby;
  }

  function handleStateUpdate(newState: any) {
    if (
      newState.activePlayer &&
      newState.activePlayer !== gameState.activePlayer &&
      gameState.status === GameStatus.Playing
    ) {
      const audio = new Audio(playerChangeSound);
      audio.volume = 0.8;
      audio.play();
    }
    gameState = {...gameState, ...newState};
    firstStateUpdateReceived = true;
  }

  function handleChatMessage(sender: string, message: string) {
    chatMessages = [...chatMessages, {sender: sender, msg: message}];
    if (sender !== playerName && sender !== "System") {
      newChatMessage = true;
    }
    const audio = new Audio(chatSound);
    audio.play();
  }

  function handleGameOver(winner: string) {
    winner = winner;
    handleChatMessage("System", winner + " won!");
    if (winner === playerName) {
      const audio = new Audio(winSound);
      audio.volume = 0.5;
      audio.play();
    } else {
      const audio = new Audio(lossSound);
      audio.volume = 0.5;
      audio.play();
    }
  }

  function startGame() {
    if (ws && selectedRole !== Role.Unassigned) {
      ws.send(
        JSON.stringify({
          type: "startingGame",
          role: selectedRole,
          numPositions: gameState.numPositions,
          numColors: gameState.numColors,
          maxAttempts: gameState.maxAttempts
        })
      );
    }
  }

  function changeSetting(setting: "numPositions" | "numColors" | "maxAttempts", delta: number) {
    if (ws && gameState.status === GameStatus.Lobby) {
      if (setting === "numPositions") {
        gameState.numPositions = Math.min(
          NUM_POSITIONS_MAX,
          Math.max(NUM_POSITIONS_MIN, gameState.numPositions + delta)
        );
      } else if (setting === "numColors") {
        gameState.numColors = Math.min(NUM_COLORS_MAX, Math.max(NUM_COLORS_MIN, gameState.numColors + delta));
      } else if (setting === "maxAttempts") {
        gameState.maxAttempts = Math.min(
          MAX_ATTEMPTS_MAX,
          Math.max(MAX_ATTEMPTS_MIN, gameState.maxAttempts + delta)
        );
      }
      ws.send(
        JSON.stringify({
          type: "updateSettings",
          numPositions: gameState.numPositions,
          numColors: gameState.numColors,
          maxAttempts: gameState.maxAttempts
        })
      );
    }
  }

  function updateGuess(position: number, color: number) {
    if (ws && gameState.status === GameStatus.Playing && gameState.activePlayer === gameState.codeBreaker) {
      gameState.currentGuess[position] = color;
      ws.send(JSON.stringify({type: "updateGuess", guess: gameState.currentGuess}));
    }
  }

  function submitGuess() {
    if (ws && gameState.status === GameStatus.Playing && gameState.activePlayer === gameState.codeBreaker) {
      gameState.activePlayer = gameState.codeMaker;
      ws.send(JSON.stringify({type: "submitGuess", guess: gameState.currentGuess}));
    }
  }

  function updateFeedback(position: number, feedback: FeedbackType) {
    if (ws && gameState.status === GameStatus.Playing && gameState.activePlayer === gameState.codeMaker) {
      gameState.currentFeedback[position] = feedback;
      ws.send(JSON.stringify({type: "updateFeedback", feedback: gameState.currentFeedback}));
    }
  }

  function submitFeedback() {
    if (ws && gameState.status === GameStatus.Playing && gameState.activePlayer === gameState.codeMaker) {
      ws.send(JSON.stringify({type: "submitFeedback", feedback: gameState.currentFeedback}));
      gameState.guessHistory.push(gameState.currentGuess);
      gameState.currentGuess = Array.from({length: gameState.numPositions}, () => 0);
      gameState.feedbackHistory.push(gameState.currentFeedback);
      gameState.currentFeedback = Array.from({length: gameState.numPositions}, () => FeedbackType.Empty);
      gameState.activePlayer = gameState.codeBreaker;
    }
  }

  function submitSecret() {
    if (ws && gameState.status === GameStatus.Playing && gameState.activePlayer === gameState.codeMaker) {
      gameState.activePlayer = gameState.codeBreaker;
      ws.send(JSON.stringify({type: "submitSecret", secret: gameState.secret}));
    }
  }

  function resignGame() {
    if (ws && gameState.status === GameStatus.Playing) {
      gameState.status = GameStatus.GameOver;
      ws.send(JSON.stringify({type: "resignGame"}));
    }
  }

  function resetGame() {
    if (ws && gameState.status === GameStatus.GameOver) {
      ws.send(JSON.stringify({type: "resetGame"}));
    }
  }

  function sendChatMessage(message: string) {
    if (ws) {
      ws.send(JSON.stringify({type: "chatMessage", message: message}));
    }
  }
</script>

{#snippet functionButton()}
  {#if gameState.status === GameStatus.GameOver}
    <button class="func-button" onclick={resetGame}>Lobby</button>
  {:else if playerName === gameState.codeMaker}
    {#if gameState.secretIsSet}
      <button
        class="func-button"
        disabled={gameState.activePlayer !== gameState.codeMaker}
        onclick={submitFeedback}>Submit</button
      >
    {:else}
      <button
        class="func-button"
        disabled={gameState.activePlayer !== gameState.codeMaker || gameState.secret.includes(0)}
        onclick={submitSecret}>Set Secret</button
      >
    {/if}
  {:else}
    <button
      class="func-button"
      disabled={gameState.activePlayer !== gameState.codeBreaker || gameState.currentGuess.includes(0)}
      onclick={submitGuess}>Guess</button
    >
  {/if}
{/snippet}
{#snippet flagIcon()}
  <svg width="40px" height="40x" viewBox="-1.5 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 22V14M5 14V4M5 14L7.47067 13.5059C9.1212 13.1758 10.8321 13.3328 12.3949 13.958C14.0885 14.6354 15.9524 14.7619 17.722 14.3195L17.8221 14.2945C18.4082 14.148 18.6861 13.4769 18.3753 12.9589L16.8147 10.3578C16.4732 9.78863 16.3024 9.50405 16.2619 9.19451C16.2451 9.06539 16.2451 8.93461 16.2619 8.80549C16.3024 8.49595 16.4732 8.21137 16.8147 7.64221L18.0932 5.51132C18.4278 4.9536 17.9211 4.26972 17.2901 4.42746C15.8013 4.79967 14.2331 4.69323 12.8082 4.12329L12.3949 3.95797C10.8321 3.33284 9.1212 3.17576 7.47067 3.50587L5 4M5 4V2"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
{/snippet}

<div class="main_container">
  <article class="room_container">
    {#if !ws || !firstStateUpdateReceived}
      <RoomSelect bind:playerName bind:roomName onCreateRoom={connectWebSocket} />
    {:else if gameState.status === GameStatus.Lobby}
      <RoomSettings
        bind:numPositions={gameState.numPositions}
        bind:numColors={gameState.numColors}
        bind:maxAttempts={gameState.maxAttempts}
        players={gameState.players}
        bind:selectedRole
        onStartGame={startGame}
        onChangeSettings={changeSetting}
      />
    {:else if gameState.status === GameStatus.Playing || gameState.status === GameStatus.GameOver}
      <div class="mobile-only mobile-controls">
        <Players
          codeBreakerName={gameState.codeBreaker}
          codeMakerName={gameState.codeMaker}
          activePlayer={gameState.activePlayer}
          codeBreakerOnline={gameState.connectedPlayers.includes(gameState.codeBreaker || "")}
          codeMakerOnline={gameState.connectedPlayers.includes(gameState.codeMaker || "")}
        />
        <div class="mobile-controls-buttons">
          {@render functionButton()}
          <button
            class="resign-button func-button secondary"
            style="padding: 0px 0px 0px 0px; margin: 15px 0px 0px 10px; min-width: 45px;"
            onclick={resignGame}
            disabled={gameState.status !== GameStatus.Playing}
          >
            {@render flagIcon()}</button
          >
        </div>
      </div>
      {#if gameState.status === GameStatus.GameOver && winner !== ""}
        <div style="width: 100%; text-align: center; margin-top: 20px;">
          <h2>{winner} wins!</h2>
        </div>
      {/if}
      <Game {playerName} bind:gameState {updateGuess} {updateFeedback} />
    {/if}
  </article>

  {#if ws && firstStateUpdateReceived}
    <article class="controls_container desktop-only">
      {#if gameState.status === GameStatus.Playing || gameState.status === GameStatus.GameOver}
        <div class="desktop-controls">
          <Players
            codeBreakerName={gameState.codeBreaker}
            codeMakerName={gameState.codeMaker}
            activePlayer={gameState.activePlayer}
            codeBreakerOnline={gameState.connectedPlayers.includes(gameState.codeBreaker || "")}
            codeMakerOnline={gameState.connectedPlayers.includes(gameState.codeMaker || "")}
          />

          <div class="desktop-controls-buttons">
            {@render functionButton()}
            <button
              class="resign-button func-button secondary"
              style="padding: 0px 0px 0px 0px; margin: 15px 0px 15px 10px; min-width: 45px;"
              onclick={resignGame}
              disabled={gameState.status !== GameStatus.Playing}
            >
              {@render flagIcon()}
            </button>
          </div>
        </div>
      {/if}

      <div class="desktop-chat-connected">
        {#if gameState.status === GameStatus.Lobby}
          <div class="desktop-connected connected-font">
            <span>Connected:&nbsp;</span>
            {#each gameState.connectedPlayers as player, index}
              <span>{player + (index < gameState.connectedPlayers.length - 1 ? ", " : "")}&nbsp;</span>
            {/each}
          </div>
        {/if}

        <div class="desktop-chat">
          <Chat messages={chatMessages} onSend={sendChatMessage} />
        </div>
      </div>
    </article>

    {#if gameState.status === GameStatus.Lobby}
      <article class="mobile-only" style="width: 100%;">
        <div style="height: 100%; display: flex; flex-direction: column; justify-content: end; width: 100%;">
          <div
            class="connected-font"
            style="display: flex; flex-direction: row; justify-content: left; align-items: start;"
          >
            <span>Connected:&nbsp;</span>
            {#each gameState.connectedPlayers as player, index}
              <span>{player + (index < gameState.connectedPlayers.length - 1 ? ", " : "")}&nbsp;</span>
            {/each}
          </div>
        </div>
      </article>
    {/if}

    <div class="mobile-only">
      <ChatFloater {chatMessages} {sendChatMessage} bind:chatDialogOpen bind:newChatMessage />
    </div>
  {/if}
</div>

{#if showError}
  <div class="error-message">Room is full or player name already exists in the room.</div>
{/if}

<style>
  .main_container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    /* align-items: center; */
    width: 100%;
    column-gap: 15px;
  }

  .func-button {
    margin-top: 15px;
    margin-bottom: 15px;
    min-width: 150px;
    width: 100%;
  }

  .room_container {
    flex: 3;
    display: flex;
    flex-direction: column;
    min-width: 468px;
  }

  .controls_container {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: start;
    min-width: 235px;
    min-height: 0;
    overflow: hidden;
  }

  .desktop-chat-connected {
    flex: 1 1 0;
    min-height: 0;
    display: flex;
    flex-direction: column;
    justify-content: start;
    overflow: hidden;
  }

  .desktop-connected {
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: start;
  }

  .desktop-chat {
    min-height: 0;
    height: 0;
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    overflow: hidden;
  }

  .desktop-controls-buttons {
    display: flex;
    flex-direction: row;
    justify-content: end;
  }

  .connected-font {
    font-size: 0.8em;
  }

  .mobile-only {
    display: none;
  }

  @media (max-width: 768px) {
    .main_container {
      flex-direction: column;
      align-items: center;
    }

    .room_container {
      min-width: 0px;
      width: 100%;
    }

    .controls_container {
      min-width: 0px;
      width: 100%;
    }

    .func-button {
      margin-top: 15px;
      margin-bottom: 0px;
    }

    .desktop-only {
      display: none;
    }

    .mobile-only {
      display: block;
    }

    .mobile-controls {
      margin-bottom: 15px;
      display: flex;
      /* align-items: center; */
      flex-direction: row;
    }

    .mobile-controls-buttons {
      display: flex;
      flex-direction: row;
      margin-top: -15px;
      /* align-items: center; */
      justify-content: end;
      max-height: 65px;
      width: 100%;
    }

    .mobile-controls-buttons > :nth-child(2) {
      flex: 0;
    }
  }
</style>
