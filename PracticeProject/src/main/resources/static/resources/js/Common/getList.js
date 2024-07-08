$(document).ready(function() {
	
	if ($('#userLevel').val() == 1) {
		$.ajax({
			url : "getDistrictList.htm?sid=" + $('#userLevelFk').val(),
			type : "POST",
			contentType : "application/json",
			success:function(data, status, xhr) {
			assignDatatoDistrict(xhr.responseText)
		}
		});	
	} else if ($('#userLevel').val() == 2) {
		$.ajax({
			url : "getZoneList.htm?dId=" + $('#userLevelFk').val(),
			type : "POST",
			contentType : "application/json",
			success:function(data, status, xhr) {
			assignDatatoZone(xhr.responseText)
		}
			
		});
	} else if ($('#userLevel').val() == 3) {
		$.ajax({
			url : "getCircleList.htm?zId=" + $('#userLevelFk').val(),
			type : "POST",
			contentType : "application/json",
			success:function(data, status, xhr) {
			assignDatatoCircle(xhr.responseText)
		}
		});
	} else if ($('#userLevel').val() == 4) {
		$.ajax({
			url : "getDivisionList.htm?cId=" + $('#userLevelFk').val(),
			type : "POST",
			contentType : "application/json",
			success:function(data, status, xhr) {
			assignDatatoLocation(xhr.responseText)
		}
		});
	}

	$('#stateDropDown').change(function() {
		$('#districtDropDown').text("");
		var sid = $('#stateDropDown').val()
		$.ajax({
			url : "getDistrictList.htm?sid=" + sid,
			type : "POST",
			contentType : "application/json",
			success:function(data, status, xhr) {
			assignDatatoDistrict(xhr.responseText)
		}
		});
	})

	$('#districtDropDown').change(function() {
		var dId = $('#districtDropDown').val()
		$('#zoneDropDown').text("");
		$('#circleDropDown').text("");
		$('#locationDropDown').text("");
		$.ajax({
			url : "getZoneList.htm?dId=" + dId,
			type : "POST",
			contentType : "application/json",
			success:function(data, status, xhr) {
			assignDatatoZone(xhr.responseText)
		}
		});
	})

	$('#zoneDropDown').change(function() {

		var zId = $('#zoneDropDown').val()
		$('#circleDropDown').text("");
		$('#locationDropDown').text("");
		$.ajax({
			url : "getCircleList.htm?zId=" + zId,
			type : "POST",
			contentType : "application/json",
			success:function(data, status, xhr) {
			assignDatatoCircle(xhr.responseText)
		}
		});
	})

	$('#circleDropDown').change(function() {
		var cId = $('#circleDropDown').val()
		$('#locationDropDown').text("");
		$.ajax({
			url : "getDivisionList.htm?cId=" + cId,
			type : "POST",
			contentType : "application/json",
			success:function(data, status, xhr) {
			assignDatatoLocation(xhr.responseText)
		}
		});
	})

});

function assignDatatoState(data) {
	d = $.parseJSON(data);
	$("#stateDropDown").append("<option value=''>Select State</option>");
	$.each(d, function(i, item) {
		$("#stateDropDown").append(
				"<option value='" + item['pk_id'] + "'>" + item['stateName']
						+ "</option>")

	});
}

function assignDatatoDistrict(data) {
	d = $.parseJSON(data);
	$("#districtDropDown").append("<option value='0'>Select District</option>");
	$.each(d, function(i, item) {
		$("#districtDropDown").append(
				"<option value='" + item['primaryId'] + "'>"
						+ item['districtName'] + "</option>")
	});

}

function assignDatatoZone(data) {
	d = $.parseJSON(data);
	$("#zoneDropDown").append("<option value='0'>Select Zone</option>");
	$.each(d, function(i, item) {
		$("#zoneDropDown").append(
				"<option value='" + item['pk_id'] + "'>" + item['zoneName']
						+ "</option>")
	});

}

function assignDatatoCircle(data) {
	d = $.parseJSON(data);
	$("#circleDropDown").append("<option value='0'>Select Circle</option>");
	$.each(d, function(i, item) {
		$("#circleDropDown").append(
				"<option value='" + item['pk_id'] + "'>" + item['circleName']
						+ "</option>")
	});

}

function assignDatatoLocation(data) {
	d = $.parseJSON(data);
	$("#locationDropDown").append("<option value='0'>Select Location</option>");
	$.each(d, function(i, item) {
		$("#locationDropDown").append(
				"<option value='" + item['divisionMasterId'] + "'>"
						+ item['divisionName'] + "</option>")
	});

}
