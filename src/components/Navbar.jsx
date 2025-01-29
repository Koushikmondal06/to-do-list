import React from 'react'

const navbar = () => {
  return (
    <nav className='flex justify-between p-5 bg-blue-900'>
      <div className="logo ">
        <span className='font-bold text-2xl text-white cursor-pointer  hover:text-yellow-400 hover:font-bold'>To-Do List</span>
      </div>
      <ul className='flex list-none gap-10 mx-10 '>
        <li className='text-1.5xl  text-white cursor-pointer hover:text-yellow-400 hover:font-bold font-bold'>Home</li>
        <li className='text-1.5xl  text-white cursor-pointer  hover:text-yellow-400 hover:font-bold font-bold'>Task</li>
      </ul>
    </nav>
  )
}

export default navbar

