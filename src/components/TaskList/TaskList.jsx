import React from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompletedTask from './CompletedTask'

const TaskList = ({data}) => {
  return (
    <div id='tasklist' className='h-[55%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-5 mt-10'>
      {/* <AcceptTask/>
       <NewTask/>
       <CompletedTask/>
       <FailedTask/> */} //unable to import
       {data.tasks.map((elem, idx)=>{
        if(elem.active){
          return <AcceptTask key={idx}/>
        }
        if(elem.newTask){
          return <NewTask key={idx}/>
        }
        if(elem.completed){
          return <CompletedTask key={idx}/>
        }
        // if(elem.failed){
        //   return <FailedTask key={idx}/>
        // }.....??
       })}
       </div>
  )
}

export default TaskList
