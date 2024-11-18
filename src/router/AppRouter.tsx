import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage, RegisterPage, TasksPage } from "../pages";
import { useAuthStore } from "../hooks";

export const AppRouter = () => {

  const { checkAuthToken, status } = useAuthStore();


  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === 'checking') {
    return (
        <h3>Cargando...</h3>
    )
}

  return (

    <Routes>
      {
        (status === 'not-authenticated') ? (
          <>
            <Route path='/auth/login' element={<LoginPage />} />
            <Route path='/auth/register' element={<RegisterPage />} />
            <Route path='/*' element={<Navigate to='/auth/login' />} />
          </>
        )
          : (
            <>
              <Route path='/' element={<TasksPage />} />
              <Route path='/*' element={<Navigate to='/' />} />
            </>
          )
      }
    </Routes >
  )
}
