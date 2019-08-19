package com.scvetkovic.pmtool.services;

import com.scvetkovic.pmtool.domain.Backlog;
import com.scvetkovic.pmtool.domain.Project;
import com.scvetkovic.pmtool.domain.ProjectTask;
import com.scvetkovic.pmtool.exceptions.ProjectNotFoundException;
import com.scvetkovic.pmtool.repositories.BacklogRepository;
import com.scvetkovic.pmtool.repositories.ProjectRepository;
import com.scvetkovic.pmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectTaskService {

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectService projectService;

    public ProjectTask saveProjectTask(String projectIdentifier, ProjectTask projectTask, String username) {

        //Find the backlog
        Backlog backlog = projectService.findByProjectIdentifier(projectIdentifier, username).getBacklog();

        //Bind that backlog to project task
        projectTask.setBacklog(backlog);

        //Set project identifier
        projectTask.setProjectIdentifier(projectIdentifier);

        //Get sequence for specific backlog and update it
        Integer backlogSequence = backlog.getPTSequence();
        backlogSequence++;
        backlog.setPTSequence(backlogSequence);

        //Construct project task sequence
        projectTask.setProjectSequence(projectIdentifier + "-" + backlogSequence);

        //Check if status is defined
        if(projectTask.getStatus() == null  || projectTask.getStatus() == "") {
            projectTask.setStatus("TO_DO");
        }
        //Check if priority is defined
        if(projectTask.getPriority() == null) {
            projectTask.setPriority(3); //Setting to LOW
        }

        //Finally, persist in DB
        return projectTaskRepository.save(projectTask);

    }

    public List<ProjectTask> findBacklogById(String projectIdentifier, String username) {
        projectService.findByProjectIdentifier(projectIdentifier, username);

        List<ProjectTask> projectTasks = projectTaskRepository.findByProjectIdentifierOrderByPriority(projectIdentifier);
        return projectTasks;
    }

    public ProjectTask findByProjectSequence(String projectIdentifier, String projectTaskSequence, String username) {
        //Checking if project exists and if project belongs to logged user
        projectService.findByProjectIdentifier(projectIdentifier, username);
        //Make sure that task exists
        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(projectTaskSequence);
        if(projectTask == null){
            throw new ProjectNotFoundException("Project task " + projectTaskSequence + " does not exists");
        }
        //Make sure that project task belongs to backlog
        if(!projectTask.getProjectIdentifier().equals(projectIdentifier)){
            throw new ProjectNotFoundException("Project task " + projectTaskSequence + " does not belong to project '"
                + projectIdentifier + "'");
        }
        return projectTask;
    }

    public ProjectTask updateByProjectSequence(ProjectTask updatedTask, String projectIdentifier, String projectTaskSequence, String username){
        ProjectTask projectTask = findByProjectSequence(projectIdentifier, projectTaskSequence, username);
        projectTask.setSummary(updatedTask.getSummary());
        projectTask.setPriority(updatedTask.getPriority());
        projectTask.setStatus(updatedTask.getStatus());
        projectTask.setAssignee(updatedTask.getAssignee());
        projectTask.setDueDate(updatedTask.getDueDate());

        return projectTaskRepository.save(projectTask);
    }

    public void deleteByProjectSequence(String projectIdentifier, String projectTaskSequence, String username) {
        ProjectTask projectTask = findByProjectSequence(projectIdentifier, projectTaskSequence, username);
        projectTaskRepository.delete(projectTask);
    }
}
