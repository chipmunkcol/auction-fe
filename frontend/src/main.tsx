import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./hooks/ThemeContext.tsx";
import { ConfigProvider } from "antd";

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

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <ThemeProvider>
    <ConfigProvider
      // theme={getAntdTheme()}
      theme={{
        token: {
          // colorPrimary: getCssVar("--primary"),
        },
        components: {
          Button: {
            colorPrimary: getCssVar("--primary"),
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
);
