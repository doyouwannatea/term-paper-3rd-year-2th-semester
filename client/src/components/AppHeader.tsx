import { Box, AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const AppHeader = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Button
          variant="text"
          sx={{ color: (theme) => theme.palette.common.white }}
          component={Link}
          to="/specialties"
        >
          главная страница
        </Button>
        <Button
          variant="text"
          sx={{ color: '#fff' }}
          component={Link}
          to="/user"
        >
          личный кабинет
        </Button>
        <Box ml="auto">
          <Button color="inherit">Login</Button>
        </Box>
      </Toolbar>
    </AppBar>
  </Box>
);

export default AppHeader;
