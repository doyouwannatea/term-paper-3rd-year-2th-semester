import PageLayout from '../../components/PageLayout';
import { useRequiredAuth } from '../../router/useRequiredAuth';
import UserData from './UserData';
import UserSpecialties from './UserSpecialties';

const UserPage = () => {
  useRequiredAuth();

  return (
    <PageLayout>
      <UserData />
      <UserSpecialties />
    </PageLayout>
  );
};

export default UserPage;
