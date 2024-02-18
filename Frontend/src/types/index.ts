export type PlayerStatus = "waiting" | "started" | "finished";
export type GameStatus = PlayerStatus | "archived";
export type ChangeStatus = "idle" | "up" | "down";

export interface UserInterface {
  _id: string;
  phone: string;
  avatar: string;
  username: string;
  coins: number;
}

export interface PlayerInterface {
  _id: string;
  user: Partial<UserInterface>;
  point: number;
  change?: ChangeStatus;
  prize?: number;
  rank?: number;
  status: PlayerStatus;
  latestQuestion: string | QuestionInterface;
  timeStarted?: number;
  duration: number
}
export interface DepositInterface {
  date: string;
  status: "sucsses" | "cancel";
}

export interface GameInterface {
  _id: string;
  type: number;
  startTime: number;
  endTime: number;
  image: string;
  players: PlayerInterface[];
  status: GameStatus;
  questions: string[];
}

export interface QuestionInterface {
  _id: string;
  body: string;
  options: [string, string, string, string];
}

export type AuthReturnType = {
  user: UserInterface;
  token: string;
};

export type DecodedTokenType = {
  userId: string;
  iat: number;
};
