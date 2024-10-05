import {
  Close as CloseIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormLabel,
  TextField,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function MyAccountPageForm({ setIsForm }) {
  const dispatch = useDispatch();

  const profileUser = useSelector((store) => store.user.profileUserReducer);
  const userEmail = useSelector((store) => store.user.editUserEmail.email);
  const userName = useSelector((store) => store.user.editUserName.name);
  const [invalidText, setInvalidText] = useState('');

//   useEffect(() => {
//     dispatch({ type: 'SAGA_FETCH_PROFILE_PAGE_USER' });
//   }, [dispatch]);

  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [newVerifyPasswordInput, setNewVerifyPasswordInput] = useState('');
  const [openComfirmation, setOpenComfirmation] = useState(false);
  const [openDiscard, setOpenDiscard] = useState(false);

  // Opens Discard Dialog
  const handleDiscardClickOpen = () => {
    setOpenDiscard(true);
  };

  // Closes Discard Dialog
  const handleDiscardClose = () => {
    setOpenDiscard(false);
  };

  // Opens Comfirmation Dialog
  const handleComfirmationClickOpen = () => {
    if (
      userName &&
      userEmail &&
      newPasswordInput === newVerifyPasswordInput &&
      (newPasswordInput.length >= 8 || newPasswordInput.length === 0)
    ) {
      setOpenComfirmation(true);
      // setInvalidText('');
    } else {
      setInvalidText('Invalid, please insert valid information');
    }
  };

  // Closes Comfirmation Dialog
  const handleComfirmationClose = () => {
    setOpenComfirmation(false);
  };

  // sends you back to users info
  const discardChanges = () => {
    dispatch({
      type: 'FETCH_USER',
    });
    setOpenDiscard(false);
    setIsForm(false);
  };

  // changes email redux state when entering info
  const handleEmailChange = (newEmail) => {
    dispatch({
      type: 'CHANGE_EMAIL',
      payload: newEmail,
    });
  };

  // changes name redux state when entering info
  const handleNameChange = (newName) => {
    dispatch({
      type: 'CHANGE_NAME',
      payload: newName,
    });
  };

  // Sends dispatch to save the users info
  const saveNewUserInfo = () => {
    if (newPasswordInput === '' || newPasswordInput.length < 8) {
      console.log('no password');
      dispatch({
        type: 'SAGA_EDIT_USERS_INFO',
        payload: {
          newEmailInput: userEmail,
          newNameInput: userName,
        },
      });
    } else {
      console.log('password');
      dispatch({
        type: 'SAGA_EDIT_USERS_INFO',
        payload: {
          newEmailInput: userEmail,
          newNameInput: userName,
          newPasswordInput: newPasswordInput,
        },
      });
    }
    setNewPasswordInput('');
    setNewVerifyPasswordInput('');
    setOpenComfirmation(false);
    setIsForm(false);
  };

  // This useMemo hook is letting us recalculate these values only when the inputs change
  const [passwordError, passwordMessage] = useMemo(() => {
    if (newPasswordInput.length < 8 && newPasswordInput !== '') {
      return [true, 'password must be 8 or more characters'];
    }
    if (newPasswordInput !== newVerifyPasswordInput) {
      return [true, 'passwords do not match'];
    }
    return [false, undefined];
  }, [newPasswordInput, newVerifyPasswordInput]);

  const [verifyPasswordError, verifyPasswordMessage] = useMemo(() => {
    if (newVerifyPasswordInput.length < 8 && newVerifyPasswordInput !== '') {
      return [true, 'password must be 8 or more characters'];
    }
    if (newPasswordInput !== newVerifyPasswordInput) {
      return [true, 'passwords do not match'];
    }
    return [false, undefined];
  }, [newVerifyPasswordInput, newPasswordInput]);

  return (
    <div className="accountPageForm">
      <h3 className="invalidHeader">{invalidText}</h3>
      <form>
        <section>
          <FormLabel sx={{ mt: 5 }}>Name:</FormLabel>

          <TextField
            variant="outlined"
            type="text"
            name="name"
            // placeholder={profileUser.name}
            value={userName}
            onChange={(e) => handleNameChange(e.target.value)}
            required
            label="New Name"
            color={userName === '' ? 'error' : undefined}
            helperText={
              userName === '' ? 'you must enter a valid name' : undefined
            }
            sx={{
              mt: 5,
              width: '20ch',
            }}
          />
        </section>

        <section>
          <FormLabel sx={{ mt: 2 }}>Email:</FormLabel>
          <TextField
            variant="outlined"
            type="email"
            name="email"
            // placeholder={profileUser.email}
            value={userEmail}
            onChange={(e) => handleEmailChange(e.target.value)}
            color={userEmail === '' ? 'error' : undefined}
            helperText={
              userEmail === '' ? 'you must enter a valid email' : undefined
            }
            required
            label="New Email"
            sx={{
              mt: 2,
              width: '20ch',
            }}
          />
        </section>

        <section>
          <FormLabel sx={{ mt: 2 }}>New Password:</FormLabel>
          <TextField
            variant="outlined"
            type="password"
            name="password"
            placeholder="password"
            color={passwordError ? 'error' : undefined}
            helperText={passwordMessage}
            value={newPasswordInput}
            onChange={(e) => setNewPasswordInput(e.target.value)}
            label="Enter new password"
            sx={{
              mt: 2,
              width: '20ch',
            }}
          />
        </section>

        <section>
          <FormLabel
            sx={{
              mt: 2,
            }}
          >
            Verify New Password:
          </FormLabel>

          <TextField
            variant="outlined"
            type="password"
            name="Verify New Password"
            placeholder="verify new password"
            color={verifyPasswordError ? 'error' : undefined}
            helperText={verifyPasswordMessage}
            value={newVerifyPasswordInput}
            onChange={(e) => setNewVerifyPasswordInput(e.target.value)}
            label="Verify new password"
            sx={{
              mt: 2,
              width: '20ch',
            }}
          />
        </section>

        <Button
          onClick={handleComfirmationClickOpen}
          variant="contained"
          type="button"
          color="button"
          sx={{
            mt: 3,
            mb: 5,
            mr: 2,
          }}
          startIcon={<SaveIcon />}
        >
          Save Changes
        </Button>
        <Button
          color="error"
          onClick={handleDiscardClickOpen}
          variant="outlined"
          type="button"
          sx={{
            mt: 3,
            mb: 5,
            ml: 2,
          }}
          startIcon={<DeleteIcon />}
        >
          Discard Changes
        </Button>
      </form>

      {/* Discard Dialog */}
      <Dialog
        open={openDiscard}
        onClose={handleDiscardClose}
        aria-labelledby="discard-dialog-title"
        aria-describedby="discard-dialog-description"
      >
        <DialogTitle id="discard-dialog-title">
          Are you sure you want to discard these changes?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="discard-dialog-description">
            You can change this information again if need be.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            onClick={discardChanges}
            startIcon={<DeleteIcon />}
            autoFocus
          >
            Discard
          </Button>
          <Button
            sx={{ color: 'black' }}
            onClick={handleDiscardClose}
            startIcon={<CloseIcon />}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog
        open={openComfirmation}
        onClose={handleComfirmationClose}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">
          Are you sure you want to save the new information?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            You can change this information again if need be.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={saveNewUserInfo} startIcon={<SaveIcon />} autoFocus>
            Save Changes
          </Button>
          <Button
            sx={{ color: 'black' }}
            startIcon={<CloseIcon />}
            onClick={handleComfirmationClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}