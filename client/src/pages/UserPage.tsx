import { Box, Grid, Stack, Typography } from '@mui/material';
import ExamList from '../components/ExamList';
import PageLayout from '../components/PageLayout';
import SpecialtyCard from '../components/SpecialtyCard';
import { useAppSelector } from '../hooks/useAppRedux';
import { Exam } from '../models/Exam';
import { Specialty, StudentSpecialty } from '../models/Specialty';
import { selectStudentData } from '../store/features/specialtySelectors';
import {
  useDeleteSpecialtyApplicationMutation,
  useGetStudentSpecialtiesQuery,
} from '../store/services/specialtyApi';

const UserPageTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Typography
    variant="h5"
    component="h2"
    mt={4}
    mb={2}
    fontWeight="600"
  >
    {children}
  </Typography>
);

const UserData: React.FC<{
  exams: Exam[];
  email: string;
}> = ({ exams, email }) => (
  <Box component="section">
    <UserPageTitle>Ваши данные</UserPageTitle>
    <Grid container spacing={2}>
      {/* Документ, удостоверяющий личность */}
      <Grid item xs={4}>
        <Typography variant="body1">Email</Typography>
      </Grid>
      <Grid item xs={8}>
        {email}
      </Grid>

      <Grid item xs={4}>
        <Typography variant="body1">
          Документ, удостоверяющий личность
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Box
          sx={{ width: 217, height: 200, bgcolor: 'gray' }}
          component="img"
          alt=""
        ></Box>
      </Grid>

      {/* Фото 3x4 */}
      <Grid item xs={4}>
        <Typography variant="body1">Фото 3x4</Typography>
      </Grid>
      <Grid item xs={8}>
        <Box
          sx={{
            width: 119,
            bgcolor: 'gray',
            aspectRatio: '3 / 4',
          }}
          component="img"
          alt=""
        ></Box>
      </Grid>

      {/* Результаты экзаменов */}
      <Grid item xs={4}>
        <Typography variant="body1">Результаты экзаменов</Typography>
      </Grid>
      <Grid item xs={8}>
        <ExamList exams={exams} />
      </Grid>
    </Grid>
  </Box>
);

const UserSpecialties: React.FC<{
  studentSpicialities: StudentSpecialty[];
  onSpecClick: (specialty: Specialty) => void;
}> = ({ studentSpicialities, onSpecClick }) => (
  <Box component="section">
    <UserPageTitle>Ваши заявления на специальности</UserPageTitle>
    <Stack gap={1}>
      {studentSpicialities.map((spec) => (
        <SpecialtyCard
          key={spec.specialty_code}
          specialty={spec}
          priority={spec.application.application_priority}
          status={spec.application.application_status}
          onClick={onSpecClick}
        />
      ))}
    </Stack>
  </Box>
);

const UserPage = () => {
  const [deleteSpec] = useDeleteSpecialtyApplicationMutation();
  const { isLoading, data: studentSpicialities } =
    useGetStudentSpecialtiesQuery();
  const studentData = useAppSelector(selectStudentData);

  return (
    <PageLayout>
      <UserData
        email={studentData?.student_email || ''}
        exams={studentData?.exams || []}
      />
      {isLoading && 'загрузка...'}
      {studentSpicialities && !isLoading && (
        <UserSpecialties
          onSpecClick={(spec) => {
            deleteSpec({ specialty_code: spec.specialty_code });
          }}
          studentSpicialities={studentSpicialities}
        />
      )}
    </PageLayout>
  );
};

export default UserPage;
