import { Box, Grid, Stack, Typography } from '@mui/material';
import PageLayout from '../components/PageLayout';
import SpecialtyCard from '../components/SpecialtyCard';

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

const UserData = () => (
  <Box component="section">
    <UserPageTitle>Ваши данные</UserPageTitle>
    <Grid container spacing={2}>
      {/* Документ, удостоверяющий личность */}
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
        <Box
          sx={{ listStylePosition: 'inside', marginBlock: 1, p: 0 }}
          component="ul"
        >
          <Typography variant="body1" component="li">
            Профильная математика - <b>60 баллов</b>
          </Typography>
          <Typography variant="body1" component="li">
            Русский язык - <b>56 баллов</b>
          </Typography>
          <Typography variant="body1" component="li">
            Информатика - <b>70 баллов</b>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  </Box>
);

const UserSpecialties = () => (
  <Box component="section">
    <UserPageTitle>Ваши заявления на специальности</UserPageTitle>
    <Stack gap={1}>
      <SpecialtyCard />
      <SpecialtyCard />
    </Stack>
  </Box>
);

const UserPage = () => {
  return (
    <PageLayout>
      <UserData />
      <UserSpecialties />
    </PageLayout>
  );
};

export default UserPage;
