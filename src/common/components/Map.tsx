import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { MatchDatatypes } from '../../main/types/MatchDatatypes';
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

  useEffect(() => {
    const mapScript = document.createElement('script');

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_MAP_KEY
    }&autoload=false&libraries=services`;

    if (window.kakao && window.kakao.maps) {
      mapScript.onload = () => {
        setTimeout(onLoadKakaoMap, 100);
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
      });

      const handleClickMarker = (index: number) => {
        setClickedMarker((prevIndex) => (prevIndex === index ? null : index));

        if (setIsClickedMarker) {
          setIsClickedMarker({
            title: matchData?.marker[index].title || '',
            address: matchData?.marker[index].address || '',
          });
        }
      };
    };
  }, [matchData, clickedMarker, setClickedMarker, setIsClickedMarker]);

  return <div id="map" css={MapContainer}></div>;
};

export default Map;

const MapContainer = css`
  display: flex;
  width: 34rem;
  height: 20rem;
`;
