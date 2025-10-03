import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./hooks/ThemeContext.tsx";
import { ConfigProvider } from "antd";
import koKR from "antd/locale/ko_KR";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

async function prepare() {
  const { setupWorker } = await import("msw/browser");
  const { mockApiHandlers } = await import("./mock/apiHandlers.ts");
  const worker = setupWorker(...mockApiHandlers);
  return worker.start({
    onUnhandledRequest: "bypass", // msw가 처리하지 않는 요청은 그대로 진행
  });
}

const queryClient = new QueryClient();

prepare().then(() => {
  createRoot(document.getElementById("root")!).render(
    // <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ConfigProvider
          // theme={getAntdTheme()}App
          locale={koKR}
          theme={{
            token: {
              // colorPrimary: getCssVar("--primary"),
              borderRadius: 0,
              colorText: getCssVar("--foreground"),
              colorTextSecondary: getCssVar("--muted-foreground"),
            },
            components: {
              Table: {
                headerBg: getCssVar("--table-head"),
                borderColor: getCssVar("--border"),
              },
              Descriptions: {
                // labelBg: getCssVar("--table-head"), // 라벨 배경
                colorTextLabel: getCssVar("--table-head-foreground"), // 라벨 텍스트색
                // colorBgContainer: getCssVar("--card"), // 컨테이너 배경
              },
              Button: {
                colorPrimary: getCssVar("--primary"),
              },

              DatePicker: {
                borderRadius: 0,
              },
              Input: {
                // input은 효과없는게 좋을듯
                borderRadius: 0,

                colorBorder: "#d9d9d9", // 기본 테두리
                // controlInteractive: '#d9d9d9', // hover/active 시 강조색 제거
                controlItemBgHover: "transparent", // hover 시 배경 없음
                controlItemBgActive: "transparent", // active 시 배경 없음
              },
            },
          }}
        >
          <App />
        </ConfigProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
});

function getCssVar(name: string) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

export function getAntdTheme() {
  return {
    token: {
      colorPrimary: getCssVar("--primary"),
    },
  };
}
