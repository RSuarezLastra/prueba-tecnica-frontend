import { Link } from "react-router-dom"


export const LoginForm = () => {
  return (
    <form className="mx-auto">
      <h2 className="text-white text-center text-2xl">Iniciar Sesión</h2>
      <div className="my-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium  text-white">correo electronico</label>
        <input
          id="email"
          type="email"
          className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          placeholder="name@correo.com"
          required
        />
      </div>
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium  text-white">contraseña</label>
        <input
          id="password"
          type="password"
          className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          required
        />
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
