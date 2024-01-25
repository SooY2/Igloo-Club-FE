import { RouterProvider } from 'react-router-dom';
import router from './Router';

function App() {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minWidth: '360px',
      }}
    >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
