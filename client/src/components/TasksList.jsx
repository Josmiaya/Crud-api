
import { useEffect, useState } from "react";
import {getAllTasks} from  "../api/Tasks.api";
import {TaskCard} from "./TaskCard";


//asincronamente hace la peticion
export function TasksList() {
    
    const [tasks, setTasks] = useState([])

    useEffect(() => { 
    async function loadTasks(){
        const res = await getAllTasks();
        setTasks(res.data);
    }
    loadTasks();

    }, []);
 
    return <div className="grid grid-cols-3 gap-3">

        {tasks.map(task => (
        <TaskCard key={task.id} task={task}/>
        ))}    
    </div>;
}
