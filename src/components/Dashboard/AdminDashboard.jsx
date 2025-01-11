import React, { useState, useEffect, useContext } from 'react';
import Header from '../Others/Header';
import CreateTask from '../Others/CreateTask';
import AllTask from '../Others/AllTask';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const AdminDashboard = ({ changeUser }) => {
  const [activeTab, setActiveTab] = useState('tasks');
  const [showAddUser, setShowAddUser] = useState(false);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [userData, setUserData] = useContext(AuthContext);

  // Fetching users from Firebase Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'employees'));
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        taskNumbers: doc.data().taskNumbers || {
          newTask: 0,
          active: 0,
          completed: 0,
          failed: 0,
        },
      }));
      setUsers(usersData);
      // Update AuthContext with fetched users
      setUserData((prev) => ({
        ...prev,
        employees: usersData,
      }));
    };
    fetchUsers();
  }, []);

  // Handle adding a user to Firestore
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const employeeData = {
        firstName: newUser.name,
        email: newUser.email,
        password: newUser.password,
        createdAt: new Date().toISOString(),
        taskNumbers: {
          newTask: 0,
          active: 0,
          completed: 0,
          failed: 0,
        },
        tasks: [],
      };

      const newUserDoc = await addDoc(collection(db, 'employees'), employeeData);

      const newEmployeeWithId = {
        id: newUserDoc.id,
        ...employeeData,
      };

      setUsers((prevUsers) => [...prevUsers, newEmployeeWithId]);
      setUserData((prev) => ({
        ...prev,
        employees: [...(prev.employees || []), newEmployeeWithId],
      }));

      setShowAddUser(false);
      setNewUser({ name: '', email: '', password: '' });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  // Handle deleting a user
  const handleDeleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, 'employees', id));
      setUsers(users.filter((user) => user.id !== id));
      setUserData((prev) => ({
        ...prev,
        employees: prev.employees.filter((emp) => emp.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      changeUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Toggle Password Visibility
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-white hover:text-yellow-300 ${
                activeTab === 'tasks' ? 'border-yellow-300' : 'border-transparent'
              }`}
            >
              Tasks
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-white hover:text-yellow-300 ${
                activeTab === 'users' ? 'border-yellow-300' : 'border-transparent'
              }`}
            >
              Users
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'tasks' ? (
        <>
          <CreateTask />
          <AllTask />
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
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white">Password</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white">Created At</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-gray-100">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-200">
                    <td className="px-6 py-4 text-black">{user.firstName}</td>
                    <td className="px-6 py-4 text-black">{user.email}</td>
                    <td className="px-6 py-4 text-black">
                      {visiblePasswords[user.id] ? user.password : '********'}
                      <button
                        onClick={() => togglePasswordVisibility(user.id)}
                        className="ml-2 text-blue-500 hover:underline"
                      >
                        {visiblePasswords[user.id] ? 'Hide' : 'Show'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-black">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
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
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="mt-1 block w-full p-3 border rounded-lg text-gray-800"
                  required
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Email</span>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="mt-1 block w-full p-3 border rounded-lg text-gray-800"
                  required
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Password</span>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
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
