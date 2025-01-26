import { Outlet } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

// components
import Navbar from './components/Navbar';

function App() {
  return (
    <SnackbarProvider
      autoHideDuration={3000}
      preventDuplicate
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Navbar />
      <Outlet />
    </SnackbarProvider>
  );
}

export default App;
