import { Typography, TextField, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import FileInput from '../components/FileInput';
import { RoutePaths } from '../router/AppRouter';

const StudentRegistrationForm = () => {
  const submit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('email', '');
    formData.append('password', '');
  };

  return (
    <Stack onSubmit={submit} gap={1} component="form">
      <Typography variant="h6" component="div" mb={2}>
        Форма регистрации абитуриента
      </Typography>
      <TextField type="email" label="email" variant="outlined" />
      <TextField type="password" label="пароль" variant="outlined" />
      <TextField
        type="password"
        label="повторите пароль"
        variant="outlined"
      />
      <FileInput label="фото документа удостоверяющего личость" />
      <FileInput label="фото 3x4" />
      <Stack gap={1} alignItems="center" direction="row" mt={2}>
        <Button type="submit" variant="contained">
          зарегестрироваться
        </Button>
        <Typography variant="body2">или</Typography>
        <Link to={RoutePaths.WELCOME}>авторизация</Link>
      </Stack>
    </Stack>
  );
};

export default StudentRegistrationForm;
