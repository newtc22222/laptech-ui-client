/** @format */

import { setCredentials, setNewAccessToken, logout } from './loginSlice';
import { loginService } from '../../services/login.service';

export const login = async (dispatch, data) => {
  let res = await loginService.postLogin(data);
  dispatch(setCredentials(res));
};
