import { create } from "zustand";

export type Search = {
  printSt: string;
  srnSaNo: string;
};

const initSearch = {
  printSt: "",
  srnSaNo: "",
};

interface AuctionState {
  page: number;
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;

  // 검색
  search: Search;
  setSearch: (newSearch: Search) => void;

  // 최초의 검색 버튼을 눌러야 경매리스트 fetch 동작
  enabled: boolean;
  startEnabled: () => void;
}

export const useAuctionStore = create<AuctionState>((set) => ({
  page: 0,
  setPage: (page) => set({ page }),
  nextPage: () => set((state) => ({ page: state.page + 1 })),
  prevPage: () => set((state) => ({ page: Math.max(state.page - 1, 0) })),

  // 검색
  search: initSearch,
  setSearch: (newSearch) => set({ search: newSearch }),
  // setSearch: (key, value) =>
  //   set((state) => ({
  //     search: {
  //       ...state.search,
  //       [key]: value,
  //     },
  //   })),

  enabled: false,
  startEnabled: () => set({ enabled: true }),
}));
