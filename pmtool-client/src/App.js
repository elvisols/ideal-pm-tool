import React from "react";

import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css"; // npm install boostrap
import { BrowserRouter as Router, Route } from "react-router-dom"; // npm install react-router-dom@4.3.1
import AddProject from "./components/Projects/AddProject";
import { Provider } from "react-redux"; // used to setup store
import store from "./store";
import EditProject from "./components/Projects/EditProject";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./components/ProjectBoard/ProjectTasks/AddProjectTask";
import UpdateProjectTask from "./components/ProjectBoard/ProjectTasks/UpdateProjectTask";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          {
            // when you use react route dom to render a component that passes it a set of props
          }
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/addProject" component={AddProject} />
          <Route
            exact
            path="/editProject/:identifier"
            component={EditProject}
          />
          <Route
            exact
            path="/projectBoard/:identifier"
            component={ProjectBoard}
          />
          <Route
            exact
            path="/addProjectTask/:identifier"
            component={AddProjectTask}
          />
          <Route
            exact
            path="/updateProjectTask/:backlog_id/:pt_id"
            component={UpdateProjectTask}
          />
        </div>
      </Router>
    </Provider>
  );
}

export default App;

/**
 * class based component can tap into life cycle 'hooks' and 'state' while
 * functional component you can tap into the 'props'. Its basically stateless
 */
