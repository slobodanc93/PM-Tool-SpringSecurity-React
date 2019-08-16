package com.scvetkovic.pmtool.repositories;

import com.scvetkovic.pmtool.domain.Backlog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BacklogRepository extends JpaRepository<Backlog, Long> {
    Backlog findByProjectIdentifier(String projectIdentifier);
}
