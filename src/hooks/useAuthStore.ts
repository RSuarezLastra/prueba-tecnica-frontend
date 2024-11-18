import { AxiosError } from "axios";
import { apiClient } from "../api/apiClient";
import { useAppDispatch, useAppSelector } from "../store"
import { clearError, onLogin, onLogout } from "../store/authSlice";

interface LoginProps {
  email: string;
  password: string;
}

interface User {
  name: string;
  userName: string;
  email: string;
  password: string;
}

export const useAuthStore = () => {

  const dispatch = useAppDispatch();

  const { status, user, errorMessage } = useAppSelector(state => state.auth);

  const startLogin = async ({ email, password }: LoginProps) => {
    try {
      const { data } = await apiClient.post('/auth/login', { email, password });

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', `${new Date().getTime()}`);

      dispatch(onLogin({ uid: data.uid, name: data.name }));
    } catch (error) {
      dispatch(onLogout('Credenciales incorrectas'));

      setTimeout(() => {
        dispatch(clearError())
      }, 10);
    }
  }

  const startRegister = async ({ name, email, userName, password }: User) => {
    try {
      const { data } = await apiClient.post('/auth/register', {
        name, 
        userName,
        email, 
        password,
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', `${new Date().getTime()}`);

      dispatch(onLogin({ uid: data.uid, name: data.name }));
    } catch (error) {
      const axiosError = error as AxiosError<{ msg: string }>;
      
      const errorMessage = axiosError.response?.data?.msg || 'Error en el registro';
      dispatch(onLogout(errorMessage));

      setTimeout(() => {
        dispatch(clearError())
      }, 10);
    }
  }

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return dispatch(onLogout());

    try {
        const { data } = await apiClient.get('/auth/renew');

        localStorage.setItem('token', data.token);
        localStorage.setItem('token-init-date', `${new Date().getTime()}`);
        dispatch(onLogin({ uid: data.uid, name: data.name }));
    } catch (error) {
        localStorage.clear();
        dispatch(onLogout());
    }
}

const startLogout = () => {
  localStorage.clear();
  dispatch(onLogout());
}

  return {
    status,
    user,
    errorMessage,

    startLogin,
    startRegister,
    checkAuthToken,
    startLogout
  }

}