const NUM_COLORS_MIN = 2;
const NUM_COLORS_MAX = 12;
const NUM_POSITIONS_MIN = 2;
const NUM_POSITIONS_MAX = 8;
const MAX_ATTEMPTS_MIN = 2;
const MAX_ATTEMPTS_MAX = 100;

const Role = {
    CodeMaker: 0,
    CodeBreaker: 1,
    Unassigned: -1
} as const;
type Role = typeof Role[keyof typeof Role];

const FeedbackType = {
    Correct: 2,
    WrongPosition: 1,
    Empty: 0
} as const;
type FeedbackType = typeof FeedbackType[keyof typeof FeedbackType];

const GameStatus = {
    RoomSelect: 0,
    Lobby: 1,
    Playing: 2,
    GameOver: 3
} as const;
type GameStatus = typeof GameStatus[keyof typeof GameStatus];

type Player = string;
type Guess = number[];
type Feedback = FeedbackType[];

interface GameState {
    status: GameStatus;
    players: Player[];
    connectedPlayers: Player[];
    codeBreaker: Player | null;
    codeMaker: Player | null;
    activePlayer: Player | null;
    secret?: Guess;
    secretIsSet: boolean;
    currentGuess: Guess;
    currentFeedback: Feedback;
    maxAttempts: number;
    numColors: number;
    numPositions: number;
    guessHistory: Guess[];
    feedbackHistory: Feedback[];
}

const emptyGameState: GameState = {
    status: GameStatus.Lobby,
    players: [],
    connectedPlayers: [],
    activePlayer: null,
    codeBreaker: null,
    codeMaker: null,
    secret: undefined,
    secretIsSet: false,
    currentGuess: [],
    currentFeedback: [],
    maxAttempts: 10,
    numColors: 8,
    numPositions: 4,
    guessHistory: [],
    feedbackHistory: []
};

export class Room {
    state: DurableObjectState;
    sessions: Map<string, WebSocket>;
    gameState: GameState;
    private gameStateLoaded: boolean = false;

    constructor(state: DurableObjectState) {
        this.state = state;
        this.sessions = new Map();
        this.gameState = emptyGameState;

        this.state.getWebSockets().forEach((ws) => {
            const playerName = ws.deserializeAttachment();
            if (playerName) {
                this.sessions.set(playerName, ws);
            }
        });
        this.gameState.connectedPlayers = Array.from(this.sessions.keys());
        console.log("Restored sessions: ", this.gameState.connectedPlayers);
        // auto response that does not wake hibernated WebSockets
        this.state.setWebSocketAutoResponse(new WebSocketRequestResponsePair("ping", "pong"));
    }

    validateConnection(playerName: string): { valid: boolean; error?: string; connectionType?: "firstConnect" | "reconnect" } {
        // check if session is already full (max 2 players)
        if (this.sessions.size >= 2) {
            return { valid: false, error: "Session is full. Maximum 2 players allowed." };
        }

        // check if player is already in the session
        if (this.sessions.has(playerName)) {
            return { valid: false, error: "Player already connected to this session." };
        }

        // check if player exists in gameState (saved players)
        const playerInGameState = this.gameState.players.includes(playerName);
        // check if game has already started
        const gameStarted = this.gameState.status === GameStatus.Playing || this.gameState.status === GameStatus.GameOver;

        if (playerInGameState && gameStarted) {
            // player is reconnecting
            return { valid: true, connectionType: "reconnect" };
        } else {
            // first time connecting
            return { valid: true, connectionType: "firstConnect" };
        }
    }

    async loadGameState(): Promise<void> {
        const savedGameState = await this.state.storage.get<GameState>("gameState");
        if (savedGameState) {
            this.gameState = savedGameState;
            console.log("loaded game state");
        }
    }

    async saveGameState(): Promise<void> {
        const stateToSave = { ...this.gameState };
        //stateToSave.connectedPlayers = [];
        await this.state.storage.put("gameState", stateToSave);
        console.log("saved game state");
        await this.state.storage.setAlarm(Date.now() + 48 * 60 * 60 * 1000); // 48 hours
    }

