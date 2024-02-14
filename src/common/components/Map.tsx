import { useEffect } from 'react';
import { css } from '@emotion/react';
import { MatchDatatypes } from '../../main/types/MatchDatatypes';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}
interface MapProps {
  matchData: MatchDatatypes | undefined;
}

const Map = ({ matchData }: MapProps) => {
  useEffect(() => {
    const mapScript = document.createElement('script');

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_MAP_KEY
    }&autoload=false&libraries=services`;

    mapScript.addEventListener('load', () => {
      onLoadKakaoMap();
    });

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        const mapContainer = document.getElementById('map');

        let center;

        if (matchData) {
          if (matchData.location === '광화문') {
            center = new window.kakao.maps.LatLng(37.572776, 126.97689);
          } else if (matchData.location === '판교') {
            center = new window.kakao.maps.LatLng(
              37.39525750009229,
              127.11148651523494,
            );
          }
        }
        const mapOption = {
          center: center,
          level: 3,
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        if (matchData && matchData.marker) {
          matchData.marker.forEach((marker) => {
            const position = new window.kakao.maps.LatLng(
              marker.latitude,
              marker.longitude,
            );
            const kakaoMarker = new window.kakao.maps.Marker({
              position,
              title: marker.title,
            });
            kakaoMarker.setMap(map);
          });
        }
      }
    };
  }, [matchData]);

  return <div id="map" css={MapContainer}></div>;
};

export default Map;

const MapContainer = css`
  width: 34rem;
  height: 20rem;
`;
