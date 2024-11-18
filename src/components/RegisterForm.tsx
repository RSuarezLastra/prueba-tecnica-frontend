import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form"
import Swal from 'sweetalert2';
import { useAuthStore } from "../hooks";

interface Inputs {
  name: string;
  userName: string;
  email: string;
  password: string;
}

export const RegisterForm = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()

  const { errorMessage, startRegister } = useAuthStore();

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en la autenticación', errorMessage, 'error');
    }

  }, [errorMessage]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    startRegister(data);
  }

  return (
    <form className="mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-white text-center text-2xl">Crear Cuenta</h2>

      <div className="my-5">
        <label htmlFor="name" className="block mb-2 text-sm font-medium  text-white">Nombre</label>
        <input
          id="name"
          type="text"
          className=" border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          {...register('name', {
            required: 'El nombre es requerido',
            minLength: {
              value: 2,
              message: 'El nombre debe tener al menos 2 caracteres',
            },
          })}
          required
        />
        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
      </div>

      <div className="my-5">
        <label htmlFor="userName" className="block mb-2 text-sm font-medium  text-white">Nombre de usuario</label>
        <input
          id="userName"
          type="text"
          className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          {...register('userName', { required: 'El nombre de usuario es requerido' })}
          required
        />
      </div>

      <div className="my-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium  text-white">Correo electronico</label>
        <input
          id="email"
          type="email"
          className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          placeholder="name@correo.com"
          {...register('email', { required: 'El correo es requerido' })}
          required
        />
      </div>

      <div className="mb-8">
        <label htmlFor="password" className="block mb-2 text-sm font-medium  text-white">Contraseña</label>
        <input
          id="password"
          type="password"
          className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          {...register('password', {
            required: 'La contraseña es requerida',
            minLength: {
              value: 8,
              message: 'La contraseña debe tener al menos 8 caracteres',
            },
          })}
          required
        />
        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
      </div>

      <button
        type="submit"
        className="text-white focus:ring-4 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center bg-purple-800 hover:bg-purple-900 focus:ring-purple-800 transition-all">
        Registrarse
      </button>

      <div className="flex justify-center mt-2">
        <Link
          to={'/auth/login'}
          className="text-smfont-medium text-gray-300 hover:underline">
          ¿Ya tiene cuenta? Ingrese
        </Link>
      </div>
    </form>
  )
}
