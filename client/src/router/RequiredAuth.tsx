import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppRedux';
import { selectStudentData } from '../store/features/specialtySelectors';
import { RoutePaths } from './AppRouter';

type Props = {
  children: React.ReactNode;
};

const RequiredAuth: React.FC<Props> = ({ children }) => {
  const studentData = useAppSelector(selectStudentData);
  if (!studentData) {
    return <Navigate to={RoutePaths.HOME} />;
  }
  return <>{children}</>;
};

export default RequiredAuth;
