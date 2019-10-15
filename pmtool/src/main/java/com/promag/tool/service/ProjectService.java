package com.promag.tool.service;

import com.promag.tool.domain.Project;
import com.promag.tool.exceptions.ProjectIdException;
import com.promag.tool.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Iterator;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public Project saveProject(Project project) {
        try{
            project.setIdentifier(project.getIdentifier().toUpperCase());
            return projectRepository.save(project);
        } catch (Exception e) {
            throw new ProjectIdException("Project ID '" + project.getIdentifier().toUpperCase() + "' already exists!");
        }
    }

    public Project getProject(String id) {
        Project project = projectRepository.findByIdentifier(id);

        if(project == null) {
            throw new ProjectIdException("Project id '"+id+"' does not exist");
        }
        return project;
    }

    public Iterator<Project> getProjects() {
        return projectRepository.findAll().iterator();
    }

    public void deleteProject(String id) {
        Project project = projectRepository.findByIdentifier(id);

        if(project == null) {
            throw new ProjectIdException("Project id '"+id+"' does not exist");
        }

        projectRepository.delete(project);
    }

}
