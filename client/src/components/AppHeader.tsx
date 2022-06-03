import { Box, AppBar, Toolbar, Button, Stack } from '@mui/material';
import { NavLink, Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppRedux';
import { RoutePaths } from '../router/AppRouter';
import { selectStudentData } from '../store/features/specialtySelectors';
import { useLogoutMutation } from '../store/services/specialtyApi';

const isActiveStyle: (props: {
  isActive: boolean;
}) => React.CSSProperties = ({ isActive }) => ({
  textDecoration: isActive ? 'underline' : 'none',
  color: 'inherit',
  padding: '6px 8px',
});

const AppHeader = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const studentData = useAppSelector(selectStudentData);

  return (
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
          {studentData && (
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
          )}
          <Stack direction="row" gap={0.5} sx={{ ml: 'auto' }}>
            {!studentData && !isLoading && (
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
            {studentData && !isLoading && (
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
