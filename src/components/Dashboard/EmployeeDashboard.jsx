import React from 'react';
import Header from '../Others/Header';
import TaskListNumbers from '../Others/TaskListNumbers';
import TaskList from '../TaskList/TaskList';
import PropTypes from 'prop-types';

const EmployeeDashboard = ({ changeUser, data }) => {
  return (
    <div className="p-10 bg-[#1C1C1C] h-screen">
      <Header changeUser={changeUser} data={data} />
      <TaskListNumbers data={data} />
      <TaskList data={data} />
    </div>
  );
};

EmployeeDashboard.propTypes = {
  changeUser: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default EmployeeDashboard;
