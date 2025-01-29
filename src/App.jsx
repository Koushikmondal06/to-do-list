import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import { v4 as uuidv4 } from 'uuid'
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

function App() {
  ''
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [finished, setfinished] = useState(true)
  const [dueDate, setDueDate] = useState("");
  const handlefinished = (e) => {
    setfinished(!finished)
  }
  
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    savetodo()
  }
  useEffect(() => {
    let todostring = JSON.parse(localStorage.getItem("todos"))
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)

    }
  }, [])


  const savetodo = (params) => {


    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleedit = (e, id) => {
    let t = todos.filter(item => item.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id

    })
    setTodos(newTodos)
    savetodo()
  }
  const handledelete = (e, id) => {

    let newTodos = todos.filter(item => {
      return item.id !== id

    })
    setTodos(newTodos)
    savetodo()
  }
  const handlechange = (e) => {
    setTodo(e.target.value)
    savetodo()
  }
  const handlecheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    savetodo()
  }



  return (

    <>
      <Navbar />

      <div className="con p-5 mx-auto my-5 rounded-2xl min-h-[85vh]  md:w-1/2 w-[90vw] overflow-hidden ">
        <h1 className='text-2xl font-bold'>Add To-Dos</h1>
        <div className="add-todo flex gap-2 m-3">
          <input className='bg-white flex-1 rounded-lg px-3 py-2' type="text" value={todo} onChange={handlechange}  />
          <button className='bg-violet-600 rounded-md px-4 py-2 hover:bg-violet-900 text-white cursor-pointer' onClick={handleAdd} disabled = {todo.length<3}  >Add </button>
        </div>
        <div className="milti flex justify-between md:m-5">
          <div>
        <input type="checkbox" checked={finished} onChange={handlefinished} /> Show Finished </div>
        <button className='bg-red-600 rounded-md px-4 py-2 hover:bg-red-900 text-white' onClick={() => { setTodos([]); localStorage.removeItem("todos"); }}>
  Clear All
</button>
        </div>
        <h1 className='text-2xl font-bold'>Yours To-Dos</h1>
        {todos.length === 0 && <div className='m-5'> No To-Do Available </div>}
        {todos.map(item => {
          return (finished|| ! item.isCompleted) && <div key={item.id} className="todo flex flex-col sm:flex-row justify-between m-5 md:max-w-3/4">
            <div className="checkbox gap-5 flex items-center ">
              <input type="checkbox" name={item.id} onChange={handlecheckbox} />
              <div className={    item.isCompleted ? "line-through"  : "flex flex-wrap"} ><h4 className='sm:flex flex-wrap'> {item.todo} </h4></div>
            </div>
            <div className="buttons flex gap-3 h-full mt-2 sm:mt-0">
              <button aria-label="Edit" className="Edit bg-violet-600  rounded-md p-2 py-1 hover:bg-violet-900 cursor-pointer hover:text-white " onClick={(e) => handleedit(e, item.id)}><FaEdit className='text-white' /></button>
              <button aria-label="Delete" className="Delete bg-violet-600  rounded-md p-2 py-1 hover:bg-violet-900 cursor-pointer hover:text-white  " onClick={(e) => { handledelete(e, item.id) }}><RiDeleteBin6Line  className='text-white'/></button>
            </div>
          </div>
        })}
      </div>


    </>
  )
}

export default App
