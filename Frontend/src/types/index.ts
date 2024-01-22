export interface UserInterface {
  _id: string;
  phone: string;
  point: number;
  avatar: { _id: string; url: string };
  username: string;
  coin: number;
}

export interface PlayerInterface {
  user: Partial<UserInterface>;
  isUp: boolean;
  point: number;
  rank:number;
  prize:number;
  status:'wait' | 'in' | 'done',
}
export interface DepositInterface {
 
  date:string;
  status:'sucsses' | 'cancel' ,
}

export interface GameInterface {
  _id: string;
  image: string;
  nowTime: number;
  endTime: number;
  startTime: number;
  players: PlayerInterface[];
  questions: string[];
  status: "before" | "after" | "start" | 'archive';
  latestQuestion: any;
  type: 10000 | 20000 | 50000;
  isPlayerDone:boolean
}

export type AuthReturnType = {
  user: UserInterface;
  token: string;
};

export type DecodedTokenType = {
  userId: string;
  iat: number;
};
