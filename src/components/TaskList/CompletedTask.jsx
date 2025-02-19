import React from 'react'

const CompletedTask = ({data}) => {
  return (
    <div className='flex-shrink-0 h-full w-[300px] p-5 bg-green-400 rounded-xl'>
       <div className='flex justify-between items-center'>
       <h3 className='bg-red-600 text-2xl px-3 py-1 rounded'>{data.category}</h3>
        <h4 className='text-sm'>{data.date}</h4>
      </div>
      <h2 className='mt-5 text-2xl font-semiboldrounded font-medium'>{data.title}</h2>
      <p className='text-sm mt-2'>{data.description}</p>
    {/* <p className='text-sm mt-2'>Paper select and ask sir</p> */}
    <div className='flex justify-between mt-4'> 
        {/* //     ''/"" */}
        <div className='bg-green-600 py-1 px-2 text-sm'>Completed</div>
        {/* <button className='bg-red-500 py-1 px-2 text-sm'>Mark as Failed</button> */}
    </div>
    </div>
  )
}

export default CompletedTask