import { SubmitHandler, useForm } from 'react-hook-form';
import { useTaskStore } from '../hooks';


interface Inputs {
  title: string;
  description: string;
}


interface Props {
  handleClose: () => void; 
}

export const TaskForm = ({ handleClose }: Props) => {

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()
  const { startSavingTask } = useTaskStore();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {

    await startSavingTask({ ...data, status: 'pendiente' });
    handleClose();
  }

  return (
    <form className="mx-auto" onSubmit={handleSubmit(onSubmit)}>

      <div className="my-5">
        <label htmlFor="title" className="block mb-2 text-sm font-medium  text-white">Titulo</label>
        <input
          id="title"
          type="text"
          className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          {...register('title', { required: 'El titulo es requerido' })}
          required
        />
        {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
      </div>
      <div className="mb-5">
        <label htmlFor="description" className="block mb-2 text-sm font-medium  text-white">Descripción</label>
        <textarea
          id="description"
          rows={4}
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          {...register('description', { required: 'La descripción es requerida' })}
          required
        />
        {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
      </div>

      <button
        type="submit"
        className="text-white focus:ring-4 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center bg-purple-800 hover:bg-purple-900 focus:ring-purple-800 transition-all">
        Guardar
      </button>
    </form>
  )
}
