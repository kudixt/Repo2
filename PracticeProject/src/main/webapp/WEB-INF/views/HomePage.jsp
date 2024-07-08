<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  
  <jsp:useBean id="cipherSecurity" class = "com.practice.security.CipherSecurity"></jsp:useBean>
  
<title>HomePage</title>

<%@include file = "/WEB-INF/views/resources.jsp" %>
</head>
<body>
	<h2 align = "center">User Form</h2>
	
	<div align = "center">
		<a href = "userDetails"><button class = "btn btn-info">User Details</button></a>
	</div>
	<br>
	<div align = "center">
		<a href = "addUser"><button class = "btn btn-info">Add User</button></a>
	</div>
	<br>
	
	<div align = "center">
		<a href = "test"><button class = "btn btn-info">Test</button></a>
	</div>
	<br>
	
	<div align = "center">
		<a href = "login"><button class = "btn btn-info">Login</button></a>
	</div>
	<br>
	
	<div align = "center">
		<a href = "assignBook?Action=${cipherSecurity.encrypt('FORM')}"><button class = "btn btn-info">Assign Book</button></a>
	</div>
	<br>
	
	<div align = "center">
		<a href = "assignedBookList"><button class = "btn btn-info">Assigned Book List</button></a>
	</div>
	<br>
</body>
</html>