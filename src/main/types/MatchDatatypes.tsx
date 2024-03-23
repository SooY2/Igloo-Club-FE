export interface MatchDatatypes {
  matchYoil: string[];
  matchDate: string;
  time: string[];
  marker: Array<{
    title: string;
    address: string;
    latitude: number;
    longitude: number;
  }>;
  location: string;
  chatRoomId?: number | null;
}
