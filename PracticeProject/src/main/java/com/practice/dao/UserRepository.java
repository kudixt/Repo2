package com.practice.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.practice.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	public List<User> findByFirstName(String firstName);
	
	@Query("select u FROM User u")
	public List<User> getAllUser();

	public List<User> findByLastName(String lastName);
	
	public User findByUsername(String username);
	
	public Page<User> findAll(Pageable pageable);
	
}
