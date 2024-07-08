package com.practice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.practice.entity.User;
import com.practice.form.LoginForm;
import com.practice.security.CipherSecurity;
import com.practice.service.UserService;
import com.practice.session.SessionDetails;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Controller
public class LoginController {
	
	@Autowired
	UserService userService;
	
	
	public void setSessionDetails(String username, HttpServletRequest request) {
		User user = null;
		SessionDetails sessionDetails = new SessionDetails();
		user = userService.findByUsername(username);
		
		sessionDetails.setFirstName(user.getFirstName());
		sessionDetails.setLastName(user.getLastName());
		sessionDetails.setMobileNumber(user.getMobileNumber());
		sessionDetails.setUsername(user.getUsername());
		
		HttpSession httpSession = request.getSession(true);
		httpSession.setAttribute("sessionDetails", sessionDetails);
	}

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login(HttpServletRequest request, Model model) {
		LoginForm loginForm = new LoginForm();
		String encryptedMessage = request.getParameter("message");
		if(encryptedMessage != null) {
			String message = CipherSecurity.decrypt(encryptedMessage);
			model.addAttribute("message", message);
		}
		model.addAttribute("loginForm", loginForm);
		
		return "LoginPage";
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public String Login(HttpServletRequest request, HttpServletResponse response, Model model, @ModelAttribute("loginForm") LoginForm loginForm) {
		User user = null;
		String username = loginForm.getUsername();
		String password = loginForm.getPassword();
		String message = "";
		
		if(userService.findByUsername(username) != null) {
			boolean flag = userService.passwordVerification(username, password);
			
			if(flag) {
				setSessionDetails(username, request);
				return "redirect:/userDetails";
			}else {
				message = CipherSecurity.encrypt("Incorrect Password. Please try again");
				return "redirect:/login?message=" + message;
			}
		}else {
			message = CipherSecurity.encrypt("Username not found");
			return "redirect:/login?message=" + message;
		}
	}
}
