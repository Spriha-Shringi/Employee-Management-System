import React, { useContext, useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Auth/Login.jsx';
import Signup from './components/Auth/Signup.jsx';
import Emp from './components/Auth/Emp.jsx';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard.jsx';
import AdminDashboard from './components/Dashboard/AdminDashboard.jsx';
import { AuthContext } from './context/AuthProvider';
import AuthRoute from './components/Auth/AuthRoute.jsx';

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

const EmployeeApp = () => {
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
  }, [location]);

  const handleLogin = (email, password) => {
    if (
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
      <Route path="/signup" element={<Signup />} />
      <Route path="/EmployeeLogin" element={<Emp handleLogin={handleLogin} />} />
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
      <Route path="*" element={<Navigate to="/EmployeeLogin" replace />} />
    </Routes>
  );
};

const AdminApp = () => {
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

  const handleLoginA = (email, password) => {
    if (email === 'admin@me.com' && password === '123456') {
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }));
      setUser('admin');
    } else {
      alert('Invalid Credentials');
    }
  };

  return (
    <Routes>
      <Route path="/login" element={<Login handleLogin={handleLoginA} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin" element={
        <AuthRoute>
          <AdminDashboard
            changeUser={() => {
              setUser(null);
              setloggedInUserData(null);
            }}
          />
        </AuthRoute>
      } />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

const App = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/employee') || location.pathname === '/EmployeeLogin') {
    return <EmployeeApp />;
  }
  return <AdminApp />;
};

export default App;
