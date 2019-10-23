package com.promag.tool.web;

import com.promag.tool.domain.Project;
import com.promag.tool.service.MapValidationErrorService;
import com.promag.tool.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin
@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    ProjectService projectService;

    @Autowired
    MapValidationErrorService mapValidationErrorService;

    @GetMapping
    public Iterable<Project> getProjects() {

        return projectService.findAllProjects(null);
    }

    @GetMapping("/{id}")
    public Project getProject(@PathVariable String id) {
        return projectService.findProjectByIdentifier(id, "");
    }

    @PostMapping
    public ResponseEntity<?> createProject(@Valid @RequestBody Project project, BindingResult bindingResult) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(bindingResult);

        if(errorMap != null) return errorMap;

        project = projectService.saveOrUpdateProject(project, null);
        return new ResponseEntity<>(project, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<?> updateProject(@Valid @RequestBody Project project, BindingResult bindingResult) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(bindingResult);

        if(errorMap != null) return errorMap;

        project = projectService.saveOrUpdateProject(project, null);;
        return new ResponseEntity<>(project, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable String id) {
        projectService.deleteProjectByIdentifier(id, null);

        return new ResponseEntity<String>("Project '"+id+"' deleted", HttpStatus.OK);
    }


}
