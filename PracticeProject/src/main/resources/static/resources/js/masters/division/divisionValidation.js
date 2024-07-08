var status = false;

function validator() {

	$('#stateIdError').text("");
	$('#DistrictIdError').text("");
	$('#zoneIdError').text("");
	$('#CircleIdError').text("");
	$('#divisionNameErr').text("");
	$('#divisionMarNameErrId').text("");

	var state = $("#stateDropDown").val();
	var district = $("#districtDropDown").val();
	var zone = $("#zoneDropDown").val();
	var circle = $("#circleDropDown").val();
	var division = $("#divisionNameId").val().trim();
	var divisionMarathiName = $("#divisionMarNameId").val().trim();
	
	if (state == "0") {
		$('#stateIdError').text("Please select state");
		return false;
	}
	if (district == "0") {
		$('#DistrictIdError').text("Please select district");
		return false;
	}
	if (zone == "0") {
		$('#zoneIdError').text("Please select zone");
		return false;
	}
	if (circle == "0") {
		$('#CircleIdError').text("Please select circle");
		return false;
	}
	if (division == "") {
		if (status == "true") {
			$('#divisionNameErr').text("Division already exists");
			status = false;
		} else {
			$('#divisionNameErr').text("Please enter division name");
			
		}
		return false;
	}
	
	if (divisionMarathiName == "") {
		if (status == "true") {
			$('#divisionMarNameErrId').text("Division already exists");
			status = false;
		} else {
			$('#divisionMarNameErrId').text("Please enter marathi division name");
			
		}
		return false;
	}
}
$(document).ready(function() {

	$('#divisionNameId').change(function() {
		var divisionName = $("#divisionNameId").val().trim();
		var circleId = $("#circleDropDown").val();
		var division = divisionName + "," + circleId;
		$.ajax({
			url : "checkDivisionExist.htm?name=" + division,
			type : "POST",
			success : function(data) {
				if (data.search("Present") == 0) {
					$("#divisionNameId").val("");
					$('#divisionNameErr').text("Division already exists");
					status = true;
				} else {
					$('#divisionNameErr').text("");
				}
			},
		})
	})
})
