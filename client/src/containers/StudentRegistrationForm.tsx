import {
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
} from '@mui/material';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FileInput from '../components/FileInput';
import { RoutePaths } from '../router/AppRouter';
import {
  useAuthMutation,
  useRegisterMutation,
} from '../store/services/specialtyApi';

const StudentRegistrationForm = () => {
  const navigate = useNavigate();
  const [auth] = useAuthMutation();
  const [register, { isError, error, isLoading }] =
    useRegisterMutation();
  const [warning, setWarning] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [email, setEmail] = useState('');
  const submit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    setWarning('');
    if (!password || !email)
      return setWarning('введите регистрационные данные');
    if (password !== passwordAgain)
      return setWarning('вы неправильно повторили пароль');
    try {
      await register({ email, password }).unwrap();
      await auth({ email, password }).unwrap();
      navigate(RoutePaths.HOME, { replace: true });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack onSubmit={submit} gap={1} component="form">
      <Typography variant="h6" component="div" mb={2}>
        Форма регистрации абитуриента
      </Typography>
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        label="email"
        variant="outlined"
      />
      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        label="пароль"
        variant="outlined"
      />
      <TextField
        value={passwordAgain}
        onChange={(e) => setPasswordAgain(e.target.value)}
        type="password"
        label="повторите пароль"
        variant="outlined"
      />
      <FileInput label="фото документа удостоверяющего личость" />
      <FileInput label="фото 3x4" />
      {isError && (
        <Alert severity="error">
          {String((error as FetchBaseQueryError)?.data)}
        </Alert>
      )}
      {!isError && warning && (
        <Alert severity="warning">{warning}</Alert>
      )}
      <Stack gap={1} alignItems="center" direction="row" mt={2}>
        <Button
          disabled={isLoading}
          type="submit"
          variant="contained"
        >
          зарегестрироваться
        </Button>
        <Typography variant="body2">или</Typography>
        <Link to={RoutePaths.WELCOME}>авторизация</Link>
      </Stack>
    </Stack>
  );
};

export default StudentRegistrationForm;
