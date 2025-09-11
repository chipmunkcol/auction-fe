import type { GdsDspslObjct } from "../../data/types/auction";

// 토지이용계획으로 보내버리기
export const generateLandUsePlanUrl = (auctionData: GdsDspslObjct) => {
  const baseUrl = "http://eum.go.kr/web/ar/lu/luLandDet.jsp";

  const {
    pnuNoCtt,
    userPrintSt,
    rprsAdongSdCd,
    rprsAdongSggCd,
    rprsAdongEmdCd,
    rprsAdongRiCd,
    rprsLtnoAddr,
  } = auctionData;

  const [bobn, bubn = "0000"] = rprsLtnoAddr.split("-");

  const params = new URLSearchParams({
    pnu: pnuNoCtt,
    mode: "search",
    selGbn: "umd",
    fullAddress: userPrintSt,
    isNoScr: "script",
    selSido: rprsAdongSdCd,
    selSgg: rprsAdongSggCd,
    selUmd: `${rprsAdongEmdCd}${rprsAdongRiCd}`,
    selRi: "00",
    landGbn: "1",
    bobn: bobn,
    bubn: bubn || "0000",
  });

  return `${baseUrl}?${params.toString()}`;
};
