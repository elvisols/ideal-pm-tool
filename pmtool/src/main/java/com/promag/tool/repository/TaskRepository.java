package com.promag.tool.repository;

import com.promag.tool.domain.Task;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends CrudRepository<Task, Long> {

    List<Task> findByProjectIdentifierOrderByPriority(String id);

    Task findByProjectSequence(String sequence);

}
