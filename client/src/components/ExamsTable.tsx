import {
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

type Props = {
  sx?: SxProps<Theme>;
};

interface Exam {
  name: string;
  points: number;
}

const studentExams: Exam[] = [
  { name: 'Профильная математика', points: 50 },
  { name: 'Русский язык', points: 70 },
  { name: 'Информатика', points: 80 },
];

const specialtyExams: Exam[] = [
  { name: 'Профильная математика', points: 60 },
  { name: 'Русский язык', points: 56 },
  { name: 'Информатика', points: 70 },
];

const borderRight: SxProps<Theme> = (theme) => ({
  borderRight: `1px solid ${theme.palette.grey[200]}`,
});

const ExamsTable: React.FC<Props> = ({ sx }) => (
  <TableContainer sx={sx} component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
        {studentExams.map((exam) => (
          <TableRow key={exam.name}>
            <TableCell>{exam.name}</TableCell>
            <TableCell sx={borderRight}>{exam.points}</TableCell>
            <TableCell>{exam.name}</TableCell>
            <TableCell>{exam.points}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
export default ExamsTable;