    async alarm() {
        // clear game state and disconnect all clients after 48 hours of inactivity
        await this.state.storage.delete("gameState");
        this.gameState = emptyGameState;
        for (const session of this.sessions.values()) {
            session.close();
        }
        this.sessions.clear();
    }

    async fetch(request: Request): Promise<Response> {

        if (request.headers.get("Upgrade") !== "websocket") {
            return new Response("Expected a WebSocket upgrade", { status: 400 });
        }

        if (!this.gameStateLoaded) {
            await this.loadGameState();
            this.gameStateLoaded = true;
        }

        const url = new URL(request.url);
        const playerName = url.searchParams.get("player");

        if (!playerName) {
            return new Response("Player name is required", { status: 400 });
        }

        const connectionValidation = this.validateConnection(playerName);
        if (!connectionValidation.valid) {
            return new Response(JSON.stringify({ error: connectionValidation.error }), { status: 403 });
        }

        const pair = new WebSocketPair();
        const [client, server] = Object.values(pair);

        //server.accept();
        this.state.acceptWebSocket(server);

        server.serializeAttachment(playerName);
        this.sessions.set(playerName, server);

        this.gameState.connectedPlayers = Array.from(this.sessions.keys());
        console.log(`Player ${playerName} connected. Connected players: ${this.gameState.connectedPlayers}`);

        this.sendState();
        // await this.saveGameState();

        this.broadcast(JSON.stringify({
            type: "playerConnected",
            name: playerName,
            connectionType: connectionValidation.connectionType
        }));

        return new Response(null, { status: 101, webSocket: client });
    }

    broadcast(message: string) {
        for (const session of this.sessions.values()) {
            session.send(message);
        }
    }

    toPlayer(playerName: Player, msg: string) {
        const session = this.sessions.get(playerName);
        if (session) {
            session.send(msg);
        }
    }

    sendState(revealSecretToAll: boolean = false) {
        if (revealSecretToAll) {
            this.broadcast(JSON.stringify({ type: "stateUpdate", gameState: this.gameState }));
            return;
        }
        const stateNoSecret = { ...this.gameState };
        stateNoSecret.secret = Array.from({ length: this.gameState.numPositions }, () => 0);
        // const stateMessageMaker = JSON.stringify({ type: "stateUpdate", gameState: this.gameState });
        // const stateMessageAll = JSON.stringify({ type: "stateUpdate", gameState: gameStateWithoutSecret });
        if (this.gameState.codeMaker && this.gameState.codeBreaker) {

            this.toPlayer(this.gameState.codeMaker, JSON.stringify({ type: "stateUpdate", gameState: this.gameState }));
            this.toPlayer(this.gameState.codeBreaker, JSON.stringify({ type: "stateUpdate", gameState: stateNoSecret }));
        } else {
            this.broadcast(JSON.stringify({ type: "stateUpdate", gameState: stateNoSecret }));
        }
    }

    async webSocketMessage(ws: WebSocket, message: ArrayBuffer | string) {
        if (!this.gameStateLoaded) {
            await this.loadGameState();
            this.gameStateLoaded = true;
        }
        const playerName = ws.deserializeAttachment();
        const msg = typeof message === "string" ? JSON.parse(message) : null;
        if (!msg || !playerName) {
            return;
        }
        // this.broadcast(JSON.stringify({ type: "info", message: message }));

        if (msg.type === "getState") {
            this.handleGetState(playerName);
        } else if (msg.type === "updateSettings") {
            this.handleUpdateSettings(msg);
        } else if (msg.type === "startingGame") {
            this.handleStartingGame(msg, playerName);
        } else if (msg.type === "submitSecret") {
            this.handleSubmitSecret(msg, playerName);
        } else if (msg.type === "updateGuess") {
            this.handleUpdateGuess(msg, playerName);
        } else if (msg.type === "submitGuess") {
            this.handleSubmitGuess(msg, playerName);
        } else if (msg.type === "updateFeedback") {
            this.handleUpdateFeedback(msg, playerName);
        } else if (msg.type === "submitFeedback") {
            this.handleSubmitFeedback(msg, playerName);
        } else if (msg.type === "resignGame") {
            this.handleResignGame(playerName);
        } else if (msg.type === "resetGame") {
            this.handleResetGame();
        } else if (msg.type === "chatMessage") {
            this.handleChatMessage(msg, playerName);
        } else {
            this.broadcast(JSON.stringify({ type: "error", message: "Unknown message type." }));
        }
    }

