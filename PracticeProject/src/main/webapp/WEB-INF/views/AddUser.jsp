<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>  
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>  
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  
<!--   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"> -->
<!--   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script> -->
<!--   <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script> -->
<!--   <link rel="stylesheet" -->
<!-- href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css"> -->
<!-- <script  -->
<!-- src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js"></script>     -->

<%@include file = "/WEB-INF/views/resources.jsp" %>

<title>Add User</title>

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
	font-family: Play;
}

    .form-container {
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        min-width: 60%;
    }
	
    label{
        margin-left: 13%;
        font-family: Manjari;
    }
    .select2-container--default .select2-selection--single {
            height: 38px;
            padding: 6px 5px;
        }
        .select2-container--default .select2-selection--single .select2-selection__rendered {
            line-height: 20px;
        }
        h2{
        	font-family: Cormorant Garamond;
        }
</style>

<script>
    $(document).ready(function() {
            $('.select2').select2({
                minimumResultsForSearch: Infinity
            });
            
            $("#username").change(function(){
            	$("#usernameStatus").text("").removeClass('valid').addClass('invalid');
            })
        });
</script>

<script type="text/javascript">
	function usernameVerification(){
//  		alert("function");
		var username = $("#username").val();
		
		if(username.length > 3){
// 			alert("if");
			$.ajax({
				url : "checkUsername?username=" + username,
				type : "POST",
				success : function(data, status, xhr){
					checkValue(xhr.responseText);
				}
			});
		} else {
			$("#usernameStatus").text("Username must be atleast 4 characters");
		}
	}
	
	function checkValue(data){
		alert(data)
		if(data == 'true'){
			alert("Username already exists");
			$("#usernameStatus").text("Username Already exists").removeClass('valid').addClass('invalid');
		}else{
			$("#usernameStatus").text("Username is available").removeClass('invalid').addClass('valid');
		}
	}
	
	function validate(){
		$("#firstnameErr").text("");
		$("#lastnameErr").text("");
		$("#cityErr").text("");
		$("#statusErr").text("");
		$("#mobilenumberErr").text("");
		$("#usernameStatus").text("");
		$("#roleErr").text("");
		
		
		var firstname = $("#firstName").val();
		if(firstname == ""){
			$("#firstnameErr").text("Enter First Name");
			return false;
		}
		
		var lastname = $("#lastName").val();
		if(lastname == ""){
			$("#lastnameErr").text("Enter Last Name");
			return false;
		}
		
		var mobilenumber = $("#mobileNumber").val();
		if(mobilenumber == ""){
			$("#mobilenumberErr").text("Enter Mobile Number");
			return false;
		}
		if(mobilenumber.length != 10){
			$("#mobilenumberErr").text("Mobile Number must be 10 digits");
			return false;
		}
	
		
		var city = $("#city").val();
		if(city == ""){
			$("#cityErr").text("Enter City Name");
			return false;
		}
		
		var username = $("#username").val();
		if(username == ""){
			$("#usernameStatus").text("Enter Username");
			return false;
		}else if($('#usernameStatus').hasClass('invalid')){
			$("#usernameStatus").text("Please verify username");
			return false;
		}
		
		var role = $("#role").val();
		if(role == ""){
			$("#roleErr").text("Enter Role");
			return false;
		}
		
		var password = $("#password").val();
		if(password == ""){
			$("#passwordErr").text("Enter Password");
			return false;
		}
		
		var confirmPassword = $("#confirmPassword").val();
		if(confirmPassword == ""){
			$("#confirmPasswordErr").text("Confirm Password");
			return false;
		}else if(confirmPassword != password){
			$("#confirmPasswordErr").text("Passwords do not match");
			return false;
		}
return true;
	}
</script>

</head>
<body>
	
		<div class="form-container">
        <h2 align = "center">Add User</h2><br>
        <form:form action = "addUser" method = "POST" modelAttribute = "userDetails" onsubmit = "return validate();">
            <div class="form-group row">
                <label for="fistName" class="col-sm-3 col-form-label">First Name: </label>
                <div class="col-sm-6">
                    <form:input type="text" class="form-control" id="firstName" path="firstName" placeholder="Enter First Name"></form:input>
                    <span class = "error" id = "firstnameErr"></span>
                </div>
            </div>
            <div class="form-group row">
                <label for="lastName" class="col-sm-3 col-form-label">Last Name: </label>
                <div class="col-sm-6">
                    <form:input type="text" class="form-control" id="lastName" path="lastName" placeholder = "Enter Last Name"></form:input>
                    <span class = "error" id = "lastnameErr"></span>
                </div>
            </div>
            <div class="form-group row">
                <label for="mobileNumber" class="col-sm-3 col-form-label">Mobile Number: </label>
                <div class="col-sm-6">
                    <form:input type="number" class="form-control" id="mobileNumber" path="mobileNumber" placeholder = "Enter Mobile Number" maxlength="10"></form:input>
                    <span class = "error" id = "mobilenumberErr"></span>
                </div>
            </div>
            <div class="form-group row">
                <label for="status" class="col-sm-3 col-form-label">Status: </label>
                <div class="col-sm-6">
                    <form:select class = "form-control select2" path="status" id="status">
                        <option value = "True">True</option>
                        <option value = "False">False</option>
                    </form:select>
                    <span class = "error" id = "statusErr"></span>
                </div>
            </div>
            <div class="form-group row">
                <label for="city" class="col-sm-3 col-form-label">City: </label>
                <div class="col-sm-6">
                    <form:input type="text" class="form-control" id="city" path="city" placeholder="Enter City"></form:input>
                    <span class = "error" id = "cityErr"></span>
                </div>
            </div>
            <div class="form-group row">
                <label for="username" class="col-sm-3 col-form-label">Username: </label>
                <div class="col-sm-6">
                    <form:input type="username" class="form-control" id="username" path="username" placeholder = "Enter Username"></form:input>
                    <span class = "invalid" id = "usernameStatus"></span>
                </div>
                <div class = "col-sm-1">
                	<a href = "#" onclick = "javascript:usernameVerification();" style = "color: blue; text-align: left;">Verify</a>
                </div>
            </div>
            <div class="form-group row">
                <label for="role" class="col-sm-3 col-form-label">Role: </label>
                <div class="col-sm-6">
                    <form:input type="text" class="form-control" id="role" path="role" placeholder = "Enter Role"></form:input>
                    <span class = "error" id = "roleErr"></span>
                </div>
            </div>
            <div class="form-group row">
                <label for="password" class="col-sm-3 col-form-label">Password: </label>
                <div class="col-sm-6">
                    <form:input type="password" class="form-control" id="password" path="password" placeholder = "Enter Password"></form:input>
                    <span class = "error" id = "passwordErr"></span>
                </div>
            </div>
            <div class="form-group row">
                <label for="password" class="col-sm-3 col-form-label">Confirm Password: </label>
                <div class="col-sm-6">
                    <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" placeholder = "Enter Password" />
                    <span class = "error" id = "confirmPasswordErr"></span>
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