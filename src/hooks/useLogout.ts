import { useNavigate } from 'react-router-dom';
import { accountApi } from '../store/account-api';
import { authActions } from '../store/auth';
import { contactsActions } from '../store/contacts';
import { feedApi } from '../store/feed-api';
import { useAppDispatch } from '../store/hooks';
import { messagesActions } from '../store/messages/messages';
import { profileApi } from '../store/profile-api';

const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logOutHandler = () => {
    dispatch(feedApi.util.resetApiState());
    dispatch(profileApi.util.resetApiState());
    dispatch(accountApi.util.resetApiState());
    dispatch(messagesActions.clearAll());
    dispatch(contactsActions.clearAll());
    dispatch(authActions.logOut());
    navigate('/login');
  };

  return logOutHandler;
};

export default useLogout;