    async webSocketClose(ws: WebSocket, code: number, reason: string, wasClean: boolean) {
        const playerName = ws.deserializeAttachment();
        //ws.close(code, reason);
        if (playerName) {
            this.sessions.delete(playerName);
            this.gameState.connectedPlayers = this.gameState.connectedPlayers.filter(p => p !== playerName);
            console.log(`Player ${playerName} disconnected. Connected players: ${this.gameState.connectedPlayers}`);
            this.sendState();
            // await this.saveGameState();
            this.broadcast(JSON.stringify({ type: "playerDisconnected", name: playerName, reason: reason }));
            if (this.gameState.status === GameStatus.Lobby && this.gameState.connectedPlayers.length === 0) {
                await this.state.storage.delete("gameState");
                this.gameState = emptyGameState;
                console.log("All players disconnected, reset game state.");
            }
        }
    }

    handleGetState(playerName: Player) {
        const stateToSend = { ...this.gameState };
        if (playerName === this.gameState.codeMaker) {
            this.toPlayer(playerName, JSON.stringify({ type: "stateUpdate", gameState: stateToSend }));
        } else {
            stateToSend.secret = Array.from({ length: this.gameState.numPositions }, () => 0);
            this.toPlayer(playerName, JSON.stringify({ type: "stateUpdate", gameState: stateToSend }));
        }
    }

    handleUpdateSettings(msg: any) {
        if (msg.numColors < NUM_COLORS_MIN || msg.numColors > NUM_COLORS_MAX || msg.numPositions < NUM_POSITIONS_MIN || msg.numPositions > NUM_POSITIONS_MAX || msg.maxAttempts < MAX_ATTEMPTS_MIN || msg.maxAttempts > MAX_ATTEMPTS_MAX) {
            this.broadcast(JSON.stringify({ type: "chatMessage", sender: "System", message: `Number of colors must be between ${NUM_COLORS_MIN} and ${NUM_COLORS_MAX}, and number of positions must be between ${NUM_POSITIONS_MIN} and ${NUM_POSITIONS_MAX}, and maximum attempts must be between ${MAX_ATTEMPTS_MIN} and ${MAX_ATTEMPTS_MAX}.` }));
            return;
        }
        this.gameState.numColors = msg.numColors;
        this.gameState.numPositions = msg.numPositions;
        this.gameState.maxAttempts = msg.maxAttempts;
        this.sendState();
    }


