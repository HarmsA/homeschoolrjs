import "./App.css";
import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
// import useAuthContext from 'hooks/useAuthContext'

// import Signup from "./pages/signup/signup";
import Navbar from "./components/navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import Create from "./pages/create/Create";
import Project from "./pages/project/Project";
import Login from "./pages/login/Login";
import Sidebar from "./components/Sidebar";
import { useAuthContext } from "./hooks/useAuthContext";
import StoredCompleted from "./pages/storedCompleted/StoredCompleted";
import StoredCompletedTable from "./pages/storedCompleted/StoredCompletedTable";
import ProjectFutureAssignment from "./pages/project/ProjectFutureAssignment";

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}

          <div className="container">
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={!user ? <Navigate to="/login" /> : <Dashboard />}
              />
              <Route path="/create" element={!user ? <Navigate to="/login" /> : <Create />} />
              <Route path="/projects/:id" element={!user ? <Navigate to="/login" /> : <Project />} />
              <Route path="/completed" element={!user ? <Navigate to="/login" /> : <StoredCompleted />} />
              <Route path="/not-published" element={!user ? <Navigate to="/login" /> : <ProjectFutureAssignment />} />
              <Route path="/completed/gridView" element={!user ? <Navigate to="/login" /> : <StoredCompletedTable />} />
              <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
              <Route path="/signup" element={user ? <Navigate to="/" /> : <Login />} />
            </Routes>
          </div>
          <div className="footer"></div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;