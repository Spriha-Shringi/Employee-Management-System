

// import React, { useContext } from 'react'
// import { AuthContext } from '../../context/AuthProvider'

// const AllTask = () => {

//    const [userData,setUserData] =  useContext(AuthContext)

   
//   return (
//     <div className='bg-[#1c1c1c] p-5 rounded mt-5'>
//         <div className='bg-red-400 mb-2 py-2 px-4 flex justify-between rounded'>
//             <h2 className='text-lg font-medium w-1/5'>Employee Name</h2>
//             <h3 className='text-lg font-medium w-1/5'>New Task</h3>
//             <h5 className='text-lg font-medium w-1/5'>Active Task</h5>
//             <h5 className='text-lg font-medium w-1/5'>Completed</h5>
//             <h5 className='text-lg font-medium w-1/5'>Failed</h5>
//         </div>
//         <div className=''>
//         {employees.map(function(elem,idx){
//             return <div key={idx} className='border-2 border-emerald-500 mb-2 py-2 px-4 flex justify-between rounded'>
//             <h2 className='text-lg font-medium  w-1/5'>{elem.firstName}</h2>
//             <h3 className='text-lg font-medium w-1/5 text-blue-400'>{elem.taskCounts.newTask}</h3>
//             <h5 className='text-lg font-medium w-1/5 text-yellow-400'>{elem.taskCounts.active}</h5>
//             <h5 className='text-lg font-medium w-1/5 text-white'>{elem.taskCounts.completed}</h5>
//             <h5 className='text-lg font-medium w-1/5 text-red-600'>{elem.taskCounts.failed}</h5>
//         </div>
//         })}
//         </div>
        
        
//     </div>
//   )
// }

// export default AllTask


// import React, { useContext } from 'react';
// import { AuthContext } from '../../context/AuthProvider';

// const AllTask = () => {
//   const authData = useContext(AuthContext);

//   // Safely retrieve employees or use an empty array
//   const employees = authData?.employees || [];

//   return (
//     <div className="bg-[#1c1c1c] p-5 mt-5 rounded h-48 overflow-auto">
//       <div className="bg-red-400 mb-2 py-2 px-4 flex justify-between rounded">
//         <h2 className="text-lg font-medium w-1/5">Employee Name</h2>
//         <h3 className="text-lg font-medium w-1/5">New Task</h3>
//         <h5 className="text-lg font-medium w-1/5">Active Task</h5>
//         <h5 className="text-lg font-medium w-1/5">Completed</h5>
//         <h5 className="text-lg font-medium w-1/5">Failed</h5>
//       </div>
//       <div className="h-[80%] overflow-auto">
//         {employees.length > 0 ? (
//           employees.map((elem) => {
//             // Ensure taskCounts is defined
//             const taskCounts = elem?.taskCounts || {};
//             const { newTask = 0, active = 0, completed = 0, failed = 0 } = taskCounts;

//             return (
//               <div
//                 key={elem.id || Math.random()} // Unique key to avoid React warnings
//                 className="bg-red-400 mb-2 py-2 px-4 flex justify-between rounded"
//               >
//                 <h2 className="text-lg font-medium w-1/5">{elem?.firstName || 'Unknown'}</h2>
//                 <h3 className="text-lg font-medium w-1/5 text-blue-400">{newTask}</h3>
//                 <h5 className="text-lg font-medium w-1/5 text-yellow-400">{active}</h5>
//                 <h5 className="text-lg font-medium w-1/5 text-white">{completed}</h5>
//                 <h5 className="text-lg font-medium w-1/5 text-red-600">{failed}</h5>
//               </div>
//             );
//           })
//         ) : (
//           <div className="text-center text-white mt-5">
//             <h3 className="text-lg">No employees found</h3>
//             <p>Please add employees to view tasks.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // export default AllTask;
// import React, { useContext } from 'react'
// import { AuthContext } from '../../context/AuthProvider'

// const AllTask = () => {
//    const [userData, setUserData] = useContext(AuthContext)
   
//    // Check if userData and employees exist
//    const employees = userData?.employees || []

//    if (!userData) {
//      return <div>Loading...</div>
//    }

//    return (
//     <div className='bg-[#1c1c1c] p-5 rounded mt-5'>
//         <div className='bg-red-400 mb-2 py-2 px-4 flex justify-between rounded'>
//             <h2 className='text-lg font-medium w-1/5'>Employee Name</h2>
//             <h3 className='text-lg font-medium w-1/5'>New Task</h3>
//             <h5 className='text-lg font-medium w-1/5'>Active Task</h5>
//             <h5 className='text-lg font-medium w-1/5'>Completed</h5>
//             <h5 className='text-lg font-medium w-1/5'>Failed</h5>
//         </div>
//         <div className=''>
//         {employees.map((elem, idx) => (
//             <div key={idx} className='border-2 border-emerald-500 mb-2 py-2 px-4 flex justify-between rounded'>
//                 <h2 className='text-lg font-medium w-1/5'>{elem.firstName}</h2>
//                 <h3 className='text-lg font-medium w-1/5 text-blue-400'>{elem.taskNumbers?.newTask || 0}</h3>
//                 <h5 className='text-lg font-medium w-1/5 text-yellow-400'>{elem.taskNumbers?.active || 0}</h5>
//                 <h5 className='text-lg font-medium w-1/5 text-white'>{elem.taskNumbers?.completed || 0}</h5>
//                 <h5 className='text-lg font-medium w-1/5 text-red-600'>{elem.taskNumbers?.failed || 0}</h5>
//             </div>
//         ))}
//         </div>
//     </div>
//   )
// }

// export default AllTask
import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AllTask = () => {
   const [userData, setUserData] = useContext(AuthContext)
   const employees = userData?.employees || []

   if (!userData) {
     return <div>Loading...</div>
   }

   return (
    <div className='bg-[#1c1c1c] p-5 rounded mt-5'>
        <div className='bg-red-400 mb-2 py-2 px-4 flex justify-between rounded'>
            <h2 className='text-lg font-medium w-1/5'>Employee Name</h2>
            <h3 className='text-lg font-medium w-1/5'>New Task</h3>
            <h5 className='text-lg font-medium w-1/5'>Active Task</h5>
            <h5 className='text-lg font-medium w-1/5'>Completed</h5>
            <h5 className='text-lg font-medium w-1/5'>Failed</h5>
        </div>
        <div className=''>
        {employees.map((elem, idx) => (
            <div key={idx} className='border-2 border-emerald-500 mb-2 py-2 px-4 flex justify-between rounded'>
                <h2 className='text-lg font-medium w-1/5'>{elem.firstName}</h2>
                <h3 className='text-lg font-medium w-1/5 text-blue-400'>{elem.taskNumbers?.newTask || 0}</h3>
                <h5 className='text-lg font-medium w-1/5 text-yellow-400'>{elem.taskNumbers?.active || 0}</h5>
                <h5 className='text-lg font-medium w-1/5 text-white'>{elem.taskNumbers?.completed || 0}</h5>
                <h5 className='text-lg font-medium w-1/5 text-red-600'>{elem.taskNumbers?.failed || 0}</h5>
            </div>
        ))}
        </div>
    </div>
  )
}

export default AllTask
