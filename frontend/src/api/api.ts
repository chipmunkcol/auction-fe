import axios from "axios";
import type { AuctionItem } from "../../data/auctionList";
import type { Search } from "../store/AuctionStore";

interface Response_aucion {
  auctions: AuctionItem[] | [];
  total: number;
  hasNextPage: boolean;
  nextCursor: number | undefined;
}

export const getAuction = async (
  page = 0,
  search: Search
): Promise<Response_aucion> => {
  const { srnSaNo, printSt } = search;
  const params = new URLSearchParams({
    page: page.toString(),
    srnSaNo,
    printSt,
  });

  return (await axios.get(`/auction?${params.toString()}`)).data;
};

// 무한스크롤 가정
// 포인트는 useInfiniteQuery이 요구하는 queryFn의 return 값을 맞춰주는 것

// export const getAuction = async ({
//   pageParam,
//   limit = 2,
// }: {
//   pageParam: number;
//   limit?: number;
// }): Promise<Response_aucion> => {
//   const auctionList = (await axios.get("/auction?")).data;
//   const auctionLength = auctionList.length;

//   const hasNextPage = auctionLength - pageParam * limit > limit;

//   const pagedAuctionList = auctionList.slice(
//     pageParam * limit,
//     pageParam * limit + limit
//   );

//   return {
//     auctions: pagedAuctionList || [],
//     total: auctionLength,
//     hasNextPage,
//     nextCursor: hasNextPage ? pageParam + 1 : undefined,
//   };
// };
