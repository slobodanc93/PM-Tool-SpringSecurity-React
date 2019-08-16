package com.scvetkovic.pmtool.services;

import com.scvetkovic.pmtool.domain.Backlog;
import com.scvetkovic.pmtool.domain.Project;
import com.scvetkovic.pmtool.exceptions.ProjectIdException;
import com.scvetkovic.pmtool.repositories.BacklogRepository;
import com.scvetkovic.pmtool.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private BacklogRepository backlogRepository;

    public Project saveOrUpdateProject(Project project) {
        String projectIdentifier = project.getProjectIdentifier().toUpperCase();
        try {
            project.setProjectIdentifier(projectIdentifier);
            if(project.getId()==null) {
                Backlog backlog = new Backlog();
                project.setBacklog(backlog);
                backlog.setProject(project);
                backlog.setProjectIdentifier(projectIdentifier);
            } else {
                project.setBacklog(backlogRepository.findByProjectIdentifier(projectIdentifier));
            }
            return projectRepository.save(project);
        } catch (Exception e) {
            throw new ProjectIdException("Project ID '" + project.getProjectIdentifier().toUpperCase() + "' already exists.");
        }
    }

    public Project findByProjectIdentifier(String projectIdentifier) {
        return projectRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());
    }

    public List<Project> findAll() {
        return projectRepository.findAll();
    }

    public Project delete(String projectIdentifier) {
        Project project = projectRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());
        if(project != null) {
            projectRepository.delete(project);
            return project;
        } else {
            return null;
        }
    }

}
