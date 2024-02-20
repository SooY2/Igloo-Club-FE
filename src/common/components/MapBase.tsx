import { useEffect } from 'react';
import { css } from '@emotion/react';
import { MatchDatatypes } from '../../main/types/MatchDatatypes';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

interface MapContainerProps {
  matchData: MatchDatatypes | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setMap: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onMapLoad: any;
}

// if (window.kakao && window.kakao.maps) {
//  mapScript.onload = () => {
//    setTimeout(onLoadKakaoMap, 100);
//  };
// }

const MapBase = ({ matchData, setMap, onMapLoad }: MapContainerProps) => {
  useEffect(() => {
    const mapScript = document.createElement('script');

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_MAP_KEY
    }&autoload=false&libraries=services`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');

        let center;

        if (matchData) {
          if (matchData.location === '광화문') {
            center = new window.kakao.maps.LatLng(
              37.5709578373114,
              126.977928770123,
            );
          } else if (matchData.location === '판교') {
            center = new window.kakao.maps.LatLng(
              37.39525750009229,
              127.11148651523494,
            );
          }
        }

        const mapOption = {
          center: center,
          level: 6,
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);
        setMap(map);

        if (onMapLoad) {
          onMapLoad(map);
        }
      });
    };
    mapScript.addEventListener('load', onLoadKakaoMap);
  }, [matchData, onMapLoad, setMap]);

  return <div id="map" css={MapContainer}></div>;
};

export default MapBase;

const MapContainer = css`
  display: flex;
  width: 34rem;
  height: 20rem;
`;
