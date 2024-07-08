function goBack() {
	location.href = "UserMasterHandler.htm?${cipherUtils.encrypt(pageContext.request,'Action=LIST')}";
}

$(document)
		.ready(
				function() {
					/*$('#sevarthTextId').prop('disabled', true);*/
					$('#ids').prop('disabled', true);

				/*	$('#emailAddressId')
							.change(
									function() {
										var emailAdd = $('#emailAddressId')
												.val()
										$
												.ajax(
														{
															url : "checkEmailIdExist.htm?emailAdd="
																	+ emailAdd,
															type : "POST",
															contentType : "application/json",
															success:
														function(data) {
															if (data) {
																$(
																		'#emailAddressId')
																		.val("");
																document
																		.getElementById("emailAddresslastNameError").innerHTML = "This email id already exists";
															} else {
																document
																		.getElementById("emailAddresslastNameError").innerHTML = "";
															}
															// assignDatatoDistrict(xhr.responseText)
														}
														})
												;

									})*/

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
															success :
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
/*
					$('#mobileNumberId')
							.change(
									function() {
										var mobileNO = $('#mobileNumberId')
												.val();

										$
												.ajax(
														{
															url : "checkMobileNoExist.htm?mobileNO="
																	+ mobileNO,
															type : "POST",
															contentType : "application/json",
															success:
														function(data) {
															if (data) {
																$(
																		'#mobileNumberId')
																		.val("");
																document
																		.getElementById("mobileNumberError").innerHTML = "Mobile number already exists";
															} else {
																document
																		.getElementById("mobileNumberError").innerHTML = "";
															}
															// assignDatatoDistrict(xhr.responseText)
														}
														})
												;
									})
*/
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

					$('#add')
							.click(
									function() {
										if ($('#userLevel').val() == 1) {
											$(districtDropDown).empty();
											$(zoneDropDown).empty();
											$(circleDropDown).empty();
											$(locationDropDown).empty();
											$
													.ajax(
															{
																url : "getDistrictList.htm?sid="
																		+ $(
																				'#userLevelFk')
																				.val(),
																type : "POST",
																contentType : "application/json",
																success:
															function(data,
																	status, xhr) {
																assignDatatoDistrict(xhr.responseText)
															}
															})
													;
										} else if ($('#userLevel').val() == 2) {
											$(zoneDropDown).empty();
											$(circleDropDown).empty();
											$(locationDropDown).empty();
											$
													.ajax(
															{
																url : "getZoneList.htm?dId="
																		+ $(
																				'#userLevelFk')
																				.val(),
																type : "POST",
																contentType : "application/json",
																success:
															function(data,
																	status, xhr) {
																assignDatatoZone(xhr.responseText)
															}
															})
													;
										} else if ($('#userLevel').val() == 3) {
											$(circleDropDown).empty();
											$(locationDropDown).empty();
											$
													.ajax(
															{
																url : "getCircleList.htm?zId="
																		+ $(
																				'#userLevelFk')
																				.val(),
																type : "POST",
																contentType : "application/json",
																success:
															function(data,
																	status, xhr) {
																assignDatatoCircle(xhr.responseText)
															}
															})
													;
										} else if ($('#userLevel').val() == 4) {
											$(locationDropDown).empty();
											$
													.ajax(
															{
																url : "getDivisionList.htm?cId="
																		+ $(
																				'#userLevelFk')
																				.val(),
																type : "POST",
																contentType : "application/json",
																success:
															function(data,
																	status, xhr) {
																assignDatatoLocation(xhr.responseText)
															}
															})
													;
										}
									})

					/*
					 * $('#locManage').click(function() { alert("Ajax"); var cId =
					 * $('#usrLocIds').val() alert(cId);
					 * $('#locationDropDown').text(""); $.ajax({ url :
					 * "getLocationsbyId.htm?userLocIds=" + cId, type : "POST",
					 * contentType : "application/json"
					 * }).success(function(data, status, xhr) {
					 * assignLocationData(xhr.responseText) }); })
					 */
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
	var str = "";
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

/*
 * function assignLocationData(data) { d = $.parseJSON(data); $.each(d,
 * function(i, item) { alert(itm); $("#selLoc").append( "<tr><td>Maharashtra</td>" + "<td>" +
 * $("#districtDropDown").val() + "</td>" + "<td>" +
 * $("#zoneDropDown").val() + "</td>" + "<td>" + $("#circleDropDown").val() + "</td>" + "<td>" +
 * $("#locationDropDown").val() + "</td></tr>"); }); }
 */

function validation() {
	$('#firstNameError').text("");
	$('#lastNameError').text("");
	$('#sevarthIdError').text("");
	$('#mobileNumberError').text("");
	$('#emailAddresslastNameError').text("");
	/*$('#passwordError').text("");*/
	$('#stateIdError').text("");
	$('#profileIdError').text("");
	$('#addLocButtonError').text("");
	$('#captchCodeErr').text("");

	var profileid = $('#profileIds').val();
	
	if ($('#enteredCaptcha').val().trim() == "") {
 		$('#captchCodeErr').text("Please enter Code");
 		return false;
 	}
	
	
	var str = /^[a-zA-Z ]+$/;
	var num = /^[0-9]*$/;
	var mail = /^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$/;
	/*var pass = /^(([a-zA-Z0-9]).{6,15})*$/;*/
	var firstName = document.Myform.firstName.value;
//Cr-No : 2022-1030 Add User: username and last name validation issue added trim() function
	if (firstName.trim() == "") {
		document.getElementById("firstNameError").innerHTML = "Please enter first name";
		return false;
	} else {
	//Cr-No :2022-1030 Add User: username and last name validation issue added trim() function
		if (firstName.trim().length<3 || !(firstName.match(str))) {
			
			$('#firstNameError').text("Please enter valid first name");
			return false;
		}
	}

	var lastName = document.Myform.lastName.value;
	//2022-1030 Add User: username and last name validation issue added trim() function
	
	if (lastName.trim() == "") {
		document.getElementById("lastNameError").innerHTML = "Please enter last name";
		return false;
	} else {
	//Cr-No : 2022-1030 --Add User: username and last name validation issue added trim() function
		if (lastName.trim().length<3 || !(lastName.match(str))) {
			$('#lastNameError').text("Please enter valid last name");
			return false;
		}
	}

	
	 var sevarthId = document.Myform.sevarthId.value;
	//Cr-No : 2022-1030 Add User: username and last name validation issue added trim() function
	 if(sevarthId.trim() == ""){
		 document.getElementById("sevarthIdError").innerHTML = "Please enter sevarth id"; 
		 return false; 	 
	  }else if (sevarthId.trim().length != 11){
		  document.getElementById("sevarthIdError").innerHTML = "Please enter correct sevarth id";
		  return false; 
	  }
	 
	

	var mobileNumber = document.Myform.mobileNumber.value;
		//Cr-No : 2022-1030 Add User: username and last name validation issue added trim() function	
	if (mobileNumber.trim() == "") {
		document.getElementById("mobileNumberError").innerHTML = "Please enter 10 digits mobile number";
		return false;
	} else if (mobileNumber.trim().length != 10) {
		document.getElementById("mobileNumberError").innerHTML = "Please enter 10 digits mobile number";
		return false;
	}
	//Cr-No : 2022-1030 Add User: username and last name validation issue added trim() function
	if (!(mobileNumber.trim().match(num))) {
		document.getElementById("mobileNumberError").innerHTML = "Invalid mobile number";
		return false;
	}

	/*
	 * var stateId = document.Myform.stateId.value; if (stateId == "0") {
	 * document.getElementById("stateIdError").innerHTML = "Please select
	 * state"; return false; }
	 */

	if (profileid == null) {
		document.getElementById("profileIdError").innerHTML = "Please select user profile";
		return false;
	}

	var Email = document.Myform.emailAddress.value;
	/*if (Email == "") {
		document.getElementById("emailAddresslastNameError").innerHTML = "Please enter email id";
		return false;
	}*/
	if (Email.trim() != "" && !(Email.match(mail))) {
		document.getElementById("emailAddresslastNameError").innerHTML = "Please enter valid email address";
		return false;
	}
	/*var password = document.Myform.password.value;
	if (password == "" || password == null) {
		// alert("password is : - "+password);
		document.getElementById("passwordError").innerHTML = "Please enter password";
		return false;
	} else if (!(password.length >= 6)) {
		document.getElementById("passwordError").innerHTML = "Password must be within 6-8 digits";
		return false;
	// Cr-No : 2022-1030 Add User: username and last name validation issue added trim() function
	} else if (!(password.trim().length <= 8)) {
		document.getElementById("passwordError").innerHTML = "Password must be within 6-8 digits";
		return false;
	}*/

	var count = $('#selLoc tr').length;
	if (count == 1) {
		document.getElementById("addLocButtonError").innerHTML = "Please select at least one location.";
		return false;
	}
	//select menu checkbox for CCTV,RPT,TREASURY,ADM
	//Cr-No :2022-1030 --Add User: username and last name validation issue 
	// added validation menu access user should choose atlease on menu for  CCTV,RPT,TREASURY,ADM portals
	 var selectedApps = $('#profileIds').val();
			 if (selectedApps != "null" && selectedApps != "" &&  selectedApps != null ) {
				 const x=$('#profileIds').val();
			    if (x.includes("TREASURY") ||  x.includes("RPT") || x.includes("CCTV") || x.includes("ADM")){
 				var menueIds = new Array();
 					$('#menuBody').find('input[type="checkbox"]').each(function() {
 						var checkBoxId = $(this).attr('id');

 						if ($("#" + checkBoxId).is(":checked")) {
 							menueIds.push(checkBoxId);
 						}
 					});
			
				if(menueIds.length > 0)
				return true	
				$("#profileIdError").html("");
				$("#manageMenuError").html("Please select menu.");
				return false;
	 				} 
				} else {
					$("#manageMenuError").html("");
					$("#profileIdError").html("Please select user profile");
					return false;
				}
	//Cr-No :2022-1030 --Add User: username and last name validation issue 
	// added validation menu access user should choose atlease on menu for  CCTV,RPT,TREASURY,ADM portals
				
}
