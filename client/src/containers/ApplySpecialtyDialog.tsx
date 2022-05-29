import {
  Dialog,
  DialogTitle,
  Typography,
  Alert,
  DialogContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  DialogActions,
  Button,
  DialogProps,
} from '@mui/material';
import ExamsTable from '../components/ExamsTable';

const ApplySpecialtyDialog: React.FC<DialogProps> = (props) => (
  <Dialog maxWidth="md" {...props}>
    <DialogTitle>
      <Typography variant="h5" component="div">
        Информационные системы и технологии
      </Typography>
      <Typography variant="body2">
        Последняя дата подачи заявления на специальность:{' '}
        <b>29.05.2022</b>
      </Typography>
      <Alert severity="warning">
        недостаточно баллов по предмету <b>«профильная математика»</b>
      </Alert>
      <Alert severity="warning">
        сроки подачи заявления на специальность прошли
      </Alert>
    </DialogTitle>
    <DialogContent>
      <ExamsTable sx={{ mb: 1 }} />
      <FormControl>
        <FormLabel>Приоритет специальности</FormLabel>
        <RadioGroup>
          <FormControlLabel
            value={1}
            control={<Radio />}
            label="1 (Высший приоритет)"
          />
          <FormControlLabel
            value={2}
            control={<Radio />}
            label="2 (Средний)"
          />
          <FormControlLabel
            value={3}
            control={<Radio />}
            label="3 (Низший)"
          />
        </RadioGroup>
      </FormControl>
    </DialogContent>
    <DialogActions>
      <Button>подать заявление</Button>
      <Button
        onClick={() =>
          props.onClose && props.onClose({}, 'backdropClick')
        }
      >
        закрыть
      </Button>
    </DialogActions>
  </Dialog>
);

export default ApplySpecialtyDialog;
