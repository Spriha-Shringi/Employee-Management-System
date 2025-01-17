import React, { useContext, useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Auth/Login.jsx';
import Signup from './components/Auth/Signup.jsx';
import Emp from './components/Auth/Emp.jsx';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard.jsx';
import AdminDashboard from './components/Dashboard/AdminDashboard.jsx';
import { AuthContext } from './context/AuthProvider';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRole }) => {
  const loggedInUser = localStorage.getItem('loggedInUser');
  
  if (!loggedInUser) {
    return <Navigate to="/login" replace />;
  }
  
  try {
    const userData = JSON.parse(loggedInUser);
    if (!userData.role || !userData.data) {
      localStorage.removeItem('loggedInUser');
      return <Navigate to="/login" replace />;
    }
    
    if (userData.role !== allowedRole) {
      return <Navigate to="/login" replace />;
    }
    
    return children;
  } catch (error) {
    console.error('Error parsing user data:', error);
    localStorage.removeItem('loggedInUser');
    return <Navigate to="/login" replace />;
  }
};

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setloggedInUserData] = useState(null);
  const [userData] = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      try {
        const parsed = JSON.parse(loggedInUser);
        if (parsed.role && parsed.data) {
          setUser(parsed.role);
          setloggedInUserData(parsed.data);
        } else {
          localStorage.removeItem('loggedInUser');
          setUser(null);
          setloggedInUserData(null);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('loggedInUser');
        setUser(null);
        setloggedInUserData(null);
      }
    }
  }, [location]); // Re-run when location changes

  const handleLogin = (email, password) => {
    if (email === 'admin@me.com' && password === '123456') {
      const adminData = { 
        role: 'admin', 
        data: { 
          email: 'admin@me.com',
          name: 'Admin User'
        } 
      };
      localStorage.setItem('loggedInUser', JSON.stringify(adminData));
      setUser('admin');
      setloggedInUserData(adminData.data);
    } else if (
      userData &&
      userData.employees.some((e) => e.email === email && e.password === password)
    ) {
      const employee = userData.employees.find(
        (e) => e.email === email && e.password === password
      );
      const employeeData = { role: 'employee', data: employee };
      localStorage.setItem('loggedInUser', JSON.stringify(employeeData));
      setUser('employee');
      setloggedInUserData(employee);
    } else {
      alert('Invalid Credentials');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
    setloggedInUserData(null);
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login handleLogin={handleLogin} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/EmployeeLogin" element={<Emp handleLogin={handleLogin} />} />
      
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard changeUser={handleLogout} />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/employee"
        element={
          <ProtectedRoute allowedRole="employee">
            {loggedInUserData ? (
              <EmployeeDashboard
                changeUser={handleLogout}
                data={loggedInUserData}
              />
            ) : (
              <div className="flex justify-center items-center h-screen">
                Loading...
              </div>
            )}
          </ProtectedRoute>
        }
      />
      
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;