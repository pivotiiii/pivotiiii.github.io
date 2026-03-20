export const Role = {
  CodeMaker: 0,
  CodeBreaker: 1,
  Unassigned: -1
} as const;
export type Role = (typeof Role)[keyof typeof Role];

export const FeedbackType = {
  Correct: 2,
  WrongPosition: 1,
  Empty: 0
} as const;
export type FeedbackType = (typeof FeedbackType)[keyof typeof FeedbackType];

export const GameStatus = {
  RoomSelect: 0,
  Lobby: 1,
  Playing: 2,
  GameOver: 3
} as const;
export type GameStatus = (typeof GameStatus)[keyof typeof GameStatus];

export type Player = string;
export type Guess = number[];
export type Feedback = FeedbackType[];

export interface GameState {
  status: GameStatus;
  players: Player[];
  connectedPlayers: Player[];
  codeBreaker: Player | null;
  codeMaker: Player | null;
  activePlayer: Player | null;
  secret: Guess;
  secretIsSet: boolean;
  currentGuess: Guess;
  currentFeedback: Feedback;
  maxAttempts: number;
  numColors: number;
  numPositions: number;
  guessHistory: Guess[];
  feedbackHistory: Feedback[];
}
