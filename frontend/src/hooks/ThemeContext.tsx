import { createContext, useEffect, useState, type ReactNode } from "react"

type Theme = {
  theme: string;
  toggleTheme: ()=> void
}

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<Theme>({
  theme: 'light',
  toggleTheme: () => {},
})

export const ThemeProvider = ({children}: {children: ReactNode}) => {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => { 
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
