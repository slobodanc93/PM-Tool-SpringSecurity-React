import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProjectTask } from '../../actions/projectTaskActions';

class QuickButton extends Component {

    render() {
        const handleOnClick = () => {
            const {projectTask} = this.props;
            switch(projectTask.status) {
                case "TO_DO": 
                    projectTask.status="IN_PROGRESS";
                    break;
                case "IN_PROGRESS": 
                    projectTask.status="DONE";
                    break;
                case "DONE": 
                    projectTask.status="TO_DO";
                    break;
                default:
                    projectTask.status="TO_DO";
            }
            this.props.updateProjectTask(projectTask.projectIdentifier, projectTask.projectSequence, projectTask, null);

        }

        return (
            <button 
                className="btn btn-outline-info" 
                style={{float:'left'}}
                onClick={handleOnClick} >
                {this.props.message}
            </button>
        )
    }
}

QuickButton.propTypes = {
    updateProjectTask: PropTypes.func.isRequired
}


export default connect(null, {updateProjectTask}) (QuickButton);