import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/placeholder-logo.png';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/userActions';

class Header extends Component {

    logout() {
        this.props.logout();
        window.location.href="/";
    }

    render() {

        const {validToken, user} = this.props.security;

        const userIsNotAuthenticated = (
            <div className="collapse navbar-collapse" id="mobile-nav">

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link " to="/register">
                            Sign Up
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">
                            Login
                        </Link>
                    </li>
                </ul>
            </div>
        );

        const userIsAuthenticated = (
            <div className="collapse navbar-collapse" id="mobile-nav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/dashboard">
                            Dashboard
                        </Link>
                    </li>
                </ul>

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link " to="/dashboard">
                            <i className="fas fa-user-circle mr-1" />
                            {user.firstName + " " + user.lastName}
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/logout" onClick={this.logout.bind(this)}>
                            Logut
                        </Link>
                    </li>
                </ul>
            </div>
        );

        let headerLinks = validToken && user ? userIsAuthenticated : userIsNotAuthenticated;


        return (
            <nav className="navbar navbar-expand-sm navbar-dark mb-4">
                <div className="container">
                    <Link  to="/">
                        <img src={logo} alt="company logo" className="navbar-brand" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon" />
                    </button>
                    {headerLinks}
                </div>
            </nav>
        )
    }
}

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    security: state.security
})

export default connect(mapStateToProps, { logout }) (Header);
