import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './Router';
import { Global, ThemeProvider } from '@emotion/react';
import globalStyles from './common/styles/globalStyles';
import { theme } from './common/styles/theme';

function App() {
  const setScreenSize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  useEffect(() => {
    setScreenSize();
  });

  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
