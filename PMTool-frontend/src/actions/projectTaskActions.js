import axios from 'axios';
import { GET_ERRORS, GET_PROJECT_TASKS, DELETE_PROJECT_TASK, GET_PROJECT_TASK } from './types';

export const addProjectTask = (project_identifier, project_task, history) => async dispatch => {
    try {
        await axios.post(`/api/backlog/${project_identifier}`, project_task);
        history.push(`/projectBoard/${project_identifier}`);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch(error) {
        console.log(error)
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}

export const getBacklog = (project_identifier) => async dispatch => {
    try {
        const res = await axios.get(`/api/backlog/${project_identifier}`);
        dispatch({
            type: GET_PROJECT_TASKS,
            payload: res.data
        });
    } catch(errors) {
        dispatch({
            type: GET_ERRORS,
            payload: errors.response.data
        })
    }
}

export const deleteProjectTask = (projectIdentifier, projectSequence) => async dispatch => {
    if(window.confirm("Are you sure you want to delete this project task?")) {
        await axios.delete(`/api/backlog/${projectIdentifier}/${projectSequence}`);
        dispatch ({
            type: DELETE_PROJECT_TASK,
            payload: projectSequence
        });
    }
}

export const getProjectTask = (project_identifier, projectSequence, history) => async dispatch => {
    try{
        const res = await axios.get(`/api/backlog/${project_identifier}/${projectSequence}`);
        dispatch ({
            type: GET_PROJECT_TASK,
            payload: res.data
        });
    } catch(error) {
        history.push(`/projectBoard/${project_identifier}`);
    }
}

export const updateProjectTask = (projectIdentifier, projectSequence, projectTask, history) => async dispatch => {
    try {
        await axios.patch(`/api/backlog/${projectIdentifier}/${projectSequence}`, projectTask);
        if(history != null) {
            history.push(`/projectBoard/${projectIdentifier}`);
        }
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
          });
    }

}

export const clearErrors = () => async dispatch => {
    dispatch({
        type: GET_ERRORS,
        payload: {}
    });
}