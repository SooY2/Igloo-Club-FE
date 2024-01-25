import { RouterProvider } from 'react-router-dom';
import router from './Router';
import { Global, ThemeProvider } from '@emotion/react';
import globalStyles from './common/styles/globalStyles';
import { theme } from './common/styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
