import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Copyright } from '../../components/layout/copyright/CopyRight';
import ToastsStore from '../../helpers/ToastStoreHelper';
import { AuthService } from '../../services/AuthService';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { LOCAL_STORAGE_KEY } from '../../constants/LocalStorageKey';


export default function Login() {
  let history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN_KEY);
    if (token) {
      history.push('/home');
    }
  }, []);
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    const dataToSend = {
      email: formdata.get('email'),
      password: formdata.get('password'),
    }
    // form validation
    if (!dataToSend.email || !dataToSend.password) {
      ToastsStore.error('Please input all fields.');
      return;
    }
    const response = await AuthService.login(dataToSend);
    if (response.data.success) {
      ToastsStore.success('Login successful.');
      //set token
      localStorage.setItem(LOCAL_STORAGE_KEY.TOKEN_KEY, response.data.data.token);
      localStorage.setItem(LOCAL_STORAGE_KEY.USER_INFO_KEY, JSON.stringify(response.data.data));
      history.push('/home');
      window.location.reload();
    } else {
      ToastsStore.error(response.data.message);
    }
  };

  return (
    
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            TalkChat Log In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}