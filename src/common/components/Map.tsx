import { useState, useEffect } from 'react';
import { css } from '@emotion/react';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

const Map = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [, setMap] = useState<any>();

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
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.4964, 126.9546),
          level: 3,
        };

        setMap(new window.kakao.maps.Map(mapContainer, mapOption));
      });
    };
    mapScript.addEventListener('load', onLoadKakaoMap);
  }, []);

  return <div id="map" css={MapContainer}></div>;
};

export default Map;

const MapContainer = css`
  width: 34rem;
  height: 20rem;
`;
