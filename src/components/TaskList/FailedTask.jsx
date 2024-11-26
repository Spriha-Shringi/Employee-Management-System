import React from 'react'

const FailedTask = () => {
  return (
    <div className='flex-shrink-0 h-full w-[300px] p-5 bg-red-400 rounded-xl'>
       <div className='flex justify-between items-center'>
        <h3 className='bg-red-600 text-px-3 py-1 rounded'>High</h3>
        <h4 className='text-sm'>18 Nov 2024</h4>
      </div>
    <h2 className='mt-5 text-2xl font-semibold'>BBCN</h2>
    <p className='text-sm mt-2'>Quiz-2</p>
    <p className='text-sm mt-2'>Paper select and ask sir</p>
    <div className='flex justify-between mt-4'> 
        {/* //     ''/"" */}
        <button className='bg-green-500 py-1 px-2 text-sm'>Mark as Completed</button>
        <button className='bg-red-500 py-1 px-2 text-sm'>Mark as Failed</button>
    </div>
    </div>
  )
}

export default FailedTask