import { Link, useParams } from "react-router";
import useAuctionDetail from "../../../hooks/useAuctionDetail";
import { generateLandUsePlanUrl } from "../../../utils/navigater";

const Sidebar = () => {
  const { docId } = useParams();

  const { data } = useAuctionDetail({ docId });
  if (!docId) return <div>잘못된 경로입니다</div>;
  if (!data) return <div>데이터가 없습니다</div>;
  const { gdsDspslObjctLst } = data;

  type Route = "case-detail" | "appraisal";
  const navigateDetail = (docid: string, route: Route) => {
    // navigate(docid);
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    const popupWidth = Math.floor(screenWidth * 0.7); // 화면의 70%
    const popupHeight = screenHeight;
    const left = screenWidth - popupWidth; // 오른쪽 정렬
    const top = 0;

    window.open(
      `${docid}/${route}`,
      "_blank",
      `width=${popupWidth},height=${popupHeight},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );
  };

  return (
    <div className="border border-border">
      <div className="p-2 border-b border-border bg-primary text-background">
        법원경매사이트
      </div>
      <div className="p-2">공시자료</div>
      <div className="p-2 bg-table-head flex-1 flex flex-col gap-2">
        <div className="" onClick={() => navigateDetail(docId, "case-detail")}>
          사건내역
        </div>
        <div onClick={() => navigateDetail(docId, "appraisal")}>감정평가서</div>
        <Link to={generateLandUsePlanUrl(gdsDspslObjctLst[0])} target="_blank">
          <div>토지이용계획</div>
        </Link>
        <div>실거래가 조회</div>
      </div>
    </div>
  );
};

export default Sidebar;
