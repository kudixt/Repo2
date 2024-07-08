function validator() {

	$("#stateNameErr").text("");
	$("#stateCodeErr").text("");
	var stateName = $("#stateNameId").val().trim();
	var stateCode = $("#stateCodeId").val().trim();

	if (stateName == "") {
		$("#stateNameErr").text("Enter state name");
		return false;
	}
	if (stateCode == "") {
		$("#stateCodeErr").text("Enter state code");
		return false;
	} else {
		if (stateCode.length != 2) {
			$('#stateCodeErr').text("State code should contain 2 characters");
			return false;
		}
	}
}

$(document).ready(function() {

	$('#stateNameId').change(function() {
		var stateName = $("#stateNameId").val().trim();
		$.ajax({
			url : "checkStateExist.htm?name=" + stateName,
			type : "POST",
			success : function(data) {
				if (data.search("Present") == 0) {
					$("#stateNameId").val("");
					$('#stateNameErr').text("State already exist");
				} else {
					$('#stateNameErr').text("");
				}
			},
		})
	})

	$('#stateCodeId').change(function() {

		var stateCode = $("#stateCodeId").val();

		$.ajax({
			url : "checkStateCodeExist.htm?code=" + stateCode,
			type : "POST",
			success : function(data) {
				if (data.search("Present") == 0) {
					$("#stateCodeId").val("");
					$('#stateCodeErr').text("State code already exist");
				} else {
					$('#stateCodeErr').text("");
				}
			},
		})

	})

	$('#stateCodeId').keypress(function(e) {

		var regex = new RegExp("^[a-zA-Z\b]+$");
		var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
		if (regex.test(str)) {

		} else {
			e.preventDefault();

		}
	});
})