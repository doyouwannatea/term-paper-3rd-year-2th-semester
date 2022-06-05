import {
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  DialogActions,
  Button,
  DialogProps,
  Alert,
} from '@mui/material';
import { useState } from 'react';
import ExamsTable from '../components/ExamsTable';
import { useAppSelector } from '../hooks/useAppRedux';
import { Priority } from '../models/Priority';
import {
  selectActiveSpecialty,
  selectStudentData,
} from '../store/features/specialtySelectors';
import { useSendSpecialtyApplicationMutation } from '../store/services/specialtyApi';
import { handleQueryError } from '../utils/error';

const ApplySpecialtyDialog: React.FC<DialogProps> = (props) => {
  const [
    sendApplication,
    { isError, error, isLoading, isSuccess, reset },
  ] = useSendSpecialtyApplicationMutation();
  const [priority, setPriority] = useState<Priority | ''>('');
  const studentData = useAppSelector(selectStudentData);
  const activeSpecialty = useAppSelector(selectActiveSpecialty);

  async function applySpecialty() {
    if (!priority || !activeSpecialty?.specialty_code) return;
    await sendApplication({
      application_priority: priority,
      specialty_code: activeSpecialty.specialty_code,
    });
  }

  function onClose() {
    if (props.onClose) {
      props.onClose({}, 'backdropClick');
      setPriority('');
      reset();
    }
  }

  return (
    <Dialog maxWidth="md" {...props} onClose={onClose}>
      <DialogTitle>
        <Typography variant="h5" component="div">
          {activeSpecialty?.specialty_name}
        </Typography>
      </DialogTitle>
      <DialogContent>
        {studentData?.exams && activeSpecialty?.exams && (
          <ExamsTable
            requiredExams={activeSpecialty.exams}
            studentExams={studentData.exams}
            sx={{ mb: 1 }}
          />
        )}
        <FormControl>
          <FormLabel>Приоритет специальности</FormLabel>
          <RadioGroup
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
          >
            <FormControlLabel
              value={Priority.HIGH}
              control={<Radio />}
              label="1 (Высший приоритет)"
            />
            <FormControlLabel
              value={Priority.MEDIUM}
              control={<Radio />}
              label="2 (Средний)"
            />
            <FormControlLabel
              value={Priority.LOW}
              control={<Radio />}
              label="3 (Низший)"
            />
          </RadioGroup>
        </FormControl>
        {isError && (
          <Alert severity="error">{handleQueryError(error)}</Alert>
        )}
        {isSuccess && <Alert>заявка на проект успешно подана!</Alert>}
      </DialogContent>
      <DialogActions>
        <Button disabled={isLoading} onClick={applySpecialty}>
          подать заявление
        </Button>
        <Button onClick={onClose}>закрыть</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApplySpecialtyDialog;
