import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { type AuctionItem } from "../../../data/auctionList";
import { getAuction } from "../../api/api";
import auctionImg from "../../assets/auctionImg.jpg";
import { useAuctionStore } from "../../store/AuctionStore";
import { useNavigate } from "react-router";

const AuctionTable = () => {
  const { page, setPage, enabled, search } = useAuctionStore();

  const { data } = useQuery({
    queryKey: ["auction", page, search],
    queryFn: () => getAuction(page, search),
    enabled: enabled,

    placeholderData: keepPreviousData,
  });
  console.log("🚀 ~ AuctionTable ~ data:", data);

  const onChangePage = (page: number) => {
    setPage(page - 1);
  };

  const navigate = useNavigate();
  const navigateDetail = (docid: string) => {
    navigate(docid);
  };

  return (
    <>
      <Table<AuctionItem>
        dataSource={data?.auctions}
        className="text-center w-full"
        pagination={{
          // current: page,
          defaultCurrent: 1,
          total: data?.total || 0,
          pageSize: 2,
          onChange: onChangePage,
        }}
      >
        <Table.Column<AuctionItem>
          key="docid"
          title="사진"
          dataIndex={"img"}
          render={(_, record) => (
            <div
              className="w-[100px] h-[80px]"
              onClick={() => navigateDetail(record.docid)}
            >
              <img className="w-full h-full object-cover" src={auctionImg} />
            </div>
          )}
        />
        <Table.Column<AuctionItem>
          key="docid"
          title={() => (
            <div className="text-center">
              <div>매각기일</div>
              <div>용도</div>
            </div>
          )}
          dataIndex={"maeGiil"}
        />
        <Table.Column<AuctionItem>
          key="docid"
          title="물건기본내역"
          // dataIndex={"printSt"}
          render={(_, record) => (
            <div>
              <div>{record.srnSaNo}</div>
              <div>{record.printSt}</div>
            </div>
          )}
        />
        <Table.Column<AuctionItem>
          key="docid"
          title={() => (
            <div className="text-center">
              <div>감정가</div>
              <div>최저가</div>
            </div>
          )}
          render={(_, record) => (
            <div>
              <div>{record.gamevalAmt}</div>
              <div>{record.notifyMinmaePrice1}</div>
            </div>
          )}
        />
        <Table.Column<AuctionItem>
          key="docid"
          title="상태"
          dataIndex={"yuchalCnt"}
          render={(text) => <div>유찰 {text}회</div>}
        />
        <Table.Column<AuctionItem>
          key="docid"
          title="조회"
          render={() => <div>1</div>}
        />
      </Table>
    </>
  );
};

export default AuctionTable;
