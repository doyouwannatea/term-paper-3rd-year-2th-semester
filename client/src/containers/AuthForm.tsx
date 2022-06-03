import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RoutePaths } from '../router/AppRouter';
import { useAuthMutation } from '../store/services/specialtyApi';

const AuthForm = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [auth, { isError, isLoading, error }] = useAuthMutation();

  async function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await auth({ email, password }).unwrap();
      navigate(RoutePaths.HOME, { replace: true });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box
      onSubmit={submitHandler}
      sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}
      component="form"
    >
      <Typography variant="h6" component="div" mb={2}>
        Форма авторизации
      </Typography>
      <TextField
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
        type="email"
        label="email"
        variant="outlined"
      />
      <TextField
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
        type="password"
        label="пароль"
        variant="outlined"
      />
      {isError && (
        <Alert severity="error">
          {String((error as FetchBaseQueryError)?.data)}
        </Alert>
      )}
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Button
          disabled={isLoading}
          type="submit"
          variant="contained"
        >
          авторизоваться
        </Button>
        <Typography variant="body2">или</Typography>
        <Link to={RoutePaths.STUDENT_REGISTRATION}>регистрация</Link>
      </Box>
    </Box>
  );
};

export default AuthForm;
