import { Table } from "antd";
import { auctionListDummy, type AuctionItem } from "../../../data/auctionList";
import auctionImg from "../../assets/auctionImg.jpg";

const AuctionTable = () => {
  const data: AuctionItem[] = auctionListDummy;

  return (
    <>
      <Table<AuctionItem> dataSource={data} className="text-center w-full">
        <Table.Column<AuctionItem>
          key="docid"
          title="사진"
          dataIndex={"img"}
          render={() => (
            <div className="w-[100px] h-[80px]">
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
          dataIndex={"printSt"}
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
