import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../pages";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path='/auth/*' element={<LoginPage />} />
      <Route path='/*' element={<Navigate to='/auth/login' />} />
    </Routes >
  )
}
