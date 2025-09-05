import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider  } from './hooks/ThemeContext.tsx';
import { ConfigProvider } from 'antd';

function getCssVar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export function getAntdTheme() {
  return {
    token: {
      colorPrimary: getCssVar("--primary"),
    },
  };
}

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <ThemeProvider>
    <ConfigProvider
      theme={getAntdTheme()}
    >
      <App />
    </ConfigProvider>
  </ThemeProvider>
)
