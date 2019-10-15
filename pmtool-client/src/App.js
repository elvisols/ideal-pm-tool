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
