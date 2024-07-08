var status = false;

function validator() {
		
	$("#stateIdError").text("");
	$("#districtIdError").text("");
	$("#zoneIdError").text("");
	$("#circleIdError").text("");
	$('#circleMarNameErrId').text("");

	var state = $("#stateDropDown").val();
	var district = $("#districtDropDown").val();
	var zone = $("#zoneDropDown").val();
	var circleName = $("#circelId").val().trim();
	var circleMarathiName = $("#circleMarNameId").val().trim();
	
	if (state == "0") {
		$('#stateIdError').text("Please select state");
		return false;
	}
	if (district == "0") {
		$('#districtIdError').text("Please select district");

		return false;
	}
	if (zone == "0") {
		$('#zoneIdError').text("Please select zone");
		return false;
	}
	if (circleName == "") {
		if (status == "true") {
			$('#circleIdError').text("Circle already exists");
			status = false;
		} else {
			$('#circleIdError').text("Please enter circle name");

		}
		return false;
	}
	
	if (circleMarathiName == "") {
		if (status == "true") {
			$('#circleMarathiName').focus();
			$('#circleMarNameErrId').text("Circle already exists");
			status = false;
		} else {
			$('#circleMarathiName').focus();
			$('#circleMarNameErrId').text("Please enter marathi circle name");

		}
		return false;
	}
}

$(document).ready(function() {

	$('#circelId').change(function() {
		var circleName = $("#circelId").val().trim();
		var zoneId = $("#zoneDropDown").val();
		var circle = circleName + "," + zoneId;
		$.ajax({
			url : "checkCircleExist.htm?name=" + circle,
			type : "POST",
			success : function(data) {
				if (data.search("Present") == 0) {
					$("#circelId").val("");
					$('#circleIdError').text("Circle already exists");
					status = true;
				} else {
					$('#circleIdError').text("");
				}
			},
		})

	})

})