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
      dispatch(onLogin({ uid: data.uid, name: data.name }));
    } catch (error) {
      const axiosError = error as AxiosError<{ msg: string }>;
      console.log(axiosError);
      
      const errorMessage = axiosError.response?.data?.msg || 'Error en el registro';
      dispatch(onLogout(errorMessage));

      setTimeout(() => {
        dispatch(clearError())
      }, 10);
    }
  }

  return {
    status,
    user,
    errorMessage,

    startLogin,
    startRegister
  }

}