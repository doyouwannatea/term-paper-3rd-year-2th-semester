import {
  Card,
  CardContent,
  Stack,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import { useAppSelector } from '../hooks/useAppRedux';
import { Priority, PriorityText } from '../models/Priority';
import { Specialty } from '../models/Specialty';
import { countForm } from '../utils/string';
import ExamList from './ExamList';

type Props = {
  onClick?: (specialty: Specialty) => void;
  specialty: Specialty;
  priority?: Priority;
};

const SpecialtyCard: React.FC<Props> = ({
  onClick,
  specialty,
  priority,
}) => {
  const studentData = useAppSelector(
    (state) => state.specialty.studentData
  );

  return (
    <Card variant="outlined">
      <CardContent>
        {/* HEADER */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5">
            {specialty.specialty_name}
          </Typography>
          <Typography variant="caption">
            {specialty.specialty_code}
          </Typography>
        </Stack>
        {/* HEADER */}

        {/* BODY */}
        <Typography variant="subtitle2">
          {specialty.institute_name}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <ExamList exams={specialty.exams} />
          <Typography variant="caption">
            {specialty.max_students}{' '}
            {countForm(specialty.max_students, [
              'место',
              'места',
              'мест',
            ])}
          </Typography>
        </Stack>
        {/* BODY */}

        {/* CONTROLS */}
        {!priority && studentData && (
          <Button
            onClick={() => onClick && onClick(specialty)}
            sx={{ mt: 2 }}
            variant="contained"
          >
            подать заявление
          </Button>
        )}
        {priority && studentData && (
          <Button
            onClick={() => onClick && onClick(specialty)}
            sx={{ mt: 2 }}
            variant="contained"
          >
            отозвать заявление
          </Button>
        )}
        {/* CONTROLS */}
      </CardContent>
      {priority && (
        <>
          <Divider />
          <CardContent>
            <Typography color="primary" fontWeight="600">
              {priority} приоритет ({PriorityText[priority]})
            </Typography>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default SpecialtyCard;
