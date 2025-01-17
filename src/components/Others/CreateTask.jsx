import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase-config';

const CreateTask = () => {
  const [userData, setUserData] = useContext(AuthContext);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  // Find employee by name
  const findEmployee = (employeeName) => {
    return userData?.employees?.find(
      (emp) => emp.firstName.toLowerCase() === employeeName.toLowerCase()
    );
  };

  // Validate task uniqueness
  const isTaskTitleUnique = (employee, taskTitle) => {
    return !(employee.tasks || []).some(
      (task) => task.title.toLowerCase() === taskTitle.toLowerCase()
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');

    const employee = findEmployee(assignTo);
    if (!employee) {
      setError('Employee not found. Please select a valid employee.');
      return;
    }

    if (!isTaskTitleUnique(employee, taskTitle)) {
      setError('Task title must be unique for this employee.');
      return;
    }

    const newTask = {
      id: Date.now().toString(), // Unique task ID
      title: taskTitle,
      description: taskDescription,
      date: taskDate,
      category: category,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    try {
      // Update Firestore with the new task and increment new task count
      const employeeRef = doc(db, 'employees', employee.id);
      await updateDoc(employeeRef, {
        tasks: arrayUnion(newTask),
        'taskNumbers.newTask': (employee.taskNumbers?.newTask || 0) + 1, // Increment newTask count
      });

      // Update local state
      const updatedEmployees = userData.employees.map((emp) => {
        if (emp.id === employee.id) {
          return {
            ...emp,
            tasks: [...(emp.tasks || []), newTask],
            taskNumbers: {
              ...emp.taskNumbers,
              newTask: (emp.taskNumbers?.newTask || 0) + 1,
            },
          };
        }
        return emp;
      });

      setUserData((prev) => ({
        ...prev,
        employees: updatedEmployees,
      }));

      // Reset form fields
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
        <div className="bg-red-500 text-white p-3 mb-4 rounded">{error}</div>
      )}
      <form
        onSubmit={submitHandler}
        className="flex flex-wrap w-full items-start justify-between"
      >
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
