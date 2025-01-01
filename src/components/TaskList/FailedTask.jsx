import React from 'react'

const FailedTask = ({data}) => {
  return (
    <div className='flex-shrink-0 h-full w-[300px] p-5 bg-red-400 rounded-xl'>
       <div className='flex justify-between items-center'>
        <h3 className='bg-red-600 text-2xl px-3 py-1 rounded'>{data.category} </h3>
        <h4 className='text-sm'>{data.date}</h4>
      </div>
    <h2 className='mt-5 text-2xl font-semiboldrounded font-medium'>{data.taskTitle}</h2>
    <p className='text-sm mt-2'>{data.taskDescription}</p>
    {/* <p className='text-sm mt-2'>Paper select and ask sir</p> */}
    <div className='flex justify-between mt-4'> 
        {/* //     ''/"" */}
        {/* <button className='bg-green-500 py-1 px-2 text-sm'>Mark as Completed</button> */}
        <div className='bg-red-500 py-1 px-2 text-sm'>Failed</div>
    </div>
    </div>
  )
}

export default FailedTask