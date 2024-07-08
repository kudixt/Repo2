var status = false;
var disName = false;

function validator() {

	$('#stateIdError').text("");
	$('#districtNameErr').text("");
	$('#districtCodeErr').text("");
	$('#checkboxErr').text("");

	var str = /^[a-z A-Z]+$/;
	var state = $("#stateId").val();
	var districtName = $("#districtNameId").val().trim();
	var districtCode = $("#districtCodeId").val().trim();

	if (state == "0") {
		$('#stateIdError').text("Please select state");
		return false;
	}
	if (districtName == "") {
		if (disName == true) {
			$('#districtNameId').focus();
			$('#districtNameErr').text("District already exists");

			disName = false;
		} else {
			$('#districtNameId').focus();
			$('#districtNameErr').text("Please enter district name");

		}
		return false;
	}
	
	if (districtCode == "") {
		if (status == "true") {
			$('#districtCodeId').focus();
			$('#districtCodeErr').text("District code already exists");

			status = false;
		} else {
			$('#districtCodeId').focus();
			$('#districtCodeErr').text("Enter district code");

		}
		return false;
	} else {
		if (districtCode.length != 3) {
			$('#districtCodeId').focus();
			$('#districtCodeErr').text(
					"District code should contain 3 character");
			return false;
		}
	}
}

$(document).ready(function() {

	$('#districtNameId').change(function() {
		var districtName = $("#districtNameId").val().trim();
		$.ajax({
			url : "checkDistrictExist.htm?name=" + districtName,
			type : "POST",
			success : function(data) {
				if (data.search("Present") == 0) {
					$('#districtNameId').focus();
					$("#districtNameId").val("");
					$('#districtNameErr').text("District already exists");
					disName = true;
				} else {
					$('#districtNameErr').text("");
				}
			},
		})

	})

	$('#districtCodeId').change(function() {

		var districtCode = $("#districtCodeId").val();

		$.ajax({
			url : "checkDistrictCodeExist.htm?code=" + districtCode,
			type : "POST",
			success : function(data) {
				if (data.search("Present") == 0) {
					$('#districtCodeId').focus();
					$("#districtCodeId").val("");
					$('#districtCodeErr').text("District code already exists");
					status = true;
				} else {
					$('#districtCodeErr').text("");
				}
			},
		})

	})

	$('#districtCodeId').keypress(function(e) {

		var regex = new RegExp("^[a-zA-Z\b]+$");
		var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
		if (regex.test(str)) {

		} else {
			e.preventDefault();

		}
	});
	
	$('#districtNameId').keypress(function(e) {

		var regex = new RegExp("^[a-zA-Z\b]+$");
		var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
		if (regex.test(str)) {

		} else {
			e.preventDefault();

		}
	});

})
