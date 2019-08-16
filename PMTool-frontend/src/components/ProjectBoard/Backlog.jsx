import React, { Component } from 'react';
import ProjectTaskItem from './ProjectTaskItem';

class Backlog extends Component {
    render() {
        const { projectTasks } = this.props;

        const tasks = projectTasks.map(projectTask => (
            <ProjectTaskItem key={projectTask.id} projectTask={projectTask} />
        ));

        let todoItems = [];
        let inProgressItems = [];
        let doneItems = [];

        for(let i=0; i<tasks.length; i++) {
            if(tasks[i].props.projectTask.status === "TO_DO") {
                todoItems.push(tasks[i]);
            }

            if(tasks[i].props.projectTask.status === "IN_PROGRESS") {
                inProgressItems.push(tasks[i]);
            }

            if(tasks[i].props.projectTask.status === "DONE") {
                doneItems.push(tasks[i]);
            }
        }

        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">

                        <div className="col-md-4">
                            <div className="card text-center mb-3">
                                <div className="card-header card-header-main border-danger bg-dark text-white">
                                    <h3>TO DO</h3>
                                </div>
                            </div>
                            {todoItems}
                        </div>

                        <div className="col-md-4">
                            <div className="card text-center mb-3">
                                <div className="card-header card-header-main border-warning bg-dark text-white">
                                    <h3>In Progress</h3>
                                </div>
                            </div>
                            {inProgressItems}
                        </div>

                        <div className="col-md-4">
                            <div className="card text-center mb-3">
                                <div className="card-header card-header-main border-success bg-dark text-white">
                                    <h3>Done</h3>
                                </div>
                            </div>
                            {doneItems}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Backlog;
