import { useState, useEffect, useCallback } from 'react';
import { css } from '@emotion/react';
import { MatchDatatypes } from '../../main/types/MatchDatatypes';
import MapBase from './MapBase';
import pin from '../assets/images/pin.png';
import clickedpin from '../assets/images/clickedpin.png';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

interface MapProps {
  matchData: MatchDatatypes | undefined;
  setIsClickedMarker?: React.Dispatch<
    React.SetStateAction<{ title: string; address: string } | null>
  >;
}

const Map = ({ matchData, setIsClickedMarker }: MapProps) => {
  const [clickedMarker, setClickedMarker] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [map, setMap] = useState<any>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMapLoad = useCallback((mapInstance: any) => {
    setMap(mapInstance);
  }, []);

  useEffect(() => {
    if (map) {
      if (matchData) {
        matchData.marker.forEach((marker, index) => {
          const position = new window.kakao.maps.LatLng(
            marker.latitude,
            marker.longitude,
          );

          const imageSrc = index === clickedMarker ? clickedpin : pin;
          const imageSize =
            index === clickedMarker
              ? new window.kakao.maps.Size(35, 48)
              : new window.kakao.maps.Size(22, 30);
          const imageOption =
            index === clickedMarker
              ? { offset: new window.kakao.maps.Point(30, 40) }
              : { offset: new window.kakao.maps.Point(20, 30) };

          const markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption,
          );

          const markers = new window.kakao.maps.Marker({
            position: position,
            image: markerImage,
            title: marker.title,
          });

          markers.setMap(map);

          window.kakao.maps.event.addListener(
            markers,
            'touchstart',
            function () {
              handleClickMarker(index);
            },
          );

          window.kakao.maps.event.addListener(markers, 'click', function () {
            handleClickMarker(index);
          });
        });
      }
    }

    const handleClickMarker = (index: number) => {
      setClickedMarker((prevIndex) => (prevIndex === index ? null : index));

      if (setIsClickedMarker) {
        setIsClickedMarker({
          title: matchData?.marker[index].title || '',
          address: matchData?.marker[index].address || '',
        });
      }
    };
  }, [map, matchData, clickedMarker, setClickedMarker, setIsClickedMarker]);

  return (
    <div css={MapContainer}>
      <MapBase onMapLoad={handleMapLoad} setMap={setMap} />
    </div>
  );
};

export default Map;

const MapContainer = css`
  display: flex;
  width: 34rem;
  height: 20rem;
`;
