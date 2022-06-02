import { Box, AppBar, Toolbar, Button, Stack } from '@mui/material';
import { NavLink, Link } from 'react-router-dom';
import { RoutePaths } from '../router/AppRouter';

const isActiveStyle: (props: {
  isActive: boolean;
}) => React.CSSProperties = ({ isActive }) => ({
  textDecoration: isActive ? 'underline' : 'none',
  color: 'inherit',
  padding: '6px 8px',
});

const AppHeader = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Button
          variant="text"
          sx={{
            color: (theme) => theme.palette.common.white,
            padding: 0,
          }}
          component="span"
        >
          <NavLink style={isActiveStyle} to={RoutePaths.HOME}>
            главная страница
          </NavLink>
        </Button>
        <Button
          variant="text"
          sx={{
            color: (theme) => theme.palette.common.white,
            padding: 0,
          }}
          component="span"
        >
          <NavLink style={isActiveStyle} to={RoutePaths.USER}>
            личный кабинет
          </NavLink>
        </Button>
        <Stack direction="row" gap={0.5} sx={{ ml: 'auto' }}>
          <Button
            component={Link}
            to={RoutePaths.WELCOME}
            color="inherit"
          >
            войти
          </Button>
          <Button
            component={Link}
            to={RoutePaths.STUDENT_REGISTRATION}
            variant="outlined"
            color="inherit"
          >
            регистрация
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  </Box>
);

export default AppHeader;
