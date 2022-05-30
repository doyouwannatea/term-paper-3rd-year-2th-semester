import { Box, AppBar, Toolbar, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { RoutePaths } from '../router/AppRouter';

const AppHeader = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Button
          variant="text"
          sx={{ color: (theme) => theme.palette.common.white }}
          component={Link}
          to={RoutePaths.HOME}
        >
          главная страница
        </Button>
        <Button
          variant="text"
          sx={{ color: '#fff' }}
          component={Link}
          to={RoutePaths.USER}
        >
          личный кабинет
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
