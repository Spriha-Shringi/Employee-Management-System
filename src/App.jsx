import React, { useContext, useState, useEffect } from 'react';
import Login from './components/Auth/Login';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import { AuthContext } from './context/AuthProvider';

const App = () => {
  const [user, setUser] = useState(null); // Track user role
  const [loggedInUserData, setloggedInUserData] = useState(null); // Track user data
  const [userData] = useContext(AuthContext); // Access auth context

  // Load user information from localStorage on initial render
  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);
      setUser(userData.role);
      setloggedInUserData(userData.data);
    }
  }, []);

  // Handle login functionality
  const handleLogin = (email, password) => {
    if (email === 'admin@me.com' && password === '123') {
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }));
      setUser('admin');
    } else if (
      userData &&
      userData.employees.some((e) => e.email === email && e.password === password)
    ) {
      const employee = userData.employees.find(
        (e) => e.email === email && e.password === password
      );
      localStorage.setItem(
        'loggedInUser',
        JSON.stringify({ role: 'employee', data: employee })
      );
      setUser('employee');
      setloggedInUserData(employee);
    } else {
      alert('Invalid Credentials');
    }
  };

  // Render Login or appropriate dashboard
  return (
    <>
      {!user ? (
        <Login handleLogin={handleLogin} />
      ) : user === 'admin' ? (
        <AdminDashboard changeUser={() => {
          setUser(null); // Reset user state
          setloggedInUserData(null); // Reset user data
        }}
        />
      ) : (
        <EmployeeDashboard
          changeUser={() => {
            setUser(null); // Reset user state
            setloggedInUserData(null); // Reset user data
          }}
          data={loggedInUserData}
        />
      )}
    </>
  );
};

export default App;
