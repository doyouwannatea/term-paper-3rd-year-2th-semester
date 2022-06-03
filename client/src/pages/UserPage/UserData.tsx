import { Box, Grid, Typography } from '@mui/material';
import ExamList from '../../components/ExamList';
import { useAppSelector } from '../../hooks/useAppRedux';
import { selectStudentData } from '../../store/features/specialtySelectors';
import UserPageTitle from './UserPageTitle';

const UserData = () => {
  const studentData = useAppSelector(selectStudentData);

  return (
    <Box component="section">
      <UserPageTitle>Ваши данные</UserPageTitle>
      <Grid container spacing={2}>
        {/* Документ, удостоверяющий личность */}
        <Grid item xs={4}>
          <Typography variant="body1">Email</Typography>
        </Grid>
        <Grid item xs={8}>
          {studentData?.student_email}
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
          <Typography variant="body1">
            Результаты экзаменов
          </Typography>
        </Grid>
        <Grid item xs={8}>
          {studentData && <ExamList exams={studentData?.exams} />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserData;
