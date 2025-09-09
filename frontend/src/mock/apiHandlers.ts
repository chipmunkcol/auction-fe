import { http, HttpResponse } from "msw";
import { auctionListDummy } from "../../data/auctionList";
import { auctionDetail } from "../../data/auctionDetail/auctionDetail";
import { userDummy } from "./../../data/user/userData";

const auctionData = auctionListDummy;
const auctionDetailData = auctionDetail.data.dma_result;
const userData = userDummy;

export const mockApiHandlers = [
  http.get("/auction", ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") ?? "0");
    // const limit = Number(url.searchParams.get("limit") ?? "5");
    const limit = 2;
    const srnSaNoSearch = url.searchParams.get("srnSaNo");
    const printStSearch = url.searchParams.get("printSt");

    // Filter data based on search parameters
    let filteredData = auctionData;

    if (srnSaNoSearch) {
      filteredData = filteredData.filter((item) =>
        item.srnSaNo?.toString().includes(srnSaNoSearch)
      );
    }

    if (printStSearch) {
      filteredData = filteredData.filter((item) =>
        item.printSt?.toLowerCase().includes(printStSearch.toLowerCase())
      );
    }

    const start = page * limit;
    const end = start + limit;
    const slice = filteredData.slice(start, end);

    const hasNextPage = end < filteredData.length;

    return HttpResponse.json({
      auctions: slice,
      total: filteredData.length,
      hasNextPage,
      nextCursor: hasNextPage ? page + 1 : undefined,
    });
  }),

  http.get("/auction/:docId", ({ params }) => {
    const { docId } = params;
    console.log("🚀 ~ docId:", docId);

    return HttpResponse.json({ data: auctionDetailData });
  }),

  http.post("/users/:userId/likes/auction", async ({ params, request }) => {
    const { userId } = params;
    const { docId } = (await request.json()) as { docId: string };
    // userId 별로 좋아요한 docid 추가 삭제
    const userIndex = userData.findIndex((user) => user.아이디 === userId);
    const targetUser = userData[userIndex];
    if (userIndex === -1) return new HttpResponse(null, { status: 400 });

    if (targetUser.좋아요.includes(docId)) {
      userData[userIndex].좋아요 = targetUser.좋아요.filter((v) => v !== docId);
      return HttpResponse.json({ message: "좋아요 취소 성공" });
    } else {
      targetUser.좋아요.push(docId);
      return HttpResponse.json({ message: "좋아요 성공" });
    }
  }),
];
