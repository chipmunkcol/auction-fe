// 날짜 변환 (20250827 → 2025-08-27)
export const formatDate = (dateStr: string) => {
  return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
};

// 시간 변환 (1000 → 10:00)
export const formatTime = (timeStr: string) => {
  if (!timeStr) return "";
  return `${timeStr.slice(0, 2)}:${timeStr.slice(2, 4)}`;
};

// 숫자 3자리 콤마
export const formatNumber = (numStr: string) => {
  return Number(numStr).toLocaleString();
};
