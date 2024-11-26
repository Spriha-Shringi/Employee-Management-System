import React from 'react'
import Header from '../Others/Header'
import TaskListNumbers from '../Others/TaskListNumbers'
import TaskList from '../TaskList/TaskList'

const EmployeeDashboard = ({ data }) => {
  console.log(data)
  return (
    <div>
      <div className='p-10 bg-[#1C1C1C] h-screen'>
      {/* console.log(data) */}
        {/* <h1>{data.id}</h1> */}
        <Header data={data}/>
        <TaskListNumbers data={data}/>
        <TaskList data={data}/>
      </div>
    </div>
  )
}

export default EmployeeDashboard
