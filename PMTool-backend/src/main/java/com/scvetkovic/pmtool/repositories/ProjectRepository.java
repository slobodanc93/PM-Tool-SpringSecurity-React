package com.scvetkovic.pmtool.repositories;

import com.scvetkovic.pmtool.domain.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    Project findByProjectIdentifier(String projectIdentifier);
    List<Project> findByProjectLeader(String projectLeader);
}
