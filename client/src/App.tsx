import { CssBaseline } from '@mui/material';
import { useEffect } from 'react';
import AppRouter from './router/AppRouter';
import { useAuthMutation } from './store/services/specialtyApi';

const App = () => {
  const [auth] = useAuthMutation();

  useEffect(() => {
    auth();
  }, []);

  return (
    <>
      <CssBaseline />
      <AppRouter />
    </>
  );
};

export default App;
