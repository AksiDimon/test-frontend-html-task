// import React from 'react'
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./components/Sidebar";
import { useState, useEffect } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import styled from 'styled-components';
library.add(fas);




const GlobalStyle = createGlobalStyle`
// html {
//     background-color: var(--color-sidebar-background-${p => p.theme.mode}-default);
//     color:            var(--color-text-${p => p.theme.mode}-default);
//     transition: background-color .3s ease, color .3s ease;
//   }
  body {
    margin: 0;
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    background-color: var(--color-sidebar-background-${props => props.theme.mode}-default);
    transition: background-color .3s ease;
  }
`;

const ThemeButton = styled.button`
  position: fixed;
  top: 16px;
  right: 16px;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;


  background-color: var(
    --color-button-background-${p => p.theme.mode}-${p => p.isActive ? 'active' : 'default'}
  );
 
  color: var(--color-text-logo-${p => p.theme.mode}-default:);

  cursor: pointer;
  transition: background-color .2s ease, color .2s ease;

  &:hover {
    /* при ховере можно сделать активным фон */
    background-color: var(--color-button-background-${p => p.theme}-active);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-text-${p => p.theme}-default);
  }
`;

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  }); 

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme])


  function handleTheme() {
    setTheme((theme) => theme === 'light' ? 'dark' : 'light')
  }
  return (
    <ThemeProvider theme={{mode :theme}}>
      <GlobalStyle />
      <ThemeButton
      theme={theme}
      isActive={false}
        onClick={handleTheme}
      >
        Switch to {theme === 'light' ? 'dark' : 'light'}
      </ThemeButton>

      <Sidebar color={theme} />
    </ThemeProvider>
  );
}
