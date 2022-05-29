import { Box, Typography, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const AuthForm = () => {
  return (
    <Box
      sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}
      component="form"
    >
      <Typography variant="h6" component="div" mb={2}>
        Форма авторизации
      </Typography>
      <TextField type="email" label="email" variant="outlined" />
      <TextField type="password" label="пароль" variant="outlined" />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Button type="submit" variant="contained">
          авторизоваться
        </Button>
        <Typography variant="body2">или</Typography>
        <Link to="/student-registration">регистрация</Link>
      </Box>
    </Box>
  );
};

export default AuthForm;
