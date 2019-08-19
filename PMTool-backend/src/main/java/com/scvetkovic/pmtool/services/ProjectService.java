package com.scvetkovic.pmtool.services;

import com.scvetkovic.pmtool.domain.Backlog;
import com.scvetkovic.pmtool.domain.Project;
import com.scvetkovic.pmtool.domain.User;
import com.scvetkovic.pmtool.exceptions.ProjectIdException;
import com.scvetkovic.pmtool.exceptions.ProjectNotFoundException;
import com.scvetkovic.pmtool.repositories.BacklogRepository;
import com.scvetkovic.pmtool.repositories.ProjectRepository;
import com.scvetkovic.pmtool.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private UserRepository userRepository;

    public Project saveOrUpdateProject(Project project, String username) {

        if(project.getId() != null){
            Project existingProject = projectRepository.findByProjectIdentifier(project.getProjectIdentifier());
            if(existingProject !=null &&(!existingProject.getProjectLeader().equals(username))){
                throw new ProjectNotFoundException("Project not found in your account");
            }else if(existingProject == null){
                throw new ProjectNotFoundException("Project with ID: "
                        +project.getProjectIdentifier()
                        +" cannot be updated because it doesn't exist");
            }
        }

        try{

            User user = userRepository.findByUsername(username);
            project.setUser(user);
            project.setProjectLeader(user.getUsername());
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());

            if(project.getId()==null){
                Backlog backlog = new Backlog();
                project.setBacklog(backlog);
                backlog.setProject(project);
                backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            }

            if(project.getId()!=null){
                project.setBacklog(backlogRepository.findByProjectIdentifier(project.getProjectIdentifier().toUpperCase()));
            }

            return projectRepository.save(project);

        }catch (Exception e){
            throw new ProjectIdException("Project ID '"+project.getProjectIdentifier().toUpperCase()+"' already exists");
        }
    }

    public Project findByProjectIdentifier(String projectIdentifier, String username) {
        Project project =  projectRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());
        if(project == null) {
            throw new ProjectNotFoundException("Project does not exists.");
        }
        if(!project.getProjectLeader().equals(username)){
            throw new ProjectNotFoundException("Project not found in user account");
        }
        return project;
    }

    public List<Project> findAll(String username) {
        return projectRepository.findByProjectLeader(username);
    }

    public Project delete(String projectIdentifier, String username) {
        Project project = findByProjectIdentifier(projectIdentifier.toUpperCase(), username);
        if(project != null) {
            projectRepository.delete(project);
            return project;
        } else {
            return null;
        }
    }

}
