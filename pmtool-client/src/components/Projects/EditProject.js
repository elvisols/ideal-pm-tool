import React, { Component } from "react";
import { connect } from "react-redux";
import { getProject } from "../../actions/projectActions";
import { editProject } from "../../actions/projectActions";
import PropTypes from "prop-types";
import classnames from "classnames";

class EditProject extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      name: "",
      identifier: "",
      description: "",
      start_date: "",
      end_date: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // handles next props after an api call
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    const {
      id,
      name,
      identifier,
      description,
      start_date,
      end_date
    } = nextProps.project.project;

    this.setState({
      id,
      name,
      identifier,
      description,
      start_date,
      end_date
    });
  }

  componentDidMount() {
    const { params } = this.props.match;
    this.props.getProject(params.identifier, this.props.history); // get project into our state
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const myProject = {
      id: this.state.id,
      name: this.state.name,
      identifier: this.state.identifier,
      description: this.state.description,
      start_date: this.state.start_date,
      end_date: this.state.end_date
    };

    this.props.editProject(myProject, this.props.history);
  }

  render() {
    const { errors } = this.state;
    // const { project } = this.props.project;
    return (
      <div>
        <div className="project">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">
                  Edit [{this.state.name}] Project Form
                </h5>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.name
                      })}
                      placeholder="Project Name"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                    {errors.name && (
                      // div.invalid-feedback
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.identifier
                      })}
                      placeholder="Unique Project ID"
                      name="identifier"
                      value={this.state.identifier}
                      onChange={this.onChange}
                      disabled
                    />
                    {errors.identifier && (
                      <div className="invalid-feedback">
                        {errors.identifier}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <textarea
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.description
                      })}
                      placeholder="Project Description"
                      name="description"
                      value={this.state.description}
                      onChange={this.onChange}
                    ></textarea>
                    {errors.description && (
                      <div className="invalid-feedback">
                        {errors.description}
                      </div>
                    )}
                    <p>{errors.description}</p>
                  </div>
                  <h6>Start Date</h6>
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      name="start_date"
                      value={this.state.start_date}
                      onChange={this.onChange}
                    />
                  </div>
                  <h6>Estimated End Date</h6>
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      name="end_date"
                      value={this.state.end_date}
                      onChange={this.onChange}
                    />
                  </div>

                  <input
                    type="submit"
                    className="btn btn-primary btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProject.propTypes = {
  project: PropTypes.object.isRequired,
  getProject: PropTypes.func.isRequired,
  editProject: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  project: state.project,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getProject, editProject }
)(EditProject);
