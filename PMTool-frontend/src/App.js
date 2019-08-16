import React from 'react';
import './App.css';
import Dashboard from './components/Project/Dashboard';
import Header from './components/Layout/Header';
import AddProject from './components/Project/AddProject';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from './components/Layout/Footer';
import { Provider } from 'react-redux';
import store from './store';
import UpdateProject from './components/Project/UpdateProject';
import ProjectBoard from './components/ProjectBoard/ProjectBoard';
import AddProjectTask from './components/ProjectBoard/AddProjectTask';
import UpdateProjectTask from './components/ProjectBoard/UpdateProjectTask';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="page-wrap">
          <Header />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/addProject" component={AddProject} />
          <Route exact path="/updateProject/:id" component={UpdateProject} />
          <Route exact path="/projectBoard/:id" component={ProjectBoard} />
          <Route exact path="/addProjectTask/:id" component={AddProjectTask} />
          <Route exact path="/updateProjectTask/:id/:pt_id" component={UpdateProjectTask} />
          <Footer />
        </div>
      </Router>
    </Provider> 
  );
}

export default App;