    async handleStartingGame(msg: any, playerName: string) {
        if (this.sessions.size !== 2 && this.gameState.connectedPlayers.length <= 2) {
            this.broadcast(JSON.stringify({ type: "chatMessage", sender: "System", message: "Two players are required to start the game." }));
            return;
        }

        if (msg.role !== Role.CodeMaker && msg.role !== Role.CodeBreaker) {
            this.broadcast(JSON.stringify({ type: "chatMessage", sender: "System", message: "Select a role to play as." }));
            return;
        }

        if (msg.numColors < NUM_COLORS_MIN || msg.numColors > NUM_COLORS_MAX || msg.numPositions < NUM_POSITIONS_MIN || msg.numPositions > NUM_POSITIONS_MAX || msg.maxAttempts < MAX_ATTEMPTS_MIN || msg.maxAttempts > MAX_ATTEMPTS_MAX) {
            this.broadcast(JSON.stringify({ type: "chatMessage", sender: "System", message: `Number of colors must be between ${NUM_COLORS_MIN} and ${NUM_COLORS_MAX}, and number of positions must be between ${NUM_POSITIONS_MIN} and ${NUM_POSITIONS_MAX}, and maximum attempts must be between ${MAX_ATTEMPTS_MIN} and ${MAX_ATTEMPTS_MAX}.` }));
            return;
        }

        this.gameState.numColors = msg.numColors;
        this.gameState.numPositions = msg.numPositions;
        this.gameState.maxAttempts = msg.maxAttempts;

        this.gameState.players = this.gameState.connectedPlayers;
        if (msg.role === Role.CodeMaker) {
            this.gameState.codeMaker = playerName;
            this.gameState.codeBreaker = this.gameState.players.find(p => p !== playerName)!;
        } else {
            this.gameState.codeBreaker = playerName;
            this.gameState.codeMaker = this.gameState.players.find(p => p !== playerName)!;
        }
        this.gameState.activePlayer = this.gameState.codeMaker;

        this.gameState.currentGuess = Array.from({ length: this.gameState.numPositions }, () => 0);
        this.gameState.currentFeedback = Array.from({ length: this.gameState.numPositions }, () => FeedbackType.Empty);
        this.gameState.secret = Array.from({ length: this.gameState.numPositions }, () => 0);

        this.gameState.status = GameStatus.Playing;

        this.sendState();
        await this.saveGameState();
    }

    async handleSubmitSecret(msg: any, playerName: Player) {
        if (playerName !== this.gameState.activePlayer || playerName !== this.gameState.codeMaker) {
            this.toPlayer(playerName, JSON.stringify({ type: "chatMessage", sender: "System", message: "Only the code maker can set the secret." }));
            return;
        }
        if (!Array.isArray(msg.secret) || msg.secret.length !== this.gameState.numPositions || msg.secret.some((color: number) => color < 0 || color > this.gameState.numColors)) {
            this.toPlayer(playerName, JSON.stringify({ type: "chatMessage", sender: "System", message: "Invalid secret code." }));
            return;
        }
        this.gameState.secret = msg.secret;
        this.gameState.activePlayer = this.gameState.codeBreaker;
        this.gameState.secretIsSet = true;
        this.sendState();
        await this.saveGameState();
    }

    handleUpdateGuess(msg: any, playerName: Player) {
        if (playerName !== this.gameState.activePlayer || playerName !== this.gameState.codeBreaker) {
            this.toPlayer(playerName, JSON.stringify({ type: "chatMessage", sender: "System", message: "Only the code breaker can update their guess." }));
            return;
        }
        if (!Array.isArray(msg.guess) || msg.guess.some((color: number) => color < 0 || color > this.gameState.numColors)) {
            this.toPlayer(playerName, JSON.stringify({ type: "chatMessage", sender: "System", message: "Invalid guess." }));
            return;
        }
        this.gameState.currentGuess = msg.guess;
        this.sendState();
    }

    async handleSubmitGuess(msg: any, playerName: Player) {
        if (playerName !== this.gameState.activePlayer || playerName !== this.gameState.codeBreaker) {
            this.toPlayer(playerName, JSON.stringify({ type: "chatMessage", sender: "System", message: "Only the code breaker can submit their guess." }));
            return;
        }
        if (!Array.isArray(msg.guess) || msg.guess.length !== this.gameState.numPositions || msg.guess.some((color: number) => color < 0 || color > this.gameState.numColors)) {
            this.toPlayer(playerName, JSON.stringify({ type: "chatMessage", sender: "System", message: "Invalid guess." }));
            return;
        }
        //this.gameState.guessHistory.push(msg.guess);
        this.gameState.currentGuess = msg.guess;
        this.gameState.activePlayer = this.gameState.codeMaker;
        this.sendState();
        await this.saveGameState();
    }

