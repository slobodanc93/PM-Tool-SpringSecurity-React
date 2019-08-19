package com.scvetkovic.pmtool.web;

import com.scvetkovic.pmtool.domain.ProjectTask;
import com.scvetkovic.pmtool.services.MapValidationErrorService;
import com.scvetkovic.pmtool.services.ProjectTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin(origins = "http://localhost:3000")
public class BacklogController {

    @Autowired
    private ProjectTaskService projectTaskService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("/{project_identifier}")
    public ResponseEntity<?> addToBacklog(
            @Valid @RequestBody ProjectTask projectTask,
            BindingResult result,
            @PathVariable String project_identifier,
            Principal principal
            ) {
        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidation(result);
        if(errorMap != null) {
            return errorMap;
        }
        ProjectTask newProjectTask = projectTaskService.saveProjectTask(project_identifier, projectTask, principal.getName());
        return new ResponseEntity<ProjectTask>(newProjectTask, HttpStatus.CREATED);
    }

    @GetMapping("/{project_identifier}")
    public ResponseEntity<List<ProjectTask>> getBacklog(
            @PathVariable String project_identifier,
            Principal principal) {
        return new ResponseEntity<>(projectTaskService.findBacklogById(project_identifier, principal.getName()), HttpStatus.OK);
    }


    @GetMapping("/{project_identifier}/{project_task_sequence}")
    public ResponseEntity<ProjectTask> getProjectTask(
            @PathVariable String project_identifier,
            @PathVariable String project_task_sequence,
            Principal principal) {
        ProjectTask projectTask = projectTaskService.findByProjectSequence(project_identifier, project_task_sequence, principal.getName());
        return new ResponseEntity<>(projectTask, HttpStatus.OK);
    }


    @PatchMapping("/{project_identifier}/{project_task_sequence}")
    public ResponseEntity<?> updateProjectTask(
            @Valid @RequestBody ProjectTask updatedProjectTask,
            BindingResult result,
            @PathVariable String project_identifier,
            @PathVariable String project_task_sequence,
            Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidation(result);
        if(errorMap != null) {
            return errorMap;
        }
        ProjectTask projectTask = projectTaskService.updateByProjectSequence(updatedProjectTask, project_identifier, project_task_sequence, principal.getName());
        return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
    }

    @DeleteMapping("/{project_identifier}/{project_task_sequence}")
    public ResponseEntity<?> deleteProjectTask(
            @PathVariable String project_identifier,
            @PathVariable String project_task_sequence,
            Principal principal) {
        projectTaskService.deleteByProjectSequence(project_identifier, project_task_sequence, principal.getName());
        return new ResponseEntity<String>("Project task was deleted successfully", HttpStatus.OK);


    }


}
