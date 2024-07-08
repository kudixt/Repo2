<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>  
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>  
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<jsp:useBean id="cipherSecurity" class = "com.practice.security.CipherSecurity"></jsp:useBean>
<%@include file = "/WEB-INF/common/resources.jsp" %>
<meta charset="UTF-8">
<title>Assign Book</title>

<style type="text/css">
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
    
    .error{
		color: red;
	}
</style>

<script type="text/javascript">
	$(document).ready(function() {
		
	    
	    $("#returnDate").datepicker({
	        changeMonth: true,
	        changeYear: true,
	        dateFormat: 'yy-mm-dd',
	        minDate: '0',
	    });
	});
	
	
	function validate(){
		$("#booknameErr").text("");
		$("#usernameErr").text("");
		$("#returnDateErr").text("");
		
		var bookId = $("#bookId").val();
		if(bookId == "0"){
			$("#booknameErr").text("Book Cannot be empty. Select a book");
			return false;
		}
		
		var username = $("#userId").val();
		if(username == "0"){
			$("#usernameErr").text("User Cannot be empty. Select a user");
			return false;
		}
		
		var date = $("#returnDate").val();
		if(date == ""){
			$("#returnDateErr").text("Please Enter Date");
			return false;
		}
	}
</script>
</head>
<body>
	<div class="form-container">
        <h2 align = "center">Add Book</h2><br>
        <form:form action = "assignBook?Action=${cipherSecurity.encrypt('ADD')}" method = "POST" modelAttribute = "userBook" onsubmit = "return validate();">
            <div class="form-group row">
                <label for="bookName" class="col-sm-3 col-form-label">Book Name: </label>
                <div class="col-sm-6">
                    <form:select class = "form-control select2" path="bookId" id = "bookId">
                    	<option value = "0">----Please Select Book-----</option>
                    	<c:forEach items = "${bookList}" var = "book">
                    		<option value = "${book.bookId}">${book.bookName}</option>
                    	</c:forEach>
                    </form:select>
                    <span class = "error" id = "booknameErr"></span>
                </div>
            </div>
            <div class="form-group row">
                <label for="username" class="col-sm-3 col-form-label">User Name: </label>
                <div class="col-sm-6">
                    <form:select class = "form-control select2" id = "userId" path = "userId">
                    	<option value = "0">----Please Select User-----</option>
                    	<c:forEach items = "${userList}" var = "user">
                    		<option value = "${user.id}">${user.firstName} ${user.lastName} (${user.username})</option>
                    	</c:forEach>
                    </form:select>
                    <span class = "error" id = "usernameErr"></span>
                </div>
            </div>
            <div class="form-group row">
                <label for="endDate" class="col-sm-3 col-form-label">Return Date: </label>
                <div class="col-sm-2">
                    <input type = "text" class="form-control datepicker" id="returnDate" name="returnDate" placeholder = "yyyy-mm-dd" readonly></input>
                    <span class = "error" id = "returnDateErr"></span>
                </div>
            </div>
           <br>
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