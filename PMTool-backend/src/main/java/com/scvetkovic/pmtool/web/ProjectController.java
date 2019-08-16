package com.scvetkovic.pmtool.web;

import com.scvetkovic.pmtool.domain.Project;
import com.scvetkovic.pmtool.services.MapValidationErrorService;
import com.scvetkovic.pmtool.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:3000")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createNewProject(
            @Valid @RequestBody Project project,
            BindingResult result) {

        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidation(result);
        if(errorMap != null)
            return errorMap;

        Project newProject = projectService.saveOrUpdateProject(project);
        return new ResponseEntity<Project>(newProject, HttpStatus.CREATED);
    }


    @GetMapping("/{projectIdentifier}")
    public ResponseEntity<?> getProjectByIdentifier(
            @PathVariable String projectIdentifier) {

        Project project = projectService.findByProjectIdentifier(projectIdentifier);
        if(project == null) {
            return new ResponseEntity<String>("Project ID does not exist.", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Project>(project, HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = projectService.findAll();
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<?> delete(
        @PathVariable String projectId) {

        Project project = projectService.delete(projectId);
        if(project == null) {
            return new ResponseEntity<String>("Project ID does not exist.", HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<String>("Project is deleted successfully.", HttpStatus.OK);
        }

    }


}
