import {
  Alert,
  Paper,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
} from '@mui/material';
import { Exam } from '../models/Exam';

type Props = {
  sx?: SxProps<Theme>;
  studentExams: Exam[];
  requiredExams: Exam[];
};

const borderRight: SxProps<Theme> = (theme) => ({
  borderRight: `1px solid ${theme.palette.grey[200]}`,
});

const ExamsTable: React.FC<Props> = ({
  sx,
  requiredExams,
  studentExams,
}) => {
  const examsMaxLen = Math.max(
    requiredExams.length,
    studentExams.length
  );

  const findWarnings = () => {
    const warnings: JSX.Element[] = [];
    requiredExams.forEach((exam) => {
      const studentExam = studentExams.find(
        (studentExam) => studentExam.exam_name === exam.exam_name
      );
      if (!studentExam) {
        return warnings.push(
          <Alert key={exam.exam_name} severity="warning">
            у вас отсутствуют результаты экзамена{' '}
            <b>{exam.exam_name}</b>
          </Alert>
        );
      }
      if (studentExam.exam_points < exam.exam_points) {
        return warnings.push(
          <Alert key={exam.exam_name} severity="warning">
            у вас меньше необходимого количества баллов по предмету{' '}
            <b>{exam.exam_name}</b>
          </Alert>
        );
      }
    });
    return warnings;
  };

  return (
    <>
      <TableContainer sx={sx} component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={borderRight} align="center" colSpan={2}>
                <b>ваши результаты экзаменов</b>
              </TableCell>
              <TableCell align="center" colSpan={2}>
                <b>необходимые экзамены</b>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>экзамен</b>
              </TableCell>
              <TableCell sx={borderRight}>
                <b>баллы</b>
              </TableCell>
              <TableCell>
                <b>экзамен</b>
              </TableCell>
              <TableCell>
                <b>баллы</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...new Array(examsMaxLen)].map((_, idx) => (
              <TableRow
                key={
                  studentExams[idx]?.exam_name +
                  requiredExams[idx]?.exam_name
                }
              >
                <TableCell>{studentExams[idx]?.exam_name}</TableCell>
                <TableCell sx={borderRight}>
                  {studentExams[idx]?.exam_points}
                </TableCell>
                <TableCell>{requiredExams[idx]?.exam_name}</TableCell>
                <TableCell>
                  {requiredExams[idx]?.exam_points}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {findWarnings()}
    </>
  );
};
export default ExamsTable;
