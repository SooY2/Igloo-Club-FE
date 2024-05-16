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

interface MarkerTypes {
  marker: Array<{
    title: string;
    address: string;
    latitude: number;
    longitude: number;
  }>;
}

interface MapProps {
  matchData: MatchDatatypes | undefined;
  setIsClickedMarker?: React.Dispatch<
    React.SetStateAction<{ title: string; address: string } | null>
  >;
}

const Map = ({ matchData, setIsClickedMarker }: MapProps) => {
  const [clickedMarker, setClickedMarker] = useState<number | null>(null);
  const [map, setMap] = useState<MarkerTypes>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [markers, setMarkers] = useState<any[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMapLoad = useCallback((mapInstance: any) => {
    setMap(mapInstance);
  }, []);

  useEffect(() => {
    if (map && matchData) {
      markers.forEach((existingMarker) => {
        existingMarker.setMap(null);
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newOverlays: any[] = [];

      matchData.marker.forEach((marker, index) => {
        const position = new window.kakao.maps.LatLng(
          marker.latitude,
          marker.longitude,
        );

        const isClicked = index === clickedMarker;

        const content = `
          <div>
            <img src="${isClicked ? clickedpin : pin}" alt="Marker"
            style='width: ${
              isClicked ? '35px' : '22px'
            }; height: ${isClicked ? '48px' : '30px'} />
          </div>
      `;

        const overlay = new window.kakao.maps.CustomOverlay({
          position: position,
          content: content,
        });

        overlay.setMap(map);

        window.kakao.maps.event.addListener(overlay, 'click', () => {
          handleClickMarker(index);
        });

        window.kakao.maps.event.addListener(overlay, 'touchstart', () => {
          handleClickMarker(index);
        });

        window.kakao.maps.event.addListener(overlay, 'touchend', () => {
          handleClickMarker(index);
        });

        newOverlays.push(overlay);
      });

      setMarkers(newOverlays);
    }
  }, [map, matchData, clickedMarker, markers]);

  const handleClickMarker = (index: number) => {
    setClickedMarker((prevIndex) => (prevIndex === index ? null : index));

    if (setIsClickedMarker) {
      setIsClickedMarker({
        title: matchData?.marker[index].title || '',
        address: matchData?.marker[index].address || '',
      });
    }
  };

  return (
    <div css={MapContainer}>
      <MapBase
        matchData={matchData}
        onMapLoad={handleMapLoad}
        setMap={setMap}
      />
    </div>
  );
};

export default Map;

const MapContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;
