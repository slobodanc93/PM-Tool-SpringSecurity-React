import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/userActions';
import classnames from 'classnames';

class Login extends Component {
    
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            errors: {}
        }
    }

    componentDidMount() {
        if (this.props.security.validToken) {
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
        const loginRequest = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.login(loginRequest);
    }

    render() {
        const { errors } = this.state;



        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center mb-5">Log In</h1>
                            <form onSubmit={this.onSubmit} noValidate>
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
                                        autoComplete="off"
                                        required
                                    />
                                    <label className="form-control-placeholder" htmlFor="username">Username</label>
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
                                        autoComplete="off"
                                        required
                                    />
                                    <label className="form-control-placeholder" htmlFor="password">Password</label>
                                    <div className="invalid-feedback">{errors.password}</div>
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="hidden" 
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.invalidUsernameOrPassword
                                        } )}
                                    />
                                    <div 
                                        className="invalid-feedback"
                                        style={{textAlign: "center"}}
                                        >{errors.invalidUsernameOrPassword}</div>
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

Login.propTypes = {
    login: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors,
    security: state.security
});

export default connect(mapStateToProps, {login}) (Login);
