<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>  
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>  
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Add Book</title>
<%@include file = "/WEB-INF/views/resources.jsp" %>

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
</style>
</head>
<body>
	
	<div class="form-container">
        <h2 align = "center">Add Book</h2><br>
        <form:form action = "addBook" method = "POST" modelAttribute = "book" onsubmit = "return validate();">
            <div class="form-group row">
                <label for="bookName" class="col-sm-3 col-form-label">Book Name: </label>
                <div class="col-sm-6">
                    <form:input type="text" class="form-control" id="bookName" path="bookName" placeholder="Enter Book Name"></form:input>
                    <span class = "error" id = "booknameErr"></span>
                </div>
            </div>
            <div class="form-group row">
                <label for="author" class="col-sm-3 col-form-label">Author Name: </label>
                <div class="col-sm-6">
                    <form:input type="text" class="form-control" id="author" path="author" placeholder = "Enter Author Name"></form:input>
                    <span class = "error" id = "authorErr"></span>
                </div>
            </div>
            <div class="form-group row">
                <label for="mobileNumber" class="col-sm-3 col-form-label">Quantity: </label>
                <div class="col-sm-6">
                    <form:input type="number" class="form-control" id="bookQuantity" path="quantity" placeholder = "Enter Book Quantity"></form:input>
                    <span class = "error" id = "quantityErr"></span>
                </div>
            </div>
            <div class="form-group row">
                <label for="bookCode" class="col-sm-3 col-form-label">Book Code: </label>
                <div class="col-sm-6">
                    <form:input type="text" class="form-control" id="bookCode" path="bookCode" placeholder="Enter Book Code"></form:input>
                    <span class = "error" id = "bookCodeErr"></span>
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