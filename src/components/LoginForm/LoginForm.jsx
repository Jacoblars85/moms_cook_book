import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function LoginForm() {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '30px',
        }}
      >
        <Typography variant="h4">Login</Typography>
        <form onSubmit={login}>
          {errors.loginMessage && (
            <h3 className="alert" role="alert">
              {errors.loginMessage}
            </h3>
          )}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              paddingTop: 1,
            }}
          >
            <TextField
              sx={{
                marginBottom: 1,
              }}
              id="email"
              type="text"
              label="E-username"
              variant="outlined"
              value={username}
              required
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              sx={{
                marginBottom: 2,
              }}
              id="password"
              type="password"
              label="Password"
              variant="outlined"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button
              sx={{ mb: 4 }}
              onClick={login}
              variant="contained"
              type="submit"
            >
              Log in
            </Button>
          </Box>
        </form>
        <Box>
          <Typography variant="body1" align="center">
            New User?
          </Typography>
          <Button
            align="center"
            onClick={() => {
              history.push('/registration');
            }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default LoginForm;