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
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useState } from 'react';
import ExamsTable from '../components/ExamsTable';
import { useAppSelector } from '../hooks/useAppRedux';
import { Priority } from '../models/Priority';
import { useSendSpecialtyApplicationMutation } from '../store/services/specialty';

const ApplySpecialtyDialog: React.FC<DialogProps> = (props) => {
  const [
    sendApplication,
    { isError, error, isLoading, isSuccess, reset },
  ] = useSendSpecialtyApplicationMutation();
  const [priority, setPriority] = useState<Priority | ''>('');
  const studentData = useAppSelector(
    (state) => state.specialty.studentData
  );
  const activeSpecialty = useAppSelector(
    (state) => state.specialty.activeSpecialty
  );

  async function applySpecialty() {
    if (!priority || !activeSpecialty?.specialty_code) return;
    try {
      await sendApplication({
        application_priority: priority,
        specialty_code: activeSpecialty.specialty_code,
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  }

  function onClose() {
    if (props.onClose) {
      props.onClose({}, 'backdropClick');
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
          <Alert severity="error">
            {String((error as FetchBaseQueryError)?.data)}
          </Alert>
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