    handleUpdateFeedback(msg: any, playerName: Player) {
        if (playerName !== this.gameState.activePlayer || playerName !== this.gameState.codeMaker) {
            this.toPlayer(playerName, JSON.stringify({ type: "chatMessage", sender: "System", message: "Only the code maker can update feedback." }));
            return;
        }
        console.log("Updating feedback: ", msg.feedback);
        if (!Array.isArray(msg.feedback) || msg.feedback.some((f: FeedbackType) => f !== FeedbackType.Correct && f !== FeedbackType.WrongPosition && f !== FeedbackType.Empty)) {
            this.toPlayer(playerName, JSON.stringify({ type: "chatMessage", sender: "System", message: "Invalid feedback." }));
            return;
        }
        this.gameState.currentFeedback = msg.feedback;
        this.sendState();
    }

    async handleSubmitFeedback(msg: any, playerName: Player) {
        if (playerName !== this.gameState.activePlayer || playerName !== this.gameState.codeMaker) {
            this.toPlayer(playerName, JSON.stringify({ type: "chatMessage", sender: "System", message: "Only the code maker can submit feedback." }));
            return;
        }
        if (!Array.isArray(msg.feedback) || msg.feedback.some((f: FeedbackType) => f !== FeedbackType.Correct && f !== FeedbackType.WrongPosition && f !== FeedbackType.Empty)) {
            this.toPlayer(playerName, JSON.stringify({ type: "chatMessage", sender: "System", message: "Invalid feedback." }));
            return;
        }
        this.gameState.guessHistory.push(this.gameState.currentGuess);
        this.gameState.feedbackHistory.push(msg.feedback);
        this.gameState.currentGuess = Array.from({ length: this.gameState.numPositions }, () => 0);
        this.gameState.currentFeedback = Array.from({ length: this.gameState.numPositions }, () => FeedbackType.Empty);
        this.gameState.activePlayer = this.gameState.codeBreaker;
        this.sendState();
        await this.saveGameState();
        if (msg.feedback.every((f: FeedbackType) => f === FeedbackType.Correct)) {
            this.gameState.activePlayer = null;
            this.broadcast(JSON.stringify({ type: "gameOver", winner: this.gameState.codeBreaker }));
            this.gameState.status = GameStatus.GameOver;
            this.sendState();
            await this.saveGameState();
        } else if (msg.feedback.some((f: FeedbackType) => f !== FeedbackType.Correct) && this.gameState.guessHistory.length >= this.gameState.maxAttempts) {
            this.gameState.activePlayer = null;
            this.broadcast(JSON.stringify({ type: "gameOver", winner: this.gameState.codeMaker }));
            this.gameState.status = GameStatus.GameOver;
            this.sendState();
            await this.saveGameState();
        }
    }

    async handleResignGame(playerName: Player) {
        this.gameState.activePlayer = null;
        const winner = playerName === this.gameState.codeMaker ? this.gameState.codeBreaker : this.gameState.codeMaker;
        this.broadcast(JSON.stringify({ type: "gameOver", winner: winner }));
        this.gameState.status = GameStatus.GameOver;
        this.sendState();
        await this.saveGameState();
    }

    async handleResetGame() {
        const newState = emptyGameState;
        newState.players = [];
        newState.connectedPlayers = Array.from(this.sessions.keys());
        newState.numColors = this.gameState.numColors;
        newState.numPositions = this.gameState.numPositions;
        newState.maxAttempts = this.gameState.maxAttempts;
        newState.status = GameStatus.Lobby;
        this.gameState = newState;

        this.sendState();
        await this.saveGameState();
    }

    handleChatMessage(msg: any, playerName: Player) {
        if (typeof msg.message !== "string" || msg.message.trim() === "") {
            return;
        }
        this.broadcast(JSON.stringify({ type: "chatMessage", sender: playerName, message: msg.message }));
    }

    gameOver(winner: Player) {
        this.gameState.activePlayer = null;
        this.broadcast(JSON.stringify({ type: "gameOver", winner: winner }));
        this.gameState.status = GameStatus.GameOver;
        this.sendState(true);
    }
}