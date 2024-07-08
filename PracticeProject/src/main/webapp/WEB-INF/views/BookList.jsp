<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Book List</title>
<link rel="stylesheet"
	href='<c:url value="/resources/css/List.css"></c:url>'>
<%@include file = "/WEB-INF/views/resources.jsp" %>

<style type="text/css">
	th{
		text-align:center;
		font-family: Encode Sans SC;
	}
	
	td{
		font-family: Poppins;
	}
	
	h2{
		font-family: Cormorant Garamond;
	}
</style>
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
	<h2 align = "center">Book List</h2>
	
	<c:if test="${message != null}">
		<div class = "col-lg-10" align = "center">
			<div class = "alert alert-success fade in" id = "message">
			<a href="#" class="close" data-dismiss="alert">&times;</a> <strong>
				<strong style = "text-align: left;">${message}</strong>
			</div>
		</div>
	</c:if>
	
	<div class = "container col-lg-12">
		<div class = "table-responsive">
			<table class = "table table-bordered" id = "bookTable">
				<thead>
					<tr>
						<th>Book Name</th>
						<th>Author</th>
						<th>Book Code</th>
						<th>Quantity Available</th>
					</tr>
				</thead>
				<tbody id = "tableBody">
					<c:forEach items = "${bookList}" var = "book">
						<tr>
							<td>${book.bookName}</td>
							<td>${book.author}</td>
							<td>${book.bookCode}</td>
							<td>${book.quantity}</td>
						</tr>
					</c:forEach>
				</tbody>
			</table>
		</div>
	</div>
</body>
</html>