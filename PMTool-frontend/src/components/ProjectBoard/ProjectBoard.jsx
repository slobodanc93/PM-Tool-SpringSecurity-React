import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBacklog, clearErrors } from '../../actions/projectTaskActions';
import Backlog from './Backlog';

class ProjectBoard extends Component {

    constructor(props) {
        super(props);
        const { id } = this.props.match.params;
        this.state = {
            projectIdentifier: id,
            errors: {}
        }
    }

    componentDidMount() {
        this.props.getBacklog(this.state.projectIdentifier);
        this.props.clearErrors();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.errors){
            this.setState({errors: nextProps.errors})
        }
    }

    render() {

        const { projectTasks } = this.props.projectTasks;
        const { errors } = this.state

        let BoardContent;

        const BoardAlgorithm = (projectTasks, errors) => {
            if(projectTasks.length < 1) {
                if(errors.projectNotFound){
                    return (
                        <div className="alert alert-danger text-center" role="alert">{errors.projectNotFound}</div>
                    );
                } else {
                    return (
                        <div className="alert alert-info text-center" role="alert">No tasks on this board</div>
                    );
                }
            } else {
                return <Backlog projectTasks={projectTasks} />
            }
        }

        BoardContent = BoardAlgorithm(projectTasks, errors);

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div>
                            <Link to={`/addProjectTask/${this.state.projectIdentifier}`}>
                                <div className="action-button">
                                    <i className="fas fa-plus plus-custom"></i>
                                    <span className="tooltiptext-left">Add new task</span>
                                </div>
                            </Link>
                            <h2 className="text-center"><b>{this.state.projectIdentifier}</b> Backlog</h2>
                            <hr width="50%" style={{marginBottom: '40px'}} />
                        </div>
                        {BoardContent}
                    </div>
                </div>
            </div>
        )
    }
}

ProjectBoard.propTypes = {
    getBacklog : PropTypes.func.isRequired,
    projectTasks : PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    projectTasks : state.projectTasks,
    errors: state.errors
})

export default connect(mapStateToProps, {getBacklog, clearErrors}) (ProjectBoard);
