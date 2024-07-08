<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
    <%@include file = "/WEB-INF/views/resources.jsp" %>
    <style>
        .form-container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            min-width: 60%;
        }

        .col-form-label {
            font-family: Play;
            font-size: 15px;
            font-weight: 800;
        }

        label {
            margin-left: 13%;
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
    </style>
    <script type="text/javascript">
        $(document).ready(function () {
            $("#message").fadeIn("fast", function () {
                hideMessage();
            });

            function hideMessage() {
                setTimeout(function () {
                    $("#message").fadeOut("slow");
                }, 3000);
            }
        });
    </script>
</head>

<body>
	

    <div class="form-container">
    <c:if test="${message != null}">
		<div class = "col-lg-10" align = "center" style = "margin-left: 10%">
			<div class = "alert alert-danger fade in" id = "message">
			<a href="#" class="close" data-dismiss="alert">&times;</a> <strong>
				<strong style = "text-align: left;">${message}</strong>
			</div>
		</div>
	</c:if>
	<div class = "container col-lg-12">
    
        <h2 align="center">Login</h2>
        <form:form action="login" method="POST" modelAttribute="loginForm">
            <div class="form-group row" style = "margin-left: 10%">
                <label for="id" class="col-sm-2 col-form-label">Username:</label>
                <div class="col-sm-4">
                    <form:input class="form-control" path="username" id="username" />
                </div>
            </div>

            <div class="form-group row" style = "margin-left: 10%">
                <label for="id" class="col-sm-2 col-form-label offset-sm-2">Password:</label>
                <div class="col-sm-4">
                    <form:input class="form-control" path="password" id="password" type="password" />
                </div>
            </div>
            
            <div class="form-group row">
                <div class="col-sm-10 offset-sm-2" style = "margin-left: 38%;">
                    <button type = "submit" class = "btn btn-info">Submit</button>
                    <button type="reset" class="btn btn-warning">Reset</button>
                </div>
            </div>
        </form:form>
    </div>
    </div>
</body>

</html>