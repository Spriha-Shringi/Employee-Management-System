import React, { useState, useEffect } from 'react';
import Header from '../Others/Header';
import CreateTask from '../Others/CreateTask';
import AllTask from '../Others/AllTask';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';

const AdminDashboard = ({ changeUser }) => {
  const [activeTab, setActiveTab] = useState('tasks'); // Track active tab (Tasks / Users)
  const [showAddUser, setShowAddUser] = useState(false);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [tasks, setTasks] = useState({
    new: [],
    active: [],
    completed: [],
    failed: []
  });

  // Fetching users from Firebase Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'employees'));
      const usersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersData);
    };
    fetchUsers();
  }, []);

  // Fetching tasks from Firebase Firestore
  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, 'tasks'));
      const tasksData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setTasks({
        new: tasksData.filter(task => task.status === 'new'),
        active: tasksData.filter(task => task.status === 'active'),
        completed: tasksData.filter(task => task.status === 'completed'),
        failed: tasksData.filter(task => task.status === 'failed')
      });
    };
    fetchTasks();
  }, []);

  // Handle adding a user to Firestore
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const newUserDoc = await addDoc(collection(db, 'employees'), {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        createdAt: new Date().toISOString()
      });

      setUsers([...users, { id: newUserDoc.id, ...newUser }]);
      setShowAddUser(false);
      setNewUser({ name: '', email: '', password: '' });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  // Handle adding a task to Firestore
  const handleAddTask = async (taskData) => {
    try {
      const newTaskDoc = await addDoc(collection(db, 'tasks'), {
        name: taskData.name,
        description: taskData.description,
        assignedTo: taskData.assignedTo,  // User ID of the assigned employee
        status: 'new', // Default status
        createdAt: new Date().toISOString()
      });

      setTasks({
        ...tasks,
        new: [...tasks.new, { id: newTaskDoc.id, ...taskData }]
      });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="min-h-screen w-full p-10 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600">
      <Header changeUser={changeUser} />

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('tasks')}
              className="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-white hover:text-yellow-300"
            >
              Tasks
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-white hover:text-yellow-300"
            >
              Users
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'tasks' ? (
        <>
          <CreateTask handleAddTask={handleAddTask} />
          <AllTask tasks={tasks} users={users} />
        </>
      ) : (
        <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Manage Users</h2>
            <button
              onClick={() => setShowAddUser(true)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
            >
              Add User
            </button>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium">Created At</th>
                </tr>
              </thead>
              <tbody className="bg-gray-50">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-200">
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Add New User</h3>
            <form onSubmit={handleAddUser} className="space-y-4">
              <label className="block">
                <span className="text-gray-700">Name</span>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  className="mt-1 block w-full p-3 border rounded-lg text-gray-800"
                  required
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Email</span>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  className="mt-1 block w-full p-3 border rounded-lg text-gray-800"
                  required
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Password</span>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  className="mt-1 block w-full p-3 border rounded-lg text-gray-800"
                  required
                />
              </label>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowAddUser(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
