import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteProjectTask } from '../../actions/projectTaskActions';
import QuickButton from './QuickButton';

class ProjectTaskItem extends Component {

    onDeleteClick = (projectIdentifier, projectSequence) => {
        this.props.deleteProjectTask(projectIdentifier, projectSequence);
    }


    render() {

        const { projectTask } = this.props;

        function displayPriority() {
            switch(projectTask.priority){
                case 1: return "HIGH"
                case 2: return"MEDIUM"
                case 3: return"LOW"
                default: return"LOW"
            }
        }

        function quickMove(projectTask) {
            switch(projectTask.status){
                case "TO_DO": 
                    return <QuickButton message="START DOING" projectTask={projectTask} />
                case "IN_PROGRESS": 
                    return <QuickButton message="COMPLETE" projectTask={projectTask} />
                case "DONE": 
                    return <QuickButton message="REOPEN" projectTask={projectTask}/>
                default:
                    return ""
            }
        }

        return (
            <div className="card mb-3 bg-light">
                <div className="card-header text-primary">
                    <span>ID: <b>{projectTask.projectSequence}</b></span>
                    <span style={{float:'right'}}>Prirority: <b>{displayPriority()}</b></span>

                </div>
                <div className="card-body bg-light">
                    <small>Summary: </small><span className="card-title"><b>{projectTask.summary}</b></span>
                    <p className="card-text text-truncate ">
                        <small>Assignee: </small><b>{projectTask.assignee}</b>
                    </p>
                    
                <button 
                    className="btn btn-outline-danger ml-2" 
                    style={{float:'right'}} 
                    onClick={this.onDeleteClick.bind(this, projectTask.projectIdentifier, projectTask.projectSequence)}>
                    <i className="fas fa-trash-alt"></i>
                </button>

                <Link to={`/updateProjectTask/${projectTask.projectIdentifier}/${projectTask.projectSequence}`}>
                    <div className="btn btn-outline-secondary" style={{float:'right'}}>
                        <i className="fas fa-pencil-alt"></i>
                    </div>
                </Link>
                {quickMove(projectTask)}
                </div>
            </div>
        )
    }
}

ProjectTaskItem.propTypes = {
    deleteProjectTask: PropTypes.func.isRequired
}

export default connect(null, {deleteProjectTask}) (ProjectTaskItem);
