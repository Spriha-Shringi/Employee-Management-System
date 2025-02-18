import React from 'react';
import Header from '../Others/Header';
import TaskListNumbers from '../Others/TaskListNumbers';
import TaskList from '../TaskList/TaskList';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = ({ changeUser, data }) => {
  const navigate = useNavigate();

  // If no data, redirect to login
  if (!data) {
    navigate('/login');
    return null;
  }

  return (
    <div className="p-10 bg-[#1C1C1C] h-screen font-red">
      <Header changeUser={changeUser} data={data} />
      <TaskListNumbers data={data} />
      <TaskList employeeId={data.id} /> {/* Pass employeeId here */}
      <div className="text-white mt-4">
        Welcome, {data.name || data.email}
      </div>
    </div>
  );
};

EmployeeDashboard.propTypes = {
  changeUser: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.string.isRequired, // Ensure 'id' exists in the data prop
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default EmployeeDashboard;
