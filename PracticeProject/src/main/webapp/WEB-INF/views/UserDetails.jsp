<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<%@include file = "/WEB-INF/views/resources.jsp" %>

<jsp:useBean id="cipherSecurity" class = "com.practice.security.CipherSecurity"></jsp:useBean>
<title>User Details</title>

<script type="text/javascript">
	$(document).ready(function(){
		
// 		$(document).ready(function(){
// 			$('#userTable').dataTable({
// 				"ordering": false
// 			});
// 		});
		
			$("#message").fadeIn("fast", function(){
				hideMessage();
			});
		
		function hideMessage(){
			setTimeout(function(){
				$("#message").fadeOut("slow");
			}, 3000);
		}
	});
	
	function deleteModal(username){
		$("#userid").text(username);
		$("#username").val(username);
		$("#deleteModal").modal();
	}
</script>

<style type="text/css">
	.glyphicon-trash{
		color: #d50000;
	}
	
	th{
		text-align: center;
		font-family: Encode Sans SC;
	}
	
	td{
		font-family: Poppins;
	}
	
	.pagination {
            display: inline-block;
        }
        .pagination a {
            color: black;
            float: left;
            padding: 8px 16px;
            text-decoration: none;
            transition: background-color .3s;
        }
        .pagination a.active {
            background-color: dodgerblue;
            color: white;
        }
        .pagination a:hover:not(.active) {background-color: #ddd;}
        
    .valid{
		color: green;
	}
	
	.invalid{
		color: red;
	}
	#deleteUser{
		font-size: 15px;
		font-family: Poppins;
	}
</style>

</head>
<body>
	<h2 align="center">User Details</h2>
	
	<c:if test="${message != null}">
		<div class = "col-lg-10" align = "center">
			<div class = "alert alert-success fade in" id = "message">
			<a href="#" class="close" data-dismiss="alert">&times;</a> <strong>
				<strong style = "text-align: left;">${message}</strong>
			</div>
		</div>
	</c:if>
	
	<div class="container col-lg-12">
		<div class="table-responsive">
		
		<div align = "right">
			<a href = "addUser"><button class = "btn btn-default" align = "right">Add User</button></a>
		</div><br>
			<table class="table table-bordered" id ="userTable">
				<thead>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>City</th>
						<th>Mobile Number</th>
						<th>Status</th>
						<th>Edit/Delete</th>
						<th>Enable/Disable</th>
					</tr>
				</thead>
				<tbody>
					<c:forEach items="${usersPage.content}" var="user">
						<tr>
							<td>${user.firstName}</td>
							<td>${user.lastName}</td>
							<td>${user.city}</td>
							<td>${user.mobileNumber}</td>
							<td>${user.status}</td>
							<td align = "center"><a href = "editUser?id=${cipherSecurity.encrypt(user.id)}"><span class = "bi bi-pencil-square"></span></a> / 
							<a href = "#" style = "text-decoration: none;" onclick = "javascript:deleteModal('${user.username}');"><span class = "glyphicon glyphicon-trash"></span></a></td>
							<td align = "center"><a href = "changeStatus?id=${cipherSecurity.encrypt(user.id)}">
								<c:if test="${user.status.equals('False')}"><span class = "bi bi-check2-circle valid"></span></c:if>
								<c:if test="${user.status.equals('True')}"><span class = "bi bi-x-circle invalid"></span></c:if>
							</a></td>
						</tr>
					</c:forEach>
				</tbody>
			</table>
			
			<div class="pagination">
        <c:if test="${usersPage.hasPrevious()}">
            <a href="?page=${usersPage.number - 1}&size=${usersPage.size}">&laquo; Previous</a>
        </c:if>
        <c:forEach begin="0" end="${usersPage.totalPages - 1}" var="i">
            <a href="?page=${i}&size=${usersPage.size}" 
               class="${i == usersPage.number ? 'active' : ''}">${i + 1}</a>
        </c:forEach>
        <c:if test="${usersPage.hasNext()}">
            <a href="?page=${usersPage.number + 1}&size=${usersPage.size}">Next &raquo;</a>
        </c:if>
    </div>
    
    
		</div>
	</div>
</body>

<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-body">
        <p id = "deleteUser">Are you sure you want to delete <span id = "userid"></span>?</p>
      </div>
      <div class="modal-footer">
        <form action = "deleteUser" method = "POST" modelAttribute = "user">
        	<input type = "hidden" id  ="username" name = "username"/>
        	<button class = "btn btn-primary" type = "Submit">Delete</button>
        </form>
      </div>
    </div>
  </div>
</div>
</html>