export interface MatchDatatypes {
  yoil: string;
  time: string;
  marker: Array<{
    title: string;
    latitude: number;
    longitude: number;
  }>;
  location: string;
  chatRoomId: number;
}
