import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppRedux';
import { RoutePaths } from './AppRouter';

type Props = {
  children: React.ReactNode;
};

const RequiredAuth: React.FC<Props> = ({ children }) => {
  const studentData = useAppSelector(
    (state) => state.specialty.studentData
  );
  if (!studentData) {
    return <Navigate to={RoutePaths.HOME} />;
  }
  return <>{children}</>;
};

export default RequiredAuth;
