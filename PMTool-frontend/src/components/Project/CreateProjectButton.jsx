import React from 'react';
import { Link } from 'react-router-dom';

const CreateProjectButton = () => {
    return (
        <Link to="/addProject">
            <div className="new-project-button">
                <i className="fas fa-plus plus-custom"></i>
                <span className="tooltiptext-left">Create new Project</span>
            </div>
        </Link>
    )
}

export default CreateProjectButton;
