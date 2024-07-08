package com.practice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.practice.dao.UserRepository;
import com.practice.entity.User;
import com.practice.security.CipherSecurity;

@Service
public class UserService {
	
	@Autowired
	UserRepository userRepository;

	public boolean addUser(User userDetails) {
		
		User user = new User();
		
		user.setFirstName(userDetails.getFirstName());
		user.setLastName(userDetails.getLastName());
		user.setCity(userDetails.getCity());
		user.setMobileNumber(userDetails.getMobileNumber());
		user.setStatus(userDetails.getStatus());
		user.setRole(userDetails.getRole());
		user.setUsername(userDetails.getUsername());
		user.setPassword(userDetails.getPassword());
		
		if(userRepository.save(user) != null) {
			return true;
		}
		return false;
	}
	
	public List<User> getList() {
		return userRepository.findAll();
	}
	
	public Optional<User> findUser(Long id){
		return userRepository.findById(id);
	}
	
	public boolean updateUser(User user) {
		if(userRepository.save(user) != null) {
			return true;
		}
		return false;
	}
	
	public boolean deleteUser(User user) {
		try {
			userRepository.delete(user);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	 public Page<User> getUsers(int page, int size) {
	        return userRepository.findAll(PageRequest.of(page, size, Sort.by(Sort.Order.asc("firstName"))));
	    }
	 
	 public List<User> getAllUser(){
		 return userRepository.getAllUser();
	 }
	 
	 public User findByUsername(String username) {
		 return userRepository.findByUsername(username);
	 }
	 
	 
	 public boolean passwordVerification(String username, String password) {
		 User user = null;
		 String encryptedPass = CipherSecurity.encrypt(password);
		 
		 user = userRepository.findByUsername(username);
		 if(user.getPassword().equals(encryptedPass)) {
			 return true;
		 }else {
			 return false;
		 }
	 }
}
