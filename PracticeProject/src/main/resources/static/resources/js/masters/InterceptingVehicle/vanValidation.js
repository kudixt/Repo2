function goBack() {
	location.href = "UserMasterHandler.htm?${cipherUtils.encrypt(pageContext.request,'Action=LIST')}";
}

$(document)
		.ready(
				function() {
					$('#ids').prop('disabled', true);
					$('#checksevarthId')
							.change(
									function() {
										var sevarthId = $('#checksevarthId')
												.val();
										$
												.ajax(
														{
															url : "checkingSevarthIdInExist.htm?sevarthId="
																	+ sevarthId,
															type : "POST",
															contentType : "application/json",
															success:
														function(data) {
															if (data) {
																$(
																		'#checksevarthId')
																		.val("");
																document
																		.getElementById("sevarthIdError").innerHTML = "Sevarth Id already exists";
															} else {
																document
																		.getElementById("sevarthIdError").innerHTML = "";
															}
														}
														});
									})

					$('#mobileNumberId').keypress(
							function(e) {
								var regex = new RegExp("^[0-9\b]+$");
								var str = String
										.fromCharCode(!e.charCode ? e.which
												: e.charCode);
								if (regex.test(str)) {
								} else {
									e.preventDefault();
								}
							});

					$('#1111').keypress(
							function(e) {
								var regex = new RegExp("^[a-zA-Z]+$");
								var str = String
										.fromCharCode(!e.charCode ? e.which
												: e.charCode);
								if (regex.test(str)) {
								} else {
									e.preventDefault();
								}
							});
						if($('#userLevel').val() == 2){
							if($('#districtIds').val() != null && $('#districtIds').val() != ''){
							$.ajax(
									{
										url : "getDistrictListForMultiLocation.htm?districtids="
												+$('#districtIds').val(),
										type : "POST",
										contentType : "application/json",
										success:function(data, status, xhr) {
										assignDatatoDistrictForMultiLocation(xhr.responseText)
							}
									});
						}
						}
					

					if ($('#userLevel').val() == 1) {
						$.ajax(
								{
									url : "getDistrictList.htm?sid="
											+ $('#userLevelFk').val(),
									type : "POST",
									contentType : "application/json",
									success:function(data, status, xhr) {
							assignDatatoDistrict(xhr.responseText)
						}
								});
					} else if ($('#userLevel').val() == 2) {
						
						$.ajax(
								{
									url : "getZoneList.htm?dId="
											+ $('#userLevelFk').val(),
									type : "POST",
									contentType : "application/json",
									success:function(data, status, xhr) {
							assignDatatoZone(xhr.responseText)
						}
								});
					} else if ($('#userLevel').val() == 3) {
						$.ajax(
								{
									url : "getCircleList.htm?zId="
											+ $('#userLevelFk').val(),
									type : "POST",
									contentType : "application/json",
									success:function(data, status, xhr) {
							assignDatatoCircle(xhr.responseText)
						}
								});
					} else if ($('#userLevel').val() == 4) {
						$.ajax(
								{
									url : "getDivisionList.htm?cId="
											+ $('#userLevelFk').val(),
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
						var dId = $('#districtDropDown').val();
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
	$("#stateDropDown").append("<option value='0'>Select State</option>");
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
	
	$("#zoneDropDown").append(
	"<option value='0' selected='selected'>Select Zone</option>");
$("#circleDropDown").append(
	"<option value='0' selected='selected'>Select Circle</option>");
$("#locationDropDown").append(
	"<option value='0' selected='selected'>Select Division</option>");

}

function assignDatatoDistrictForMultiLocation(data) {
	d = $.parseJSON(data);
	/*$("#districtDropDown").append(
			"<option value='0' selected='selected'>All districts</option>");*/
	$.each(d, function(i, item) {
		if($('#districtDropDown').val() != item['primaryId']){
		$("#districtDropDown").append(
				"<option value='" + item['primaryId'] + "'>"
						+ item['districtName'] + "</option>")
		}
	});
	$("#zoneDropDown").append(
			"<option value='0' selected='selected'>Select Zone</option>");
	$("#circleDropDown").append(
			"<option value='0' selected='selected'>Select Circle</option>");
	$("#locationDropDown").append(
			"<option value='0' selected='selected'>Select Division</option>");
}

function assignDatatoZone(data) {
	d = $.parseJSON(data);
	
	$("#zoneDropDown").append("<option value='0'>Select Zone</option>");
	$.each(d, function(i, item) {
		$("#zoneDropDown").append(
				"<option value='" + item['pk_id'] + "'>" + item['zoneName']
						+ "</option>")
	});
	$("#circleDropDown").append(
	"<option value='0' selected='selected'>Select Circle</option>");
$("#locationDropDown").append(
	"<option value='0' selected='selected'>Select Division</option>");
}

function assignDatatoCircle(data) {
	d = $.parseJSON(data);
	$("#circleDropDown").append("<option value='0'>Select Circle</option>");
	$.each(d, function(i, item) {
		$("#circleDropDown").append(
				"<option value='" + item['pk_id'] + "'>" + item['circleName']
						+ "</option>")
	});
	$("#locationDropDown").append(
	"<option value='0' selected='selected'>Select Division</option>");

}

function assignDatatoLocation(data) {
	d = $.parseJSON(data);
	$("#locationDropDown").append("<option value='0'>Select Division</option>");
	$.each(d, function(i, item) {
		$("#locationDropDown").append(
				"<option value='" + item['divisionMasterId'] + "'>"
						+ item['divisionName'] + "</option>")
	});
}
function validation() {
	$('#vehicleNumberErr').text("");
	$('#districtIdErr').text("");
	$('#descriptionErr').text("");
	var vehicleNumber = $("#vehicleNumber").val();
	if (vehicleNumber == "") {
		document.getElementById("vehicleNumberErr").innerHTML = "Please enter vehicle number";
		return false;
	} 
	
	var districtId = $("#districtDropDown").val();
	 if(districtId == "0"){
		 document.getElementById("districtIdErr").innerHTML = "Please select district"; 
		 return false; 
	  }
	 var description = $("#description").val();
		if (description == "") {
			document.getElementById("descriptionErr").innerHTML = "Please enter description";
			return false;
		} 
		if(description.length>255){
			document.getElementById("descriptionErr").innerHTML = "Description should not be greater than 255 characters";
			return false;
		}
}