import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthForm from '../containers/AuthForm';
import StudentRegistrationForm from '../containers/StudentRegistrationForm';
import AuthPage from '../pages/AuthPage';
import SpecialtiesPage from '../pages/SpecialtiesPage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />}>
          <Route index element={<AuthForm />} />
          <Route
            path="student-registration"
            element={<StudentRegistrationForm />}
          />
        </Route>
        <Route path="/specialties" element={<SpecialtiesPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
