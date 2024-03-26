export interface ChatModalTypes {
  yoil: string[];
  time: string[];
  marker: Array<{
    value: string;
    title: string;
    address: string;
    latitude: number;
    longitude: number;
  }>;
  location: string;
}
