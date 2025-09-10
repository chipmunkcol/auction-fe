import { useQuery } from "@tanstack/react-query";
import { getAuctionDetail } from "../api/api";

interface Props {
  docId?: string;
}

const useAuctionDetail = ({ docId }: Props) => {
  return useQuery({
    queryKey: ["auction-detail", docId],
    queryFn: () => getAuctionDetail(docId as string),
    enabled: !!docId, // docId가 있을 때만 실행,
    retry: 2,
  });
};

export default useAuctionDetail;
