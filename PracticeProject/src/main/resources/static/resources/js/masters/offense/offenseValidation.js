function validator() {
	$('#OffenseNameErr').text("");
	$('#OffenseSectionErr').text("");
	$('#OffenseFineErr').text("");
	/*$('#OffenseRepetativeErr').text("");
	$('#OffenseCountErr').text("");*/
	$('#categoryIDError').text("");
	$('#vehicleIdError').text("");
	$('#actIDError').text("");

	var offenceName = $("#OffenseNameId").val().trim();
	var offenceSection = $("#OffenseSectionId").val().trim();
	var fine = $("#OffenseFineId").val().trim();
	/*var repeatFine = $("#OffenseRepetativeId").val().trim();
	var count = $("#OffenseCountId").val().trim();*/
	var category = $("#categoryID").val();
	var vehicleType = $("#vehicleId").val();
	var act = $("#actID").val();

	if (offenceName == "") {
		$('#OffenseNameErr').text("Please enter violation name");
		return false;
	}
	if (offenceSection == "") {
		$('#OffenseSectionErr').text("Please enter section");
		return false;
	}
	if (fine == "") {
		$('#OffenseFineErr').text("Please enter violation fine");
		return false;
	}
/*	if (repeatFine == "") {
		$('#OffenseRepetativeErr').text("Please enter repetitive fine");
		return false;
	}
	if (count == "") {
		$('#OffenseCountErr').text("Please enter violation count");
		return false;
	}*/
	if (category == "") {
		$('#categoryIDError').text("Please select section category");
		return false;
	}
	if (vehicleType == "" || vehicleType == null || vehicleType == "null") {
		$('#vehicleIdError').text("Please select vehicle type");
		return false;
	}
	if (act == "") {
		$('#actIDError').text("Please select MVA section category");
		return false;
	}

}
