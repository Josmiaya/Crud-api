import {Link} from 'react-router-dom'

export function Navigation() {
  return (
    <div className='flex justify-between py-5'>
        <Link to="/tasks">
        <h1 className='font-bold text-3xl mb-3'>Task App</h1>
        
        </Link>
        <button className='bg-blue-500 rounded-lg mb-3 py-2' >
          <Link className='font-semibold' to="/tasks-create" >Create Task</Link>
        </button>
    </div>
  )
}

