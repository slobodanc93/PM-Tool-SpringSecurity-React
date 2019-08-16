import React, { Component } from 'react'
import ProjectItem from './ProjectItem';
import CreateProjectButton from './CreateProjectButton';
import { connect } from 'react-redux';
import { getProjects, clearErrors } from '../../actions/projectActions';
import PropTypes from 'prop-types';

class Dashboard extends Component {

    componentDidMount() {
        this.props.getProjects();
        this.props.clearErrors();
    }

    render() {

        const displayProjects = projects => {
            if(projects.length < 1 ){
                return(
                    <div className="alert alert-info text-center" role="alert">No projects added yet</div>
                );
            } else {
                return(
                    projects.map(project => (
                        <ProjectItem key={project.id} project={project} />
                    ))
                );
            }
        }

        return (
            <div className="projects container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center">Projects</h1>
                        <CreateProjectButton />
                        <br /> <hr />
                        {displayProjects(this.props.projects)}
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    projects: PropTypes.array.isRequired,
    getProjects: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    projects: state.projects.projects
});

export default connect(mapStateToProps, {getProjects, clearErrors}) (Dashboard);