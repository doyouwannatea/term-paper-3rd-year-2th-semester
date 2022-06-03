import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import AuthForm from '../containers/AuthForm';
import StudentRegistrationForm from '../containers/StudentRegistrationForm';
import AuthPage from '../pages/AuthPage';
import SpecialtiesPage from '../pages/SpecialtiesPage';
import UserPage from '../pages/UserPage';
import RequiredAuth from './RequiredAuth';

export enum RoutePaths {
  HOME = '/',
  WELCOME = '/welcome',
  STUDENT_REGISTRATION = '/welcome/student-registration',
  USER = '/user',
}

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutePaths.WELCOME} element={<AuthPage />}>
          <Route index element={<AuthForm />} />
          <Route
            path={RoutePaths.STUDENT_REGISTRATION}
            element={<StudentRegistrationForm />}
          />
        </Route>
        <Route path={RoutePaths.HOME} element={<SpecialtiesPage />} />
        <Route
          path={RoutePaths.USER}
          element={
            <RequiredAuth>
              <UserPage />
            </RequiredAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
