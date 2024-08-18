import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
function App() {
  const [count, setCount] = useState(0)
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)
  const savels=(e) => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  useEffect(() => {
    let todostr=localStorage.getItem("todos")
    if(todostr){
      
      let todos=JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])
  
const handleedit=(e,id)=>{
 let t=todos.filter(i=>i.id===id)
 settodo(t[0].todo)
 
let newtodos=todos.filter(item=>{
  return item.id!== id
})
settodos(newtodos)
savels()

}
const handledelete=(e,id)=>{
  let index=todos.findIndex(item=>{
    return item.id===id
  })
  let newtodos=todos.filter(item=>{
    return item.id!== id
  })
  settodos(newtodos)
  savels()

  
}
const handlecheckbox=(e)=>{
let id=e.target.name
let index=todos.findIndex(item=>{
  return item.id===id
})
let newtodos=[...todos]
newtodos[index].isCompleted=!newtodos[index].isCompleted
settodos(newtodos)
savels()
}
const handlechange=(e)=>{
  settodo(e.target.value)
}

const handleadd=()=>{
settodos([...todos,{id:uuidv4(),todo, isCompleted : false}])
settodo("")
savels()
}
const togglefinish=(e) => {
  setshowfinished(!showfinished)
}

  return (
    <>
  <Navbar/>
  <div className="md:container mx-auto my-5 rounded-xl bg-violet-100 p-5 md:w-[35%] min-h-[80vh]">
  <h1 className='font-bold text-3xl text-center'>Manage your task at one place</h1>
  <div className="addtodo flex flex-col gap-5">
    <h2 className='text-2xl font-bold my-5'>Add a Todo</h2>
    <div className="flex gap-3">

    <input onChange={handlechange} value={todo} type="text" className='w-full rounded-lg px-5 py-1' />
    <button onClick={handleadd} disabled={todo.length<=3} className='bg-violet-800 disabled:bg-violet-400  hover:bg-violet-900 p-4 text-sm font-bold  py-2 rounded-md text-white '>Save</button>
    </div>
  </div>
  <input className='my-4' onChange={togglefinish} type="checkbox" checked={showfinished} />Show Finished
  <div className="h-[1px] opacity-15 w-[90%] my-2 mx-auto bg-black"></div>
    <h2 className='text-2xl font-bold'>Todos list</h2>
  <div className="todos">
    {todos.length===0 && <div className='m-5'>No Todos to display</div>}
    {todos.map(item=>{
    return (showfinished|| !item.isCompleted) && <div key={item.id} className="todo flex justify-between   my-3">
      <div className='flex gap-5'>
      <input onChange={handlecheckbox} type="checkbox" value={item.isCompleted} name={item.id} id="" />
    <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
      </div>
    <div className="buttons flex h-full">
      <button onClick={(e)=>handleedit(e,item.id)} className='bg-violet-800 hover:bg-violet-900 p-2 text-sm font-bold py-1 rounded-md text-white mx-1'><FaEdit /></button>
      <button onClick={(e)=>{handledelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-900 p-2 text-sm font-bold py-1 rounded-md text-white mx-1'><MdDeleteForever /></button>
    </div>
    </div>
})}
  </div>
</div>
    </>
  )
}

export default App
