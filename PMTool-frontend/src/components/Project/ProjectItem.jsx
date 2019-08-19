import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteProject } from '../../actions/projectActions';

class ProjectItem extends Component {

    onDelete = id => {
        this.props.deleteProject(id);
    };

    render() {

        const { project } = this.props;

        return (
            <div className="container">
                <div className="card card-body bg-light mb-3">
                    <div className="row">
                        <div className="col-3 col-md-2">
                            <h3><span className="badge badge-info mx-auto">{project.projectIdentifier}</span></h3>
                        </div>
                        <div className="col-lg-6 col-md-4 col-8">
                            <h3>{project.projectName}</h3>
                            <p>{project.description}</p>
                        </div>
                        <div className="col-md-4 d-lg-block">
                            <ul className="list-group">

                                <Link to={`/projectBoard/${project.projectIdentifier}`}>
                                    <li className="list-group-item board">
                                        <i className="fas fa-list"></i> 
                                        <span className="icon-list-label">Project Board</span>
                                    </li>
                                </Link>

                                <Link to={`/updateProject/${project.projectIdentifier}`}>
                                    <li className="list-group-item update">
                                        <i className="fas fa-edit"></i>
                                        <span className="icon-list-label">Update Project Info</span>
                                    </li>
                                </Link>
                                
                                <Link to="/dashboard">
                                    <li className="list-group-item delete" onClick={this.onDelete.bind(this, project.projectIdentifier)}>
                                        <i className="fas fa-minus-circle"></i>
                                        <span className="icon-list-label">Delete Project</span>
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ProjectItem.propTypes = {
    deleteProject: PropTypes.func.isRequired
}

export default connect(null, {deleteProject}) (ProjectItem);