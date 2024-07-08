$(document).ready(function() {
		$('#daysToIncrementId').change(function() {
			var dayToIncrase = $('#daysToIncrementId').val()
			$.ajax({
					  url : "checkIncreaseDayExist.htm?dayToIncrase="+ dayToIncrase,
					  type : "POST",
					  contentType : "application/json",
					  success : function(data) {
								if (data) {
									$('#daysToIncrementId').val("");
									document.getElementById("daysToIncrementIdError").innerHTML = "Day Already Exist";
								}else{
										document.getElementById("daysToIncrementIdError").innerHTML = "";
									}
							}
					 });
				});
					
					
		$('#amountToIncrementId').change(function() {
			var fineToIncrase = $('#amountToIncrementId').val()
			$.ajax({
					  url : "checkIncreaseAmountExist.htm?fineToIncrase="+ fineToIncrase,
					  type : "POST",
					  contentType : "application/json",
					  success : function(data) {
								if (data) {
									$('#amountToIncrementId').val("");
									document.getElementById("amountToIncrementError").innerHTML = "Amount Already Exist";
								}else{
										document.getElementById("amountToIncrementError").innerHTML = "";
									}
							}
					 });
				});			
					
});




function validation() {
	$('#daysToIncrementIdError').text("");
	$('#amountToIncrementError').text("");
	
	var num = /^[0-9]*$/;

	var daysToIncrement = document.Myform.daysToIncrement.value;
	
	if (daysToIncrement == "") {
		document.getElementById("daysToIncrementIdError").innerHTML = "Day field can not be Null";
		return false;
	} else {
		if (!(daysToIncrement.match(num))) {
			$('#daysToIncrementIdError').text("Please enter valid number");
			return false;
		}
	}

	var amountToIncrement = document.Myform.amountToIncrement.value;
	if (amountToIncrement == "") {
		document.getElementById("amountToIncrementError").innerHTML = "Amount field can not be Null";
		return false;
	} else {
		if (!(amountToIncrement.match(num))) {
			$('#amountToIncrementError').text("Please enter valid amount");
			return false;
		}
	}
	
}

