import { Edit as EditIcon } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import MyAccountPageForm from '../MyAccountPageForm/MyAccountPageForm';
import { AccountInfo } from './AccountInfo';
import './MyAccountPage.css';

export default function MyAccountPage() {
  const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch({ type: 'SAGA_FETCH_PROFILE_PAGE_USER' });
//   }, [dispatch]);

  const [isForm, setIsForm] = useState(false);

  return (
    <div className="myAccountPageCss">
      <div className="accountPageFormArea">
        {isForm ? (
          <MyAccountPageForm setIsForm={setIsForm} />
        ) : (
          <AccountInfo>
            <Button
              aria-label="edit info"
              className="editInfoButton"
              onClick={() => setIsForm(true)}
              type="button"
              variant="contained"
              sx={{ mt: 3 }}
              endIcon={<EditIcon />}
            >
              Edit info
            </Button>
          </AccountInfo>
        )}
      </div>
    </div>
  );
}