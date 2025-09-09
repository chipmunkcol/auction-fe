import { http, HttpResponse } from "msw";
import { auctionListDummy } from "../../data/auctionList";

const auctionData = auctionListDummy;

export const mockApiHandlers = [
  http.get("auction", ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") ?? "0");
    // const limit = Number(url.searchParams.get("limit") ?? "5");
    const limit = 2;

    const start = page * limit;
    const end = start + limit;
    const slice = auctionData.slice(start, end);

    const hasNextPage = end < auctionData.length;

    return HttpResponse.json({
      auctions: slice,
      total: auctionData.length,
      hasNextPage,
      nextCursor: hasNextPage ? page + 1 : undefined,
    });
  }),
];
