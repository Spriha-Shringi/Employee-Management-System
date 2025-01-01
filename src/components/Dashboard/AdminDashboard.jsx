import React from 'react'
import Header from '../Others/Header'
import CreateTask from '../Others/CreateTask'
import AllTask from '../Others/AllTask'


const AdminDashboard = (props) => {
  return (
    <div className='h-screen w-full p-10'>
      <Header changeUser={props.changeUser} />
      <CreateTask/>
      <AllTask/>
    </div>
  )
}

export default AdminDashboard
// import React from 'react';
// import Header from '../Others/Header';
// import CreateTask from '../Others/CreateTask';
// import AllTask from '../Others/AllTask';

// const AdminDashboard = ({ changeUser, loggedInUserData }) => {
//   return (
//     <div className='h-screen w-full p-10'>
//       {/* Pass changeUser and loggedInUserData to Header */}
//       <Header changeUser={changeUser} data={loggedInUserData} />
//       <CreateTask />
//       <AllTask />
//     </div>
//   );
// };

// export default AdminDashboard;
