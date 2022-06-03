import { Box, Paper } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { RoutePaths } from '../router/AppRouter';

const AuthPage = () => (
  <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Paper sx={{ p: 4, width: '100%', maxWidth: 500 }}>
      <Link to={RoutePaths.HOME}>на главную страницу</Link>
      <Outlet />
    </Paper>
  </Box>
);
export default AuthPage;
