<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>  
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<%@include file = "/WEB-INF/views/resources.jsp" %>
<title>Edit</title>

<style type="text/css">
	.valid{
		color: green;
		text-align: left;
	}
	
	.invalid{
		color: red;
		text-align: left;
	}
	
	.error{
		color: red;
	}

body, html {
        height: 100%;
        width: 100%;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f0f0f0;
    }

input, option, span{
	font-family: Manjari;
}

    .form-container {
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        min-width: 60%;
    }
    .col-form-label{
        font-family: Play;
        font-size: 15px;
        font-weight: 800;
    }
    label{
        margin-left: 13%;
    }
    .select2-container--default .select2-selection--single {
            height: 38px;
            padding: 6px 5px;
        }
        .select2-container--default .select2-selection--single .select2-selection__rendered {
            line-height: 20px;
        }
</style>

</head>
<body>
	<div class = "form-container">
		<h2 align = "center">Edit User</h2>
		<form:form action="editUser" method = "POST" modelAttribute = "user">
			<div class = "form-group row">
				<label for = "id" class = "col-sm-3 col-form-label">ID:</label>
				<div class = "col-sm-6">
					<form:input class = "form-control" path="id" id = "id" value = "${user.id}" readonly = "true"/>
				</div>
			</div>
			
			<div class = "form-group row">
				<label for = "id" class = "col-sm-3 col-form-label">First Name:</label>
				<div class = "col-sm-6">
					<form:input class = "form-control" path="firstName" id = "firstName" type = "text" value = "${user.firstName}"/>
				</div>
			</div>
			
			<div class = "form-group row">
				<label for = "id" class = "col-sm-3 col-form-label">Last Name:</label>
				<div class = "col-sm-6">
					<form:input class = "form-control" path="lastName" id = "lastName" type = "text" value = "${user.lastName}"/>
				</div>
			</div>
			
			<div class = "form-group row">
				<label for = "id" class = "col-sm-3 col-form-label">Mobile Number:</label>
				<div class = "col-sm-6">
					<form:input class = "form-control" path="mobileNumber" id = "mobileNumber" type = "text" value = "${user.mobileNumber}" maxlength = "10"/>
				</div>
			</div>
			
			<div class = "form-group row">
				<label for = "id" class = "col-sm-3 col-form-label">City:</label>
				<div class = "col-sm-6">
					<form:input class = "form-control" path="city" id = "city" type = "text" value = "${user.city}"/>
				</div>
			</div>
			
			<div class = "form-group row">
				<label for = "id" class = "col-sm-3 col-form-label">Status: </label>
				<div class = "col-sm-6">
					<form:input class = "form-control" path = "status" id = "status" value = "${user.status}" readonly = "true" />
				</div>
			</div>
			
			<div class = "form-group row">
				<label for = "id" class = "col-sm-3 col-form-label">Role:</label>
				<div class = "col-sm-6">
					<form:input class = "form-control" path="role" id = "role" type = "role" value = "${user.role}"/>
				</div>
			</div>
			
			<div class = "form-group row">
				<label for = "id" class = "col-sm-3 col-form-label">Username:</label>
				<div class = "col-sm-6">
					<form:input class = "form-control" path="username" id = "username" value = "${user.username}" readonly = "true"/>
				</div>
			</div>
			
			<div class = "form-group row">
				<label for = "id" class = "col-sm-3 col-form-label">Password:</label>
				<div class = "col-sm-6">
					<form:input class = "form-control" path="password" id = "password" type = "text" value = "${user.password}"/>
				</div>
			</div><br>
			
			<div class="form-group row">
                <div class="col-sm-10 offset-sm-2" style = "margin-left: 38%;">
                    <button type = "submit" class = "btn btn-info">Submit</button>
                    <button type="reset" class="btn btn-warning">Reset</button>
                </div>
            </div>
		</form:form>
		<div align = "center"><a href = "userDetails"><button class = "btn btn-default">User Details</button></a></div>
	</div>
</body>
</html>