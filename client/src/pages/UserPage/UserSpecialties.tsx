import { Box, Stack } from '@mui/material';
import SpecialtyCard from '../../components/SpecialtyCard';
import {
  useGetStudentSpecialtiesQuery,
  useDeleteSpecialtyApplicationMutation,
} from '../../store/services/specialtyApi';
import UserPageTitle from './UserPageTitle';

const UserSpecialties = () => {
  const [deleteSpec] = useDeleteSpecialtyApplicationMutation();
  const { isLoading, data: studentSpicialties } =
    useGetStudentSpecialtiesQuery();

  return (
    <Box component="section">
      <UserPageTitle>Ваши заявления на специальности</UserPageTitle>
      {isLoading && 'Загрузка...'}
      {!isLoading && studentSpicialties && (
        <Stack gap={1}>
          {studentSpicialties.map((spec) => (
            <SpecialtyCard
              key={spec.specialty_code}
              specialty={spec}
              priority={spec.application.application_priority}
              status={spec.application.application_status}
              onClick={(spec) =>
                deleteSpec({ specialty_code: spec.specialty_code })
              }
            />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default UserSpecialties;
