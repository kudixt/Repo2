<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<%@include file = "/WEB-INF/common/resources.jsp" %>
<link rel="stylesheet"
	href='<c:url value="/resources/css/List.css"></c:url>'>
<meta charset="UTF-8">
<title>Assigned Books</title>

<jsp:useBean id="cipherSecurity" class = "com.practice.security.CipherSecurity"></jsp:useBean>

<script type="text/javascript">
	$(document).ready(function(){
		$("#message").fadeIn("fast", function(){
			hideMessage();
		});

		function hideMessage(){
		setTimeout(function(){
			$("#message").fadeOut("slow");
		}, 3000);
		}
	});
</script>
</head>
<body>
	<h2 align = "center">Assigned Books List</h2>
	
	<c:if test="${message != null}">
		<div class = "col-lg-10" align = "center">
			<div class = "alert alert-success fade in" id = "message">
			<a href="#" class="close" data-dismiss="alert">&times;</a> <strong>
				<strong style = "text-align: left;">${message}</strong>
			</div>
		</div>
	</c:if>
	
		<c:if test="${errorMessage != null}">
		<div class = "col-lg-10" align = "center">
			<div class = "alert alert-danger fade in" id = "message">
			<a href="#" class="close" data-dismiss="alert">&times;</a> <strong>
				<strong style = "text-align: left;">${errorMessage}</strong>
			</div>
		</div>
	</c:if>
	
	<div class = "container col-sm-12">
		<div class = "table-responsive">
			<table class = "table table-bordered" id = "assignedBookTable">
				<thead>
					<tr>
						<th>Book Name</th>
						<th>Assigned To</th>
						<th>Assign Date</th>
						<th>Expected Return Date</th>
						<th>Return</th>
					</tr>
				</thead>
				<tbody id = "tableBody">
					<c:forEach items = "${assignedBooks}" var = "assignBook">
						<tr>
							<td>${assignBook.fkBook.bookName}</td>
							<td>${assignBook.fkUser.firstName} ${assignBook.fkUser.lastName}</td>
							<td>${assignBook.assignDate}</td>
							<td>${assignBook.returnDate}</td>
							<td align = "center"><a href = "calculateCost?id=${cipherSecurity.encrypt(assignBook.id)}"><span class = "glyphicon glyphicon-book"></span></a></td>
						</tr>
					</c:forEach>
				</tbody>
			</table>
		</div>
	</div>
</body>
</html>