export interface Message {
  s: string; 
  t: number; 
  m?: string;
  i?: string[]; 
  f?: string;
}

export interface Chat {
  user1: string; 
  user2: string;
  chatId: string; 
  messages: Message[]; 
  id: string;
}


export interface Report{
  sender: string; 
  reported: string;
  reason: string; 
  type: string;
  chat: Chat; 
}