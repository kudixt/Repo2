package com.practice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.practice.dao.UserRepository;
import com.practice.entity.User;

@SpringBootApplication
//@EnableJpaRepositories("com.practice.*")
//@ComponentScan(basePackages = { "com.practice.*" })
//@EntityScan("com.practice.*")
public class PracticeProjectApplication {

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(PracticeProjectApplication.class, args);
		
		
//		UserRepository userRepository = context.getBean(UserRepository.class);
//		
//		User user = new User();
//		
//		user.setFirstName("Anuj");
//		user.setLastName("Kudi");
//		user.setCity("Pune");
//		user.setStatus("True");
//		user.setMobileNumber("9268590626");
//		
//		User user1 = userRepository.save(user);
//		
//		System.out.println(user1);
	}

}
