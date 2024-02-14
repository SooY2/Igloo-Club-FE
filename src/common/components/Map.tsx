import { useEffect } from 'react';
import { css } from '@emotion/react';
import { MatchDatatypes } from '../../main/types/MatchDatatypes';
import pin from '../assets/images/pin.png';

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

    if (window.kakao && window.kakao.maps) {
      mapScript.onload = () => {
        setTimeout(onLoadKakaoMap, 1000);
      };
    }

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
          level: 5,
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        if (matchData) {
          matchData.marker.forEach((marker) => {
            const position = new window.kakao.maps.LatLng(
              marker.latitude,
              marker.longitude,
            );

            const imageSrc = pin;
            const imageSize = new window.kakao.maps.Size(22, 30);
            const imageOption = { offset: new window.kakao.maps.Point(20, 30) };

            const markerImage = new window.kakao.maps.MarkerImage(
              imageSrc,
              imageSize,
              imageOption,
            );
            const Markers = new window.kakao.maps.Marker({
              position: position,
              image: markerImage,
              title: marker.title,
            });
            Markers.setMap(map);
          });
        }
      });
    };
  }, [matchData]);

  return <div id="map" css={MapContainer}></div>;
};

export default Map;

const MapContainer = css`
  display: flex;
  width: 34rem;
  height: 20rem;
`;
