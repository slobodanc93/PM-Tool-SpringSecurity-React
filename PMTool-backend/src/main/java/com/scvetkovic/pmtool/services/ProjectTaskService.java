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

    public ProjectTask saveProjectTask(String projectIdentifier, ProjectTask projectTask) {

        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
        if(backlog == null){
            throw new ProjectNotFoundException("Project not found");
        }
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
        if(projectTask.getStatus() == "" || projectTask.getStatus() == null) {
            projectTask.setStatus("TO_DO");
        }
        //Check if priority is defined
        if(projectTask.getPriority() == null) {
            projectTask.setPriority(3); //Setting to LOW
        }

        //Finally, persist in DB
        return projectTaskRepository.save(projectTask);

    }

    public List<ProjectTask> findBacklogById(String projectIdentifier) {
        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
        if(backlog == null){
            throw new ProjectNotFoundException("Project with ID:'" + projectIdentifier + "' does not exists");
        }

        List<ProjectTask> projectTasks = projectTaskRepository.findByProjectIdentifierOrderByPriority(projectIdentifier);
        return projectTasks;
    }

    public ProjectTask findByProjectSequence(String project_identifier, String project_task_sequence) {
        //Make sure we are searching on an existing backlog
        Backlog backlog = backlogRepository.findByProjectIdentifier(project_identifier);
        if(backlog == null){
            throw new ProjectNotFoundException("Project with ID:'" + project_identifier + "' does not exists");
        }
        //Make sure that task exists
        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(project_task_sequence);
        if(projectTask == null){
            throw new ProjectNotFoundException("Project task " + project_task_sequence + " does not exists");
        }
        //Make sure that project task belongs to backlog
        if(!projectTask.getProjectIdentifier().equals(project_identifier)){
            throw new ProjectNotFoundException("Project task " + project_task_sequence + " does not belong to project '"
                + project_identifier + "'");
        }
        return projectTask;
    }

    public ProjectTask updateByProjectSequence(ProjectTask updatedTask, String project_identifier, String project_task_sequence){
        ProjectTask projectTask = findByProjectSequence(project_identifier, project_task_sequence);
        projectTask.setSummary(updatedTask.getSummary());
        projectTask.setPriority(updatedTask.getPriority());
        projectTask.setStatus(updatedTask.getStatus());
        projectTask.setAssignee(updatedTask.getAssignee());
        projectTask.setDueDate(updatedTask.getDueDate());

        return projectTaskRepository.save(projectTask);
    }

    public void deleteByProjectSequence(String project_identifier, String project_task_sequence) {
        ProjectTask projectTask = findByProjectSequence(project_identifier, project_task_sequence);
        projectTaskRepository.delete(projectTask);
    }
}
