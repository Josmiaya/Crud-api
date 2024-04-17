import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { createTask, deleteTask, updateTask, getTask } from '../api/Tasks.api';
import { useNavigate, useParams } from 'react-router-dom';

export function TasksFormPage() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    const onSubmit = handleSubmit(async (data) => {
        if (params.id) {
            console.log("Actualizando");
            await updateTask(params.id, data);
        } else {
            await createTask(data);
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
        <div>
            <form onSubmit={onSubmit}>
                <input type="text"
                placeholder="title"
                {...register("title", { required: true })} />
                {errors.title && <p>Title is required</p>}

                <textarea rows={3}
                placeholder="Description"
                {...register("description", { required: true })}></textarea>
                {errors.description && <p>Description is required</p>}

                <button type="submit">Save</button>
            </form>

            {
                params.id && (
                    <button onClick={async () => {
                        const accepted = window.confirm('Are you sure?');
                        if (accepted) {
                            await deleteTask(params.id);
                            navigate('/tasks');
                        }
                    }}>Delete</button>
                )
            }
        </div>
    );
}
