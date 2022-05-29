import {
  Card,
  CardContent,
  Stack,
  Typography,
  Box,
  Button,
} from '@mui/material';

type Props = {
  onClick: () => void;
};

const SpecialtyCard: React.FC<Props> = ({ onClick }) => (
  <Card variant="outlined">
    <CardContent>
      {/* HEADER */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5">
          Информационные системы и технологии
        </Typography>
        <Typography variant="caption">09.03.02</Typography>
      </Stack>
      {/* HEADER */}

      {/* BODY */}
      <Typography variant="subtitle2">
        Институт информационных технологий и анализа данных
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
      >
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
        <Typography variant="caption">78 мест</Typography>
      </Stack>
      {/* BODY */}

      {/* CONTROLS */}
      <Button onClick={onClick} sx={{ mt: 2 }} variant="contained">
        подать заявление
      </Button>
      {/* CONTROLS */}
    </CardContent>
  </Card>
);

export default SpecialtyCard;
