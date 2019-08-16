import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProjectTask, updateProjectTask } from '../../actions/projectTaskActions';
import classnames from 'classnames';

class UpdateProjectTask extends Component {

    constructor(props) {
        super(props);
        const { id } = this.props.match.params;
        const { pt_id } = this.props.match.params;
        const today = new Date().toJSON().split('T')[0];
        this.state = {
            id: "",
            summary : "",
            assignee : "",
            status : "",
            priority: "",
            dueDate: "",
            projectIdentifier: id,
            projectSequence: pt_id,
            today: today,
            errors : {}
        }
    }

    componentDidMount() {
        this.props.getProjectTask(this.state.projectIdentifier, this.state.projectSequence, this.props.history);
    }

    
    UNSAFE_componentWillReceiveProps(nextProps) {

        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }

        const {
            id,
            summary,
            assignee,
            status,
            priority,
            dueDate
        } = nextProps.projectTask

        this.setState({
            id,
            summary,
            assignee,
            status,
            priority,
            dueDate
        })
    }

    onChange = (e) => {
        this.setState({ [e.target.name] : e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const updatedProjectTask = {
            id: this.state.id,
            summary : this.state.summary,
            assignee : this.state.assignee,
            status : this.state.status,
            priority: this.state.priority,
            dueDate: this.state.dueDate
        }
        this.props.updateProjectTask(this.state.projectIdentifier, this.state.projectSequence, updatedProjectTask, this.props.history);
    }

    render() {

        const { errors } = this.state;

        return (
            <div className="addProjectTask">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="text-center" >Update Project Task</h1>
                        <hr width="50%" />
                        <p style={{textAlign: 'center', marginBottom: '30px'}}>
                            Project Name: <b>{this.state.projectIdentifier}</b> {" "} | {" "}
                            Project Task ID:{" "}<b>{this.state.projectSequence}</b>
                        </p>
                        <form onSubmit={this.onSubmit} noValidate>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    className={classnames("form-control form-control-lg", {
                                        "is-invalid" : errors.summary
                                    })}
                                    id="summary"
                                    name="summary" 
                                    value={this.state.summary}
                                    onChange={this.onChange}
                                    required
                                />
                                <label className="form-control-placeholder" htmlFor="summary">Summary</label>
                                {
                                    errors.summary && (
                                        <div className="invalid-feedback">{errors.summary}</div>
                                    )
                                }
                            </div>
                            <div className="form-group">
                                <input 
                                    className="form-control form-control-lg" 
                                    id="assignee"
                                    name="assignee"
                                    value={this.state.assignee}
                                    onChange={this.onChange}
                                    required
                                />
                                <label className="form-control-placeholder" htmlFor="assignee">Assignee</label>
                            </div>
                            <div className="form-group">
                                <select 
                                    className="form-control form-control-lg" 
                                    id="status"
                                    name="status"
                                    value={this.state.status}
                                    onChange={this.onChange}
                                    required
                                    >
                                    <option value="TO_DO">TO DO</option>
                                    <option value="IN_PROGRESS">IN PROGRESS</option>
                                    <option value="DONE">DONE</option>
                                </select>
                                <label className="form-control-placeholder" htmlFor="status">Status</label>
                            </div>
                            <div className="form-group">
                                <select 
                                    className="form-control form-control-lg" 
                                    id="priority"
                                    name="priority"
                                    value={this.state.priority}
                                    onChange={this.onChange}
                                    required
                                >
                                    <option value="3">LOW</option>
                                    <option value="2">MEDIUM</option>
                                    <option value="1">HIGH</option>
                                </select>
                                <label className="form-control-placeholder" htmlFor="priority">Priority</label>
                            </div>
                            <div className="form-group">
                                <input type="date" 
                                    className="form-control form-control-lg" 
                                    id="dueDate"
                                    name="dueDate"
                                    value={this.state.dueDate || ""}
                                    onChange={this.onChange} 
                                    min={this.state.today}
                                />
                                <label className="form-control-placeholder" htmlFor="dueDate">DueDate</label>
                            </div>
                            <input 
                                type="submit" 
                                value="UPDATE PROJECT TASK" 
                                className="btn btn-primary btn-block mt-4" />
                        </form>

                        <Link to={`/projectBoard/${this.state.projectIdentifier}`}>
                            <button className="btn btn-secondary btn-block mt-4">CANCEL</button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    
        )
    }
}

UpdateProjectTask.propTypes = {
    projectTask: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getProjectTask: PropTypes.func.isRequired,
    updateProjectTask: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    projectTask : state.projectTasks.projectTask,
    errors: state.errors
});

export default connect(mapStateToProps, {getProjectTask, updateProjectTask}) (UpdateProjectTask);
