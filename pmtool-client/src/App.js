import React from "react";

import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css"; // npm install boostrap
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // npm install react-router-dom@4.3.1
import AddProject from "./components/Projects/AddProject";
import { Provider } from "react-redux"; // used to setup store
import store from "./store";
import EditProject from "./components/Projects/EditProject";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./components/ProjectBoard/ProjectTasks/AddProjectTask";
import UpdateProjectTask from "./components/ProjectBoard/ProjectTasks/UpdateProjectTask";
import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecuredRoute from "./securityUtils/SecureRoute";

// retrieve token in store into state on each reload.
const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decode_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decode_jwtToken
  });

  const currentTime = Date.now() / 1000;
  // check token validity
  if (decode_jwtToken.exp < currentTime) {
    // handle logout
    store.dispatch(logout());
    window.location.href = "/";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          {
            // when you use react route dom to render a component that passes it a set of props
            // public route
          }

          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />

          {
            // private route
          }
          <Switch>
            <SecuredRoute exact path="/dashboard" component={Dashboard} />
            <SecuredRoute exact path="/addProject" component={AddProject} />
            <SecuredRoute
              exact
              path="/editProject/:identifier"
              component={EditProject}
            />
            <SecuredRoute
              exact
              path="/projectBoard/:identifier"
              component={ProjectBoard}
            />
            <SecuredRoute
              exact
              path="/addProjectTask/:identifier"
              component={AddProjectTask}
            />
            <SecuredRoute
              exact
              path="/updateProjectTask/:backlog_id/:pt_id"
              component={UpdateProjectTask}
            />
          </Switch>
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
