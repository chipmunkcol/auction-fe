import { useEffect, useMemo, useRef } from "react";
import { auctionDetail } from "../../data/auctionDetail/auctionDetail";
import { auctionListDummy } from "../../data/auctionList";
import auctionImg from "@/assets/auctionImg.jpg";
import { 주소좌표로변환 } from "../libs/kakaoApi";

const 클러스터줌레벨 = 6;
export default function Main() {
  const 경매리스트 = auctionListDummy;
  const mapRef = useRef(null);
  const markerRef = useRef([]);
  const overlayRef = useRef([]);

  useEffect(() => {
    async function initMap() {
      let mapContainer = document.getElementById("map"); // 지도를 표시할 div

      const 첫번째좌표값 = await 주소좌표로변환(경매리스트[0].printSt);
      const mapOption = {
        center: 첫번째좌표값, // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

      // 지도를 생성합니다
      mapRef.current = new window.kakao.maps.Map(mapContainer, mapOption);

      if (!mapRef.current) return;

      // 마커 클러스터 생성하기
      const clusterer = new window.kakao.maps.MarkerClusterer({
        map: mapRef.current,
        averageCenter: true,
        minLevel: 클러스터줌레벨,
      });

      const markers = await Promise.all(
        경매리스트.map(async (item) => {
          const coords = await 주소좌표로변환(item.printSt);
          // coordsList.push(coords);

          // 마커를 생성합니다
          const marker = new window.kakao.maps.Marker({
            // map: mapRef.current,
            position: coords,
          });
          markerRef.current.push(marker);
          marker.setMap(null); // 클러스터러가 관리하므로 지도에서 제거

          // 커스텀 오버레이
          const content = `
          <div style="text-align: center; border: 1px solid #2563eb; border-radius: 1rem 1rem 0 0;">
            <div style="border-radius: 1rem 1rem 0 0; padding: 0 0.375rem; background-color: #3b82f6; color: white;">
              ${item.dspslUsgNm}
            </div>
            <div style="padding: 0.75rem; background-color: #ffffff; color: #3b82f6;">
              ${item.notifyMinmaePrice1}
            </div>
          </div>
        `;

          const overlay = new window.kakao.maps.CustomOverlay({
            map: mapRef.current,
            position: coords,
            content: content,
            yAnchor: 1,
            zIndex: 3,
          });
          overlayRef.current.push(overlay);

          return marker;
        })
      );

      // console.log("🚀 ~ initMap ~ markers:", markers);
      clusterer.addMarkers(markers);

      // 지도 레벨이 clusterer에 도달했을 떄 오버레이 제거
      window.kakao.maps.event.addListener(
        mapRef.current,
        "zoom_changed",
        function () {
          const level = mapRef.current.getLevel();
          if (level >= 클러스터줌레벨 && overlayRef.current.length > 0) {
            overlayRef.current.forEach((overlay) => overlay.setMap(null));
          } else {
            overlayRef.current.forEach((overlay) =>
              overlay.setMap(mapRef.current)
            );
          }
        }
      );
    }

    initMap();
  }, []);

  const 지도이동 = async (주소: string) => {
    const 좌표 = await 주소좌표로변환(주소);
    mapRef.current.setCenter(좌표);
  };

  return (
    <div className="flex flex-col h-full">
      <header className="h-[80px] flex items-center justify-center">
        <div>searchbar input + 버튼</div>
      </header>
      <div className="flex h-[calc(100vh-176px)]">
        {/* <div className="flex flex-1 min-h-0"> */}
        <ul className="w-2/7 h-full overflow-y-auto">
          {경매리스트.map((item) => (
            <li
              key={item.docid}
              className="flex gap-6 p-4 border-b cursor-pointer"
              onClick={() => 지도이동(item.printSt)}
            >
              <div className="w-[120px] h-[90px] flex-shrink-0">
                <img className="w-full h-full" src={auctionImg} />
              </div>
              <div>
                <div>{item?.maeGiil}</div>
                <div>{item?.srnSaNo}</div>
                <div>{item?.printSt}</div>
                <div>감정가: {item?.gamevalAmt}</div>
                <div>최저가: {item?.notifyMinmaePrice1}</div>
              </div>
            </li>
          ))}
        </ul>
        <div id="map" className="w-5/7 h-full"></div>
      </div>
    </div>
  );
}
