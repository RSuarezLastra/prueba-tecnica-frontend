import { RegisterForm } from "../components"


export const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center w-full p-2 min-h-screen bg-slate-900">

      <div className="border border-gray-600 w-[400px] p-10 rounded-xl bg-slate-950">
        <RegisterForm />
      </div>

    </div>
  )
}
