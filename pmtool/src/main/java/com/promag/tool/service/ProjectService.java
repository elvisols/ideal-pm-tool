package com.promag.tool.service;

import com.promag.tool.domain.Backlog;
import com.promag.tool.domain.Project;
import com.promag.tool.domain.User;
import com.promag.tool.exceptions.ProjectIdException;
import com.promag.tool.exceptions.ProjectNotFoundException;
import com.promag.tool.repository.BacklogRepository;
import com.promag.tool.repository.ProjectRepository;
import com.promag.tool.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Iterator;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private BacklogRepository backlogRepository;

//    @Autowired
    private UserRepository userRepository;

    public Project saveOrUpdateProject(Project project, String username){

        if(project.getId() != null){
            Project existingProject = projectRepository.findByIdentifier(project.getIdentifier());
//            if(existingProject !=null &&(!existingProject.getLeader().equals(username))){
//                throw new ProjectNotFoundException("Project not found in your account");
//            }else
                if(existingProject == null){
                throw new ProjectNotFoundException("Project with ID: '"+project.getIdentifier()+"' cannot be updated because it doesn't exist");
            }
        }

        try{

//            User user = userRepository.findByUsername(username);
//            project.setUser(user);
//            project.setLeader(user.getUsername());
            project.setIdentifier(project.getIdentifier().toUpperCase());

            if(project.getId()==null){
                Backlog backlog = new Backlog();
                project.setBacklog(backlog);
                backlog.setProject(project);
                backlog.setProjectIdentifier(project.getIdentifier().toUpperCase());
            }

            if(project.getId()!=null){
                project.setBacklog(backlogRepository.findByProjectIdentifier(project.getIdentifier().toUpperCase()));
            }

            return projectRepository.save(project);

        }catch (Exception e){
            throw new ProjectIdException("Project ID '"+project.getIdentifier().toUpperCase()+"' already exists");
        }

    }


    public Project findProjectByIdentifier(String projectId, String username){

        //Only want to return the project if the user looking for it is the owner

        Project project = projectRepository.findByIdentifier(projectId.toUpperCase());

        if(project == null){
            throw new ProjectIdException("Project ID '"+projectId+"' does not exist");

        }

//        if(!project.getLeader().equals(username)){
//            throw new ProjectNotFoundException("Project not found in your account");
//        }

        return project;
    }

    public Iterable<Project> findAllProjects(String username){
//        return projectRepository.findAllByLeader(username);
        return projectRepository.findAll();
    }


    public void deleteProjectByIdentifier(String projectid, String username){
        projectRepository.delete(findProjectByIdentifier(projectid, username));
    }

}
