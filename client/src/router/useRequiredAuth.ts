import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppRedux';
import {
  selectLoading,
  selectStudentData,
} from '../store/features/specialtySelectors';
import { RoutePaths } from './AppRouter';

export const useRequiredAuth = () => {
  const navigate = useNavigate();
  const studentData = useAppSelector(selectStudentData);
  const loading = useAppSelector(selectLoading);

  useEffect(() => {
    if (studentData || loading) return;
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
      return;
    }
    navigate(RoutePaths.HOME, { replace: true });
  }, [studentData, loading]);
};
