var status = false;

function validator() {

	$('#stateIdError').text("");
	$('#districtIdError').text("");
	$('#zoneNameErrId').text("");
	$('#zoneMarNameErrId').text("");

	var state = $("#stateDropDown").val();
	var district = $("#districtDropDown").val();
	var zoneName = $("#zoneNameId").val().trim();
	var zoneMarName = $("#zoneMarNameId").val().trim();
	
	if (state == "0") {
		$('#stateIdError').text("Please select state");
		return false;
	}
	if (district == "0") {
		$('#districtDropDown').focus();
		$('#districtIdError').text("Please select district");
		return false;
	}
	if (zoneName == "") {
		if (status == "true") {
			$('#zoneNameId').focus();
			$('#zoneNameErrId').text("Zone already exists");
			status = false;
		} else {
			$('#zoneNameId').focus();
			$('#zoneNameErrId').text("Please enter zone name");

		}
		return false;
	}
	
	if (zoneMarName == "") {
		if (status == "true") {
			$('#zoneMarName').focus();
			$('#zoneMarNameErrId').text("Zone already exists");
			status = false;
		} else {
			$('#zoneMarName').focus();
			$('#zoneMarNameErrId').text("Please enter marathi zone name");

		}
		return false;
	}
}

$(document).ready(function() {

	$('#zoneNameId').change(function() {
		var zoneName = $("#zoneNameId").val().trim();
		var districtId = $("#districtDropDown").val();
		var zone = zoneName + "," + districtId;
		$.ajax({
			url : "checkZoneExist.htm?name=" + zone,
			type : "POST",
			success : function(data) {
				if (data.search("Present") == 0) {
					$("#zoneNameId").val("");
					$('#zoneNameErrId').text("Zone already exists");
					status = true;
				} else {
					$('#zoneNameErrId').text("");
				}
			},
		})

	})

})