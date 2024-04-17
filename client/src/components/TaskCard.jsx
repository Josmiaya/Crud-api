import { useNavigate } from "react-router-dom";

export function TaskCard({task}) {
  
    const navigate = useNavigate();
  
  return (
    <div 
      className="bg-gray-800 text-white p-4 rounded-md hover:bg-gray-700 hover:cursor-pointer"
      onClick={() =>{
          navigate('/tasks/' + task.id)
      }}
    >

        <h1 className="font-bold uppercase">{task.title}</h1>
        <p className="textslate-400">{task.description}</p>
        <hr />
    </div>
    )
}
