import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createNewUser } from '../../actions/userActions';
import classnames from 'classnames';

class Register extends Component {

    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            username: "",
            password: "",
            confirmPassword: "",
            errors: {}
        }
    }

    componentDidMount() {
        if(this.props.security.validToken) {
            this.props.history.push("/dashboard");
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.security.validToken) {
            this.props.history.push("/dashboard");
          }
        if(nextProps.errors){
           this.setState({errors: nextProps.errors})
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name] : e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }
        this.props.createNewUser(newUser, this.props.history);
    }


    render() {
        const { errors } = this.state;
        return (
            <div className="register">
                <div className="container mb-2">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center mb-3">Create your Account</p>
                            <form onSubmit={this.onSubmit} noValidate>
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.firstName
                                        } )}
                                        id="firstName" 
                                        name="firstName"
                                        value={this.state.firstName}
                                        onChange={this.onChange} 
                                        required 
                                    />
                                    <label className="form-control-placeholder" htmlFor="firstName">First name</label>
                                    <div className="invalid-feedback">{errors.firstName}</div>
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.lastName
                                        } )}
                                        id="lastName" 
                                        name="lastName"
                                        value={this.state.lastName}
                                        onChange={this.onChange} 
                                        required 
                                    />
                                    <label className="form-control-placeholder" htmlFor="lastName">Last name</label>
                                    <div className="invalid-feedback">{errors.lastName}</div>
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.username
                                        } )}
                                        id="username" 
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.onChange} 
                                        required
                                    />
                                    <label className="form-control-placeholder" htmlFor="username">Username (Email)</label>
                                    <div className="invalid-feedback">{errors.username}</div>
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="password" 
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.password
                                        } )}
                                        id="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange} 
                                        required
                                     />
                                     <label className="form-control-placeholder" htmlFor="password">Password</label>
                                     <div className="invalid-feedback">{errors.password}</div>
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="password" 
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.confirmPassword
                                        } )}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={this.state.confirmPassword}
                                        onChange={this.onChange} 
                                        required
                                    />
                                    <label className="form-control-placeholder" htmlFor="confirmPassword">Confirm password</label>
                                    <div className="invalid-feedback">{errors.confirmPassword}</div>
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    createNewUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors,
    security: state.security
});

export default connect(mapStateToProps, {createNewUser}) (Register);
