import "./App.css";
import React from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
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
            <Switch>
              <Route exact path="/">
                {!user && <Redirect to="/login" />}
                {user && <Dashboard />}
              </Route>
              <Route path="/create">
                {!user && <Redirect to="/login" />}
                {user && <Create />}
              </Route>
              <Route path="/projects/:id">
                {!user && <Redirect to="/login" />}
                {user && <Project />}
              </Route>
              <Route path="/completed">
                {user && <StoredCompleted />}
                {!user && <Redirect to="/login" />}
              </Route>
              <Route path="/not-published">
                {user && <ProjectFutureAssignment />}
                {!user && <Redirect to="/login" />}
              </Route>
              <Route path="/completed/gridView">
                {user && <StoredCompletedTable />}
                {!user && <Redirect to="/login" />}
              </Route>
              <Route path="/login">
                {user && <Redirect to="/" />}
                {!user && <Login />}
              </Route>
              <Route path="/signup">
                {user && <Redirect to="/" />}
                {!user && <Login />}
              </Route>
            </Switch>
          </div>
          <div className="footer"></div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
