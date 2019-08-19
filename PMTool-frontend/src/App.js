import React, {Component} from 'react';
import './App.css';
import Dashboard from './components/Project/Dashboard';
import Header from './components/Layout/Header';
import AddProject from './components/Project/AddProject';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/Layout/Footer';
import { Provider } from 'react-redux';
import store from './store';
import UpdateProject from './components/Project/UpdateProject';
import ProjectBoard from './components/ProjectBoard/ProjectBoard';
import AddProjectTask from './components/ProjectBoard/AddProjectTask';
import UpdateProjectTask from './components/ProjectBoard/UpdateProjectTask';
import Landing from './components/Layout/Landing';
import Register from './components/UserManagement/Register';
import Login from './components/UserManagement/Login';
import jwt_decode from 'jwt-decode';
import setJwt from './securityUtils/setJwt';
import { SET_CURRENT_USER } from './actions/types';
import { logout } from './actions/userActions';
import SecureRoute from './securityUtils/SecureRoute';

const jwtToken = localStorage.jwtToken;
if (jwtToken) {
  setJwt(jwtToken);
  const decodedToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decodedToken
  });

  const currentTime = Date.now() / 1000;
  if (decodedToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }  
  
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="page-wrap">
            <Header />

            <Route exact path="/" component={Landing} />

            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            <Switch>
              <SecureRoute exact path="/dashboard" component={Dashboard} />
              <SecureRoute exact path="/addProject" component={AddProject} />
              <SecureRoute exact path="/updateProject/:id" component={UpdateProject} />
              <SecureRoute exact path="/projectBoard/:id" component={ProjectBoard} />
              <SecureRoute exact path="/addProjectTask/:id" component={AddProjectTask} />
              <SecureRoute exact path="/updateProjectTask/:id/:pt_id" component={UpdateProjectTask} />
            </Switch>

            <Footer />
          </div>
        </Router>
      </Provider> 
    );
  }
}

export default App;
