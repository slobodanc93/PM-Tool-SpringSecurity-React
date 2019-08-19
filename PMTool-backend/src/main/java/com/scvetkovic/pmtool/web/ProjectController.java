package com.scvetkovic.pmtool.web;

import com.scvetkovic.pmtool.domain.Project;
import com.scvetkovic.pmtool.services.MapValidationErrorService;
import com.scvetkovic.pmtool.services.ProjectService;
import com.scvetkovic.pmtool.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
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
            BindingResult result,
            Principal principal) {

        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidation(result);
        if(errorMap != null)
            return errorMap;

        Project newProject = projectService.saveOrUpdateProject(project, principal.getName());
        return new ResponseEntity<Project>(newProject, HttpStatus.CREATED);
    }


    @GetMapping("/{projectIdentifier}")
    public ResponseEntity<?> getProjectByIdentifier(
            @PathVariable String projectIdentifier,
            Principal principal) {

        Project project = projectService.findByProjectIdentifier(projectIdentifier, principal.getName());
        if(project == null) {
            return new ResponseEntity<String>("Project ID does not exist.", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Project>(project, HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<List<Project>> getAllProjects(Principal principal) {
        List<Project> projects = projectService.findAll(principal.getName());
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<?> delete(
        @PathVariable String projectId,
        Principal principal) {

        Project project = projectService.delete(projectId, principal.getName());
        if(project == null) {
            return new ResponseEntity<String>("Project ID does not exist.", HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<String>("Project is deleted successfully.", HttpStatus.OK);
        }

    }


}
