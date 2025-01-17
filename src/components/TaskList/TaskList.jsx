import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import AcceptTask from './AcceptTask';
import NewTask from './NewTask';
import CompletedTask from './CompletedTask';
import FailedTask from './FailedTask';

const TaskList = ({ employeeId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeTasks = async () => {
      if (!employeeId) return;

      setLoading(true);
      try {
        const employeeRef = doc(db, 'employees', employeeId);
        const employeeSnap = await getDoc(employeeRef);

        if (employeeSnap.exists()) {
          const employeeData = employeeSnap.data();
          setTasks(employeeData.tasks || []);
        } else {
          console.error('No employee found with the given ID');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeTasks();
  }, [employeeId]);

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  if (loading) {
    return <div className="flex justify-center items-center">Loading tasks...</div>;
  }

  if (!tasks.length) {
    return <div className="flex justify-center items-center">No tasks found.</div>;
  }

  return (
    <div
      id="tasklist"
      className="h-[55%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-5 mt-10"
    >
      {tasks.map((task, idx) => {
        if (task.status === 'active') {
          return <AcceptTask key={idx} data={task} />;
        }
        if (task.status === 'new') {
          return (
            <NewTask key={idx} data={task} onStatusChange={handleStatusChange} />
          );
        }
        if (task.status === 'completed') {
          return <CompletedTask key={idx} data={task} />;
        }
        if (task.status === 'failed') {
          return <FailedTask key={idx} data={task} />;
        }
        return null;
      })}
    </div>
  );
};

export default TaskList;
