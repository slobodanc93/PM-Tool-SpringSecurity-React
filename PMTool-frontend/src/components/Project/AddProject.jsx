import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProject } from '../../actions/projectActions';
import classnames from 'classnames';

class AddProject extends Component {
    
    constructor() {
        super();
        this.state = {
            projectName: "",
            projectIdentifier: "",
            description: "",
            startDate: "",
            endDate: "",
            errors: {}
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.errors){
           this.setState({errors: nextProps.errors})
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name] : e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const newProject = {
            projectName: this.state.projectName,
            projectIdentifier: this.state.projectIdentifier,
            description: this.state.description,
            startDate: this.state.startDate,
            endDate: this.state.endDate
        }
        this.props.createProject(newProject, this.props.history);
    }


    render() {
        const { errors } = this.state;
        return (
            <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">New Project</h5>
                            <hr style={{marginBottom:'35px'}}/>
                            <form onSubmit={this.onSubmit} noValidate>
                                <div className="form-group">
                                    <input 
                                        type="text"
                                        id="projectName"
                                        name="projectName"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.projectName
                                        })} 
                                        value={this.state.projectName}
                                        onChange={this.onChange} 
                                        required
                                        />
                                    <label className="form-control-placeholder" htmlFor="projectName">Project Name</label>
                                    <div className="invalid-feedback">{errors.projectName}</div>
                                </div>

                                <div className="form-group">
                                    <input type="text" 
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.projectIdentifier
                                        })} 
                                        id="projectIdentifier"
                                        name="projectIdentifier"
                                        value={this.state.projectIdentifier}
                                        onChange={this.onChange} 
                                        maxLength="5"
                                        required />
                                    <label className="form-control-placeholder" htmlFor="projectIdentifier">Project ID</label>
                                    <div className="invalid-feedback">{errors.projectIdentifier}</div>
                                </div>

                                <div className="form-group">
                                    <textarea 
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.description
                                        })} 
                                        id="description"
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.onChange} 
                                        required >
                                    </textarea>
                                    <label className="form-control-placeholder" htmlFor="description">Description</label>
                                    <div className="invalid-feedback">{errors.description}</div>
                                </div>


                                <div className="row">

                                    <div className="form-group col-lg-5">
                                        <input 
                                            type="date" 
                                            className="form-control form-control-lg" 
                                            id="startDate"
                                            name="startDate"
                                            value={this.state.startDate}
                                            onChange={this.onChange}  
                                        />
                                        <label className="form-control-placeholder-disabled" htmlFor="startDate">Start date</label>

                                    </div>

                                    <i className="fas fa-long-arrow-alt-right col-lg-2 d-none d-lg-block"></i>

                                    <div className="form-group col-lg-5">
                                        <input type="date" 
                                            className="form-control form-control-lg" 
                                            id="endDate"
                                            name="endDate"
                                            value={this.state.endDate}
                                            onChange={this.onChange}
                                        />
                                        <label className="form-control-placeholder-disabled" htmlFor="endDate">End date</label>
                                    </div>

                                </div>        

                                <input 
                                    type="submit" 
                                    className="btn btn-primary btn-block mt-4"
                                    value="CREATE PROJECT"/>
                            </form>

                            <Link to="/dashboard">
                                <button className="btn btn-secondary btn-block mt-4">CANCEL</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddProject.propTypes = {
    createProject: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps, {createProject}) (AddProject);
