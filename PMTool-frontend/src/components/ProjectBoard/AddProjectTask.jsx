import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addProjectTask } from '../../actions/projectTaskActions';
import classnames from 'classnames';

class AddProjectTask extends Component {

    constructor(props) {
        super(props);
        const { id } = this.props.match.params;
        const today = new Date().toJSON().split('T')[0];
        this.state = {
            summary : "",
            assignee : "",
            status : "",
            priority: "",
            dueDate: "",
            projectIdentifier: id,
            today: today,
            errors : {}
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({ errors : nextProps.errors });
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name] : e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const newProjectTask = {
            summary : this.state.summary,
            assignee : this.state.assignee,
            status : this.state.status,
            priority: this.state.priority,
            dueDate: this.state.dueDate
        }
        this.props.addProjectTask(this.state.projectIdentifier, newProjectTask, this.props.history);
    }

    render() {
        
        const { errors } = this.state;

        return (
            <div className="addProjectTask">
            <div className="container">
                <div className="row">
                        <div className="col-md-8 m-auto">
                        <h1 className="text-center" >Add Project Task</h1>
                        <hr width="50%" style={{marginBottom: '40px'}} />
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
                                    <option value="" disabled defaultValue></option>
                                    <option value="TO_DO">TO DO</option>
                                    <option value="IN_PROGRESS">IN PROGRESS</option>
                                    <option value="DONE">DONE</option>
                                </select>
                                <label className="form-control-placeholder" htmlFor="status">Select Status</label>
                            </div>
                            <div className="form-group">
                                <select 
                                    className="form-control form-control-lg" 
                                    name="priority"
                                    id="priority"
                                    value={this.state.priority}
                                    onChange={this.onChange}
                                    required
                                >
                                    <option value="" disabled defaultValue></option>
                                    <option value="3">LOW</option>
                                    <option value="2">MEDIUM</option>
                                    <option value="1">HIGH</option>
                                </select>
                                <label className="form-control-placeholder" htmlFor="status">Select Priority</label>
                            </div>
                            <div className="form-group">
                                <input type="date" 
                                    className="form-control form-control-lg" 
                                    id="dueDate"
                                    name="dueDate"
                                    value={this.state.dueDate}
                                    onChange={this.onChange} 
                                    min={this.state.today}
                                />
                                <label className="form-control-placeholder" htmlFor="status">Due date</label>
                            </div>
                            <input 
                                type="submit" 
                                value="CREATE PROJECT TASK" 
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

AddProjectTask.propTypes = {
    addProjectTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(mapStateToProps, {addProjectTask}) (AddProjectTask);
