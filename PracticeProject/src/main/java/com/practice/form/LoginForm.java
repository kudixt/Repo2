package com.practice.form;

import com.practice.session.SessionDetails;

public class LoginForm {

	private String username;
	private String password;
	private SessionDetails sessionDetails;
	
	
	public SessionDetails getSessionDetails() {
		return sessionDetails;
	}
	public void setSessionDetails(SessionDetails sessionDetails) {
		this.sessionDetails = sessionDetails;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
}
