import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { createTask, deleteTask, updateTask, getTask } from '../api/Tasks.api';
import { useNavigate, useParams } from 'react-router-dom';
import {toast} from 'react-hot-toast'

export function TasksFormPage() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    const onSubmit = handleSubmit(async (data) => {
        if (params.id) {
            console.log("Actualizando");
            await updateTask(params.id, data);
            toast.success('updated Task', {
                position: 'top-right',
                style: {
                    background: 'blue',
                    color: 'white',
                }
            });
        } else {
            await createTask(data);
            toast.success('Task created', {
                position: 'top-right',
                style: {
                    background: 'blue',
                    color: 'white',
                }
            });
        }
        navigate('/tasks');
    });

    useEffect(() => {
        const loadTask = async () => {
            if (params.id) {
                console.log("Obteniendo datos");
                const res = await getTask(params.id);
                // Aquí puedes llenar el formulario con los datos obtenidos
                setValue('title', res.data.title);
                setValue('description', res.data.description);
            }
        };

        loadTask();
    }, [params.id]);

    return (
        <div className='max-w-xl mx-auto'>
            <form onSubmit={onSubmit}>
                <input type="text"
                placeholder="title"
                {...register("title", { required: true })}
                className='bg-slate-300 p-3 rounded-lg block w-full mb-3' />
                {errors.title && <p>Title is required</p>}

                <textarea rows={3}
                placeholder="Description"
                {...register("description", { required: true })}
                className='bg-slate-300 p-3 rounded-lg block w-full mb-3'
                ></textarea>
                {errors.description && <p>Description is required</p>}

                <button type="submit" className='bg-indigo-500 p-3 rounded-lg block w-full mt-3'>Save</button>
            </form>

            {
                params.id && (
                    <button
                    className='bg-red-500 p-3 rounded-lg block w-48 mt-3'
                     onClick={async () => {
                        const accepted = window.confirm('Are you sure?');
                        if (accepted) {
                            await deleteTask(params.id);
                            toast.success('Deleted task', {
                                position: 'top-right',
                                style: {
                                    background: 'blue',
                                    color: 'white',
                                }
                            });
                            navigate('/tasks');
                        }
                    }}>Delete</button>
                )
            }
        </div>
    );
}
