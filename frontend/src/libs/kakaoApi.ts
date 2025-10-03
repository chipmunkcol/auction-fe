export const 주소좌표로변환 = (주소: string) => {
  return new Promise((resolve, reject) => {
    const geocoder = new window.kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(주소, function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        // console.log("🚀 ~ 주소좌표로변환 ~ coords:", coords);
        resolve(coords);
      } else {
        reject(new Error("주소 변환 실패"));
      }
    });
  });
};
