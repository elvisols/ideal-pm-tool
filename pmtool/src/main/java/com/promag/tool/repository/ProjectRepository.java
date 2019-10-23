package com.promag.tool.repository;

import com.promag.tool.domain.Project;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {

    Project findByIdentifier(String projectId);

    @Override
    Iterable<Project> findAll();

    Iterable<Project> findAllByLeader(String username);

}
