import React, { Component } from "react";
import ProjectItem from "./Projects/ProjectItem";
import CreateProjectButton from "./Projects/CreateProjectButton";
import { connect } from "react-redux";
import { getProjects } from "../actions/projectActions";
import Spinning from "./Icons/Spinning";
// import drawing from "../lib/chart";
import PropTypes from "prop-types";

/**
 * Class based component generated using 'rcc + ENTER'.
 * This is component that can take props and allows the class to use life cycle hooks i.e how the component should be render what type of data should be in it's state
 */
class Dashboard extends Component {
  constructor() {
    super();
    this.state = { data: [], loading: false };
  }
  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    const { projects } = this.props.project; // same as const projects = this.props.project.projects;

    if (this.state.loading) {
      return <Spinning />;
    } else {
      // using JSX
      return (
        <div className="projects">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4 text-center">Projects</h1>
                <br />
                <CreateProjectButton />
                <br />
                <hr />
                {// You can pass properties from the parent(Dashboard) to the child(ProjectItem) NOT the other way round
                projects.map(project => (
                  <ProjectItem key={project.id} proj={project} />
                ))}
                {
                  // drawing(this.state.data)[this.props.blockName][this.props.subcatName]
                }
              </div>
            </div>
          </div>
        </div>

        // <!--End of Dashboard Component-- >
      );
    }
  }
}

Dashboard.propTypes = {
  project: PropTypes.object.isRequired,
  getProjects: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  project: state.project
});

export default connect(
  mapStateToProps,
  { getProjects }
)(Dashboard);
