import axios from "axios";
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT } from "./types";

export const createProject = (project, history) => async dispatch => {
  try {
    const res = await axios.post("/api/projects", project);
    console.log("create project response: " + res);
    history.push("/dashboard");
    // solution, to clear error state
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (err) {
    dispatch({
      // dispatch, using thunk, to the reducer
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const editProject = (project, history) => async dispatch => {
  try {
    const res = await axios.put("/api/projects", project);
    console.log("edit project response: " + res);
    history.push("/dashboard");
  } catch (err) {
    dispatch({
      // dispatch, using thunk, to the reducer
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getProjects = () => async dispatch => {
  const res = await axios.get("/api/projects");
  console.log("get project response: " + res);
  dispatch({
    type: GET_PROJECTS,
    payload: res.data
  });
};

export const getProject = (identifier, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/projects/${identifier}`);
    dispatch({
      type: GET_PROJECT,
      payload: res.data
    });
  } catch (err) {
    history.push("/dashboard");
  }
};

export const deleteProject = (identifier, history) => async dispatch => {
  if (
    window.confirm(
      "Are you sure? This will delete the project [" +
        identifier +
        "] and all the data related to it"
    )
  ) {
    try {
      const res = await axios.delete(`/api/projects/${identifier}`);
      console.log("delete project response: " + res); // ` => backtex
      dispatch({
        type: DELETE_PROJECT,
        payload: identifier
      });
    } catch (err) {
      console.log("error is " + err);
    }
  }
};
