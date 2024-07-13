import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useEffect } from 'react';
import { MedicContext } from '../../Context/medicContext';
const defaultTheme = createTheme();

export default function LogIn() {
  const medicContext = React.useContext(MedicContext);

  useEffect(() => {
    const rememberMe = localStorage.getItem("rememberMe");
    const token = localStorage.getItem("token");
    if (token && rememberMe) {
      medicContext.handleLoginToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const medicId = formData.get('medicId');
    const password = formData.get('password');
    const rememberMe = formData.get('remember') === 'remember';
    if (medicId === null || medicId === '' || password === null || password === '') {
      alert("Please fill all the fields");
      return;
    }
    if (medicId.length < 4) {
      alert("Please enter a valid medicId");
      return;
    }
    if (password.length < 4) {
      alert("Please enter a valid password");
      return;
    }
    medicContext.handleLogin({
      medicId, password, rememberMe
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LocalHospitalIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="medicId"
              label="Medic Id"
              type="number"
              name="medicId"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <FormControlLabel
              control={<Checkbox value='remember' color="primary"
                id='isCheckedIn' name='remember' />}
              label="Remember me" checked={medicContext.isRememberMeChecked}
              onClick={medicContext.handleIsRememberMeChecked}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              type="submit" // Set the type to "submit"
            >
              Log In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/vladik9/NodeSocketProject">
        EOG
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
