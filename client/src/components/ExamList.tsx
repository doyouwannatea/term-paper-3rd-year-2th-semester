import { Box, Typography } from '@mui/material';
import { Exam } from '../models/Exam';
import { countForm } from '../utils/string';

type Props = { exams: Exam[] };

const ExamList: React.FC<Props> = ({ exams }) => (
  <Box
    sx={{ listStylePosition: 'inside', marginBlock: 1, p: 0 }}
    component="ul"
  >
    {exams.map((examItem) => (
      <Typography
        key={examItem.exam_name}
        variant="body1"
        component="li"
      >
        {examItem.exam_name} -{' '}
        <b>
          {examItem.exam_points}{' '}
          {countForm(examItem.exam_points, [
            'балл',
            'балла',
            'баллов',
          ])}
        </b>
      </Typography>
    ))}
  </Box>
);

export default ExamList;
