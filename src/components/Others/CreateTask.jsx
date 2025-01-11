import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase-config';

const CreateTask = () => {
  const [userData, setUserData] = useContext(AuthContext);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  // Check if employee exists in userData
  const findEmployee = (employeeName) => {
    return userData?.employees?.find(emp => emp.firstName.toLowerCase() === employeeName.toLowerCase());
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');

    const employee = findEmployee(assignTo);
    if (!employee) {
      setError('Employee not found. Please select a valid employee.');
      return;
    }

    const newTask = {
      title: taskTitle,
      description: taskDescription,
      date: taskDate,
      assignedTo: assignTo,
      category: category,
      status: 'new',
      createdAt: new Date().toISOString(),
      employeeId: employee.id
    };

    try {
      // Add task to Firestore
      const taskRef = await addDoc(collection(db, 'tasks'), newTask);
      
      // Update employee's task numbers in Firestore
      const employeeRef = doc(db, 'employees', employee.id);
      const updatedTaskNumbers = {
        ...employee.taskNumbers,
        newTask: (employee.taskNumbers?.newTask || 0) + 1
      };
      
      await updateDoc(employeeRef, {
        taskNumbers: updatedTaskNumbers
      });

      // Update local state
      const updatedEmployees = userData.employees.map(emp => {
        if (emp.id === employee.id) {
          return {
            ...emp,
            taskNumbers: updatedTaskNumbers,
            tasks: [...(emp.tasks || []), { id: taskRef.id, ...newTask }]
          };
        }
        return emp;
      });

      setUserData(prev => ({
        ...prev,
        employees: updatedEmployees
      }));

      // Reset form
      setTaskTitle('');
      setTaskDescription('');
      setTaskDate('');
      setAssignTo('');
      setCategory('');
      setError('');
    } catch (error) {
      console.error('Error creating task:', error);
      setError('Failed to create task. Please try again.');
    }
  };

  return (
    <div className="p-5 bg-[#1c1c1c] mt-5 rounded">
      {error && (
        <div className="bg-red-500 text-white p-3 mb-4 rounded">
          {error}
        </div>
      )}
      <form onSubmit={submitHandler} className="flex flex-wrap w-full items-start justify-between">
        <div className="w-1/2">
          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Task Title</h3>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
              type="text"
              placeholder="Make a UI design"
              required
            />
          </div>
          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Date</h3>
            <input
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
            //   type="text"
              type="date"
              required
            />
          </div>
          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Assign to</h3>
            <select
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-[#1c1c1c] border-[1px] border-gray-400 mb-4"
              required
            >
              <option value="">Select Employee</option>
              {userData?.employees?.map((emp) => (
                <option key={emp.id} value={emp.firstName}>
                  {emp.firstName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Category</h3>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
              type="text"
              placeholder="Design, dev, etc."
              required
            />
          </div>
        </div>

        <div className="w-2/5 flex flex-col items-start">
          <h3 className="text-sm text-gray-300 mb-0.5">Description</h3>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="w-full h-44 text-sm py-2 px-4 rounded outline-none bg-transparent border-[1px] border-gray-400"
            placeholder="Add a detailed task description..."
            required
          />
          <button
            type="submit"
            className="bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full"
            disabled={!userData?.employees?.length}
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;