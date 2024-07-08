<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<%@include file = "/WEB-INF/common/resources.jsp" %>
<meta charset="UTF-8">
<title>Test</title>
<script type="text/javascript">
	$(document).ready(function(){
		$('.datepicker').datepicker();
		
		$('.select2').select2();
	});
</script>
</head>
<body>
	<h2>Hello</h2>
	
	<input type = "text" class = "form-control datepicker" />
	
	<select class = "form-control select2">
		<option value = "0">ABC</option>
		<option value = "1">PQR</option>
		<option value = "2">XYZ</option>
		<option value = "3">LMK</option>
		
	</select>
</body>
</html>