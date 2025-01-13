import React, { useContext, useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login.jsx';
import Signup from './components/Auth/Signup.jsx';
import Emp from './components/Auth/Emp.jsx';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard.jsx';
import AdminDashboard from './components/Dashboard/AdminDashboard.jsx';
import AuthRoute from './components/Auth/AuthRoute.jsx';
import { AuthContext } from './context/AuthProvider';

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setloggedInUserData] = useState(null);
  const [userData] = useContext(AuthContext);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);
      setUser(userData.role);
      setloggedInUserData(userData.data);
    }
  }, []);

  const handleLogin = (email, password) => {
    if (email === 'admin@me.com' && password === '123456') {
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

  return (
    <Routes>
      {/* Add a root route that redirects to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      <Route path="/login" element={<Login handleLogin={handleLogin} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/EmployeeLogin" element={<Emp />} />
      <Route
        path="/admin"
        element={
          <AuthRoute>
            <AdminDashboard
              changeUser={() => {
                setUser(null);
                setloggedInUserData(null);
              }}
            />
          </AuthRoute>
        }
      />
      <Route
        path="/employee"
        element={
          <AuthRoute>
            {loggedInUserData ? (
              <EmployeeDashboard
                changeUser={() => {
                  setUser(null);
                  setloggedInUserData(null);
                }}
                data={loggedInUserData}
              />
            ) : (
              <Navigate to="/login" replace />
            )}
          </AuthRoute>
        }
      />
      {/* Add a catch-all route for unmatched paths */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;