package com.scvetkovic.pmtool.repositories;

import com.scvetkovic.pmtool.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);
    User getById(Long id);

}
