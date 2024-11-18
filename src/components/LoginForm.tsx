import { Link } from "react-router-dom"
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import Swal from 'sweetalert2';
import { useAuthStore } from "../hooks";

interface Inputs {
  email: string;
  password: string;
}

export const LoginForm = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()

  const { errorMessage, startLogin } = useAuthStore();

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en la autenticación', errorMessage, 'error');
    }

  }, [errorMessage]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    startLogin(data);

    // if (!errorMessage) {
    //   Swal.fire('Bienvenido', 'Usuario loggeado correctamente', 'success');
    // }
  }

  return (
    <form className="mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-white text-center text-2xl">Iniciar Sesión</h2>
      <div className="my-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium  text-white">correo electronico</label>
        <input
          id="email"
          type="email"
          className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          placeholder="name@correo.com"
          {...register('email', { required: 'El correo es requerido' })}
          required
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
      </div>
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium  text-white">contraseña</label>
        <input
          id="password"
          type="password"
          className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          required
          {...register('password', { required: 'La contraseña es requerida' })}
        />
        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
      </div>

      <div className="flex items-end mb-5">
        <Link
          to={'/auth/register'}
          className="ms-2 text-sm font-medium text-gray-300 hover:underline">
          Registrarse
        </Link>
      </div>
      <button
        type="submit"
        className="text-white focus:ring-4 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center bg-purple-800 hover:bg-purple-900 focus:ring-purple-800 transition-all">
        iniciar sesión
      </button>
    </form>
  )
}
