import  { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import projectReducer from './projectReducer';
import projectTaskReducer from './projectTaskReducer';
import userReducer from './userReducer';

export default combineReducers ({
    errors: errorReducer,
    projects: projectReducer,
    projectTasks: projectTaskReducer,
    security: userReducer
});