import {
  Box,
  Button,
  Paper,
  TextField,
  Tooltip,
  Typography,
  tooltipClasses,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();
    if (
      password !== confirmedPassword ||
      password === '' ||
      password === null ||
      password.length < 8
    ) {
      dispatch({ type: 'REGISTRATION_FAILED_PASSWORDS_DONT_MATCH' });
    } else if (
      email === '' ||
      name === '' ||
      email === null ||
      name === null 
    ) {
      dispatch({ type: 'REGISTRATION_FAILED' });
    } else {

      dispatch({
        type: 'REGISTER',
        payload: {
          email: email,
          name: name,
          password: password,
        },
      });
      dispatch({ type: 'CLEAR_REGISTRATION_ERROR' });
      history.push('/home');
    }
  }; // end registerUser

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <Box sx={{ width: '550px', height: 'auto' }}>
      <Paper>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}
        <Box
          component="form"
          sx={{
            pt: 5,
            '& > :not(style)': { m: 1, width: '30ch' },
            flexDirection: 'column',
            display: 'flex',
            alignItems: 'center',
            overflow: 'show',
          }}
          noValidate
          autoComplete="off"
          onSubmit={registerUser}
        >
          <Typography
            align="center"
            variant="h2"
            sx={
              {
                // pt: 7s
              }
            }
          >
            Mom's Cookbook
          </Typography>
          <Box
            sx={{
              flexDirection: 'column',
              display: 'flex',
              alignItems: 'center',
            }}
          ></Box>
          <TextField
            id="email"
            type="text"
            label="E-mail"
            variant="outlined"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            id="name"
            type="text"
            label="Full Name"
            variant="outlined"
            value={name}
            required
            onChange={(event) => setName(event.target.value)}
          />

          <Tooltip
            title={
              password.length < 8 ? 'password must be 8 or more characters' : ''
            }
            placement="top"
            slotProps={{
              popper: {
                sx: {
                  [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
                    {
                      marginTop: '0px',
                    },
                  [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
                    {
                      marginBottom: '1px',
                    },
                  [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]:
                    {
                      marginLeft: '0px',
                    },
                  [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]:
                    {
                      marginRight: '0px',
                    },
                },
              },
            }}
          >
            <TextField
              id="password"
              type="password"
              label="Password"
              variant="outlined"
              value={password}
              color={password.length < 8 && password !== '' ? 'error' : ''}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </Tooltip>

          <Tooltip
            title={
              confirmedPassword.length < 8
                ? 'password must be 8 or more characters'
                : ''
            }
            placement="top"
            slotProps={{
              popper: {
                sx: {
                  [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
                    {
                      marginTop: '0px',
                    },
                  [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
                    {
                      marginBottom: '1px',
                    },
                  [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]:
                    {
                      marginLeft: '0px',
                    },
                  [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]:
                    {
                      marginRight: '0px',
                    },
                },
              },
            }}
          >
            <TextField
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              variant="outlined"
              value={confirmedPassword}
              color={
                confirmedPassword.length < 8 && confirmedPassword !== ''
                  ? 'error'
                  : confirmedPassword !== password
                    ? 'error'
                    : ''
              }
              required
              onChange={(event) => setConfirmedPassword(event.target.value)}
            />
          </Tooltip>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="50%"
          >
            <Button
              sx={{ mt: 3, mb: 3 }}
              variant="contained"
              type="submit"
              name="submit"
              value="Register"
            >
              Register
            </Button>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ color: '#646765' }}
          >
            Already a member?
            <Button type="button" onClick={onLogin}>
              Log in
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default RegisterForm;