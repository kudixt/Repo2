package com.practice.controller;


import com.practice.filter.GeneralFilter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.practice.dao.RecordRepository;
import com.practice.dao.UserRepository;
import com.practice.entity.AssignBookRecords;
import com.practice.entity.Book;
import com.practice.entity.User;
import com.practice.filter.GeneralFilter;
import com.practice.form.LoginForm;
import com.practice.security.CipherSecurity;
import com.practice.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Controller
public class HomeController {
	
	@Autowired
	UserService userService;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	RecordRepository recordRepository;
	
	@Autowired
	GeneralFilter generalFilter;
	
	
	@RequestMapping(value = "/home")
	public String home() {
		
		return "HomePage";
	}
	
	@RequestMapping(value = "/addUser", method = RequestMethod.GET)
	public String addUserPage(Model model) {
		User user = new User();
		
		model.addAttribute("userDetails", user);
		return "AddUser";
	}
	
	@RequestMapping(value = "/addUser", method = RequestMethod.POST)
	public String addUser(@ModelAttribute("userDetails") User userDetails, Model model) {
		
		String encryptedPass = CipherSecurity.encrypt(userDetails.getPassword());
		userDetails.setPassword(encryptedPass);
		
		if(userService.addUser(userDetails)) {
			model.addAttribute("url", "<a href = \"addUser\"><button class = \"btn btn-default\">Add Another User</button></a>");
			return "Success";
		}
		return "Error";
	}
	
	@RequestMapping(value = "/userDetails")
	public String userDetails(HttpServletRequest request, Model model, 
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
		Page<User> userDetails = null;
		
		if(userService.getAllUser().size() > 0) {
			userDetails = userService.getUsers(page, size);
		}
		if(request.getParameter("message") != null) {
			String message = CipherSecurity.decrypt(request.getParameter("message"));
			model.addAttribute("message", message);
		}
		
		model.addAttribute("usersPage", userDetails);
		
		return "UserDetails";
	}
	
	@RequestMapping(value = "/editUser", method = RequestMethod.GET)
	public String editUser(HttpServletRequest request, Model model) {
		Optional<User> userOptional = null;
		User user = null;
		String encryptedId = request.getParameter("id");
		
		String idString = CipherSecurity.decrypt(encryptedId);
		Long id = Long.parseLong(idString);
		userOptional = userService.findUser(id);
		user = userOptional.get();
		user.setPassword(CipherSecurity.decrypt(user.getPassword()));
		
		model.addAttribute("user", user);
		return "EditUser";
	}
	
	@RequestMapping(value = "/editUser", method = RequestMethod.POST)
	public String updateUser(HttpServletRequest request, Model model, @ModelAttribute("user") User user) {
		Optional<User> userOptional = null;
		User userDetails = null;
		
		userOptional = userService.findUser(user.getId());
		userDetails = userOptional.get();
		
		userDetails.setCity(user.getCity());
		userDetails.setRole(user.getRole());
		userDetails.setMobileNumber(user.getMobileNumber());
		userDetails.setFirstName(user.getFirstName());
		userDetails.setLastName(user.getLastName());
		userDetails.setPassword(CipherSecurity.encrypt(user.getPassword()));
		if(userService.updateUser(userDetails)) {
			String message = CipherSecurity.encrypt("User Updated Successfully");
			return "redirect:/userDetails?message=" + message;
		}
			return "Error";
	}
	
	@RequestMapping(value = "/deleteUser", method = RequestMethod.POST)
	public String deleteUser(HttpServletRequest request, Model model, @ModelAttribute("user") User userDetails) {
		Optional<User> userOptional = null;
		User user = null;
		
		System.out.println(userDetails.getId());
		user = userService.findByUsername(userDetails.getUsername());
		
		if(userService.deleteUser(user)) {
			String message = CipherSecurity.encrypt("User Deleted Successfully");
			return "redirect:/userDetails?message=" + message;
		}
		return "Error";
	}
	
	@RequestMapping(value = "/checkUsername", method = RequestMethod.POST)
	public @ResponseBody boolean checkUsername(@RequestParam String username){
		List<User> userList = null;
		boolean flag = false;
		
//		System.out.println("Get Username List");
		
		userList = userService.getAllUser();
		
		for(User u: userList) {
			if(username.equals(u.getUsername())) {
				flag = true;
			}
		}
//		System.out.println(flag);
		
		return flag;
	}
	
	@GetMapping("/")
	public String landingPage() {
		
		return "index";
	}
	
	@RequestMapping(value = "/changeStatus", method = RequestMethod.GET)
	public String changeStatus(HttpServletRequest request, Model model) {
		Optional<User> userOptional = null;
		User user = null;
		String encryptedid = request.getParameter("id");
		Long id = Long.parseLong(CipherSecurity.decrypt(encryptedid));
		String message = "";
		
		userOptional = userService.findUser(id);
		user = userOptional.get();
		
		if(user.getStatus().equals("True")) {
			user.setStatus("False");
			message = CipherSecurity.encrypt("User Disabled Successfully");
		}else if(user.getStatus().equals("False")) {
			user.setStatus("True");
			message = CipherSecurity.encrypt("User Enabled Successfully");
		}
		
		if(userService.updateUser(user)) {
			return "redirect:/userDetails?message=" + message;
		}
		
		return "Error";
	}
	

	
	@RequestMapping("/test")
	public String test() {
		AssignBookRecords assignBookRecords = new AssignBookRecords();
		String dateString = "2024-06-25";
		Book book = new Book();
		User user = new User();
		
		user.setId(1502L);
		book.setBookId(6L);
		
		try {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-mm-dd");
		Date date = formatter.parse(dateString);
		
		assignBookRecords.setAssignDate(date);
		assignBookRecords.setFkBook(book);
		assignBookRecords.setFkUser(user);
		
		recordRepository.save(assignBookRecords);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return "HomePage";
	}

}
