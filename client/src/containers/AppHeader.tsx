import { Box, AppBar, Toolbar, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import NavButton from '../components/NavButton';
import { useAppSelector } from '../hooks/useAppRedux';
import { RoutePaths } from '../router/AppRouter';
import { selectStudentData } from '../store/features/specialtySelectors';
import { useLogoutMutation } from '../store/services/specialtyApi';

const AppHeader = () => {
  const [logout] = useLogoutMutation();
  const studentData = useAppSelector(selectStudentData);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <NavButton to={RoutePaths.HOME}>главная страница</NavButton>
          {studentData && (
            <NavButton to={RoutePaths.USER}>личный кабинет</NavButton>
          )}
          <Stack direction="row" gap={0.5} sx={{ ml: 'auto' }}>
            {!studentData && (
              <>
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
              </>
            )}
            {studentData && (
              <Button
                onClick={async () => {
                  await logout();
                  window.location.reload();
                }}
                color="inherit"
              >
                выйти
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppHeader;
