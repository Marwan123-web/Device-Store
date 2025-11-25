import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { resetUser } from '../redux/user/slice';

export function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = useCallback(() => {
    dispatch(resetUser());
    navigate("/");
  }, [dispatch, navigate]);

  return logout;
}
