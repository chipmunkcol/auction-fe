import axios from "axios";
import type { AuctionItem } from "../../data/auctionList";
import type { Search } from "../store/AuctionStore";
import type { AuctionDetail } from "./../../data/types/auction.d.ts";

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

interface ApiResponse<T> {
  status: number;
  message: string;
  data: {
    data: T;
  };
}

export const getAuctionDetail = async (
  docId: string
): Promise<AuctionDetail> => {
  // return (await axios.get(`/auction/${docId}`))?.data?.data.data;

  try {
    const response: ApiResponse<AuctionDetail> = await axios.get(
      `/auction/${docId}`
    );

    if (response.status !== 200) {
      throw new Error(response.message || "데이터 조회에 실패했습니다");
    }

    const result = response.data.data;
    return result;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error("알 수 없는 오류 발생!");
  }
};

export const postAuctionLike = async (userId: string, docId: string) => {
  try {
    const response = await axios.post(`/users/${userId}/likes/auction`, {
      docId,
    });

    if (response.status !== 200) {
      throw new Error("좋아요 실패");
    }
    return response.data?.message;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error("알 수 없는 오류 발생!");
  }
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
