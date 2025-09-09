import { http, HttpResponse } from "msw";
import { auctionListDummy } from "../../data/auctionList";
import { auctionDetail } from "../../data/auctionDetail/auctionDetail";

const auctionData = auctionListDummy;
const auctionDetailData = auctionDetail.data.dma_result;

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
];
