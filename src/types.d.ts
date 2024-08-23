export interface Member {
  id: string;
  nickname: string;
  hours: number;
  status: 'online' | 'offline';
  spawners: number;
}
