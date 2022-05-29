import { Box, Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';

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
      <Outlet />
    </Paper>
  </Box>
);
export default AuthPage;
