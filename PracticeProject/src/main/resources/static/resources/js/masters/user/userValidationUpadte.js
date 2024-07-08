function goBack() {
	location.href = "UserMasterHandler.htm?${cipherUtils.encrypt(pageContext.request,'Action=LIST')}";
}

var locationMoveFlagIdValue;
var enteredMailId;
var enteredMobileNO;
$(document)
		.ready(
				function() {
					enteredMailId = $('#emailAddressId').val();
					enteredMobileNO = $('#mobileNumberId').val();
					$("#primaryLocationShowID").hide();
					$("#UserLevelShow").hide();
					$("#currentLocation").show();

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
					var userLevel = $('#userLevel').val();
					for (var i = 2; i <= userLevel; i++) {
						$('.enabledisable' + i).prop('disabled', 'true');
					}

					$('#chloc')
							.click(
									function() {
										locationMoveFlagIdValue = $(
												'#locationMoveFlagId').val();
										if (locationMoveFlagIdValue == 'true') {
											if (($('#districtDropDown').val().length > 1)
													|| ($('#zoneDropDown')
															.val().length > 1)
													|| ($('#circleDropDown')
															.val().length > 1)
													|| ($('#locationDropDown')
															.val().length > 1)) {
												$("#primaryLocationShowID")
														.show();
											}
											$('#chlocInternal').text(
													"Current Location");
											$('#locationMoveFlagId').val(false);
											$("#UserLevelShow").show();
										} else {
											$("#primaryLocationShowID").hide();
											$('#chlocInternal').text(
													"Change Location");
											$('#locationMoveFlagId').val(true);
											$("#UserLevelShow").hide();
											$("#currentLocation").show();
										}
									});

				/*	$('#emailAddressId')
							.change(
									function() {

										var emailAdd = $('#emailAddressId')
												.val();
										if (emailAdd == enteredMailId) {
											document
													.getElementById("emailAddresslastNameError").innerHTML = "";
										} else {
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
																			.val(
																					"");
																	document
																			.getElementById("emailAddresslastNameError").innerHTML = "This email id already exists";
																} else {
																	document
																			.getElementById("emailAddresslastNameError").innerHTML = "";
																}
															}
															})
													;
										}
									})*/

					/*$('#mobileNumberId')
							.change(
									function() {
										var mobileNO = $('#mobileNumberId')
												.val();

										if (mobileNO != "") {
											if (mobileNO == enteredMobileNO) {
												document
														.getElementById("mobileNumberError").innerHTML = "";
											} else {
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
																				.val(
																						"");
																		document
																				.getElementById("mobileNumberError").innerHTML = "Mobile Number already exists";
																	} else {
																		document
																				.getElementById("mobileNumberError").innerHTML = "";
																	}
																}
																})
														;
											}
										} else {
											document
													.getElementById("mobileNumberError").innerHTML = "Please enter 10 digit mobile number";
										}
									})*/

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
					});

					$('#districtDropDown')
							.change(
									function() {
										var dId = null;
										var dIdt = $('#districtDropDown').val();

										$('#zoneDropDown').text("");
										$('#circleDropDown').text("");
										$('#locationDropDown').text("");
										if (dIdt != null) {

											var dId = $('#districtDropDown')
													.val().toString();
											var dIdSplit = dId.split(',');
											var dlength = dIdSplit.length;
											if (dlength >= 2) {
												for (var j = 0; j < dIdSplit.length; j++) {

													if (dIdSplit[j] == '0') {
														dlength = dlength - 1;
														$(
																'#districtDropDown option[value='
																		+ dIdSplit[j]
																		+ ']')
																.remove();

														$(
																"#districtDropDown option")
																.eq(0)
																.before(
																		$(
																				"<option></option>")
																				.val(
																						'0')
																				.text(
																						"All districts"));

													}

												}

											}

											if (dlength >= 2) {
												$("#primaryLocationShowID")
														.show();

												$("#primaryLocationId")
														.text("");
												for (var j = 0; j < dIdSplit.length; j++) {

													$("#primaryLocationId")
															.append(
																	"<option value='"
																			+ dIdSplit[j]
																			+ "' selected='selected'>"
																			+ $(
																					'#districtDropDown option[value='
																							+ dIdSplit[j]
																							+ ']')
																					.text()
																			+ "</option>");

												}

												for (var i = 3; i <= 5; i++) {
													$('.enabledisable' + i)
															.prop('disabled',
																	'true');
												}
											} else {
												$("#primaryLocationShowID")
														.hide();
												$("#primaryLocationId")
														.text("");
												// $("#multiLocationSelectionId")
												// .hide();
												for (var i = 3; i <= 5; i++) {
													$('.enabledisable' + i)
															.prop('disabled',
																	false);
												}
											}

											$
													.ajax(
															{
																url : "getZoneList.htm?dId="
																		+ dId,
																type : "POST",
																contentType : "application/json",
																success:function(data,
																	status, xhr) {
																assignDatatoZone(xhr.responseText)
															}	
															});
													

										} else {
											$("#primaryLocationShowID").hide();
											$("#primaryLocationId").text("");
											$(
													'#districtDropDown option[value=0]')
													.remove();
											$("#districtDropDown")
													.append(
															"<option value='0' selected='selected'>All districts</option>");

											$("#zoneDropDown")
													.append(
															"<option value='0' selected='selected'>All zones</option>");
											$("#circleDropDown")
													.append(
															"<option value='0' selected='selected'>All circles</option>");
											$("#locationDropDown")
													.append(
															"<option value='0' selected='selected'>All divisions</option>");
										}

									})

					// $('#districtDropDown').change(function() {
					// var dId = $('#districtDropDown').val()
					// $('#zoneDropDown').text("");
					// $('#circleDropDown').text("");
					// $('#locationDropDown').text("");
					// $.ajax({
					// url : "getZoneList.htm?dId=" + dId,
					// type : "POST",
					// contentType : "application/json"
					// }).success(function(data, status, xhr) {
					// assignDatatoZone(xhr.responseText)
					// });
					// })

					$('#zoneDropDown')
							.change(
									function() {
										var zId = null;
										var zIdt = $('#zoneDropDown').val();
										$('#circleDropDown').text("");
										$('#locationDropDown').text("");
										if (zIdt != null) {
											zId = $('#zoneDropDown').val()
													.toString();
											var zIdSplit = zId.split(',');

											var zlength = zIdSplit.length;

											if (zlength >= 2) {
												for (var j = 0; j < zIdSplit.length; j++) {
													if (zIdSplit[j] == '0') {
														zlength = zlength - 1;
														$(
																'#zoneDropDown option[value='
																		+ zIdSplit[j]
																		+ ']')
																.remove();

														$(
																"#zoneDropDown option")
																.eq(0)
																.before(
																		$(
																				"<option></option>")
																				.val(
																						'0')
																				.text(
																						"All zones"));

													}
												}
											}

											if (zlength >= 2) {
												$("#primaryLocationShowID")
														.show();
												// $("#multiLocationSelectionId")
												// .show();

												$("#primaryLocationId")
														.text("");
												for (var j = 0; j < zIdSplit.length; j++) {

													$("#primaryLocationId")
															.append(
																	"<option value='"
																			+ zIdSplit[j]
																			+ "' selected='selected'>"
																			+ $(
																					'#zoneDropDown option[value='
																							+ zIdSplit[j]
																							+ ']')
																					.text()
																			+ "</option>");

												}

												for (var i = 4; i <= 5; i++) {
													$('.enabledisable' + i)
															.prop('disabled',
																	'true');
												}
											} else {
												$("#primaryLocationShowID")
														.hide();
												$("#primaryLocationId")
														.text("");
												// $("#multiLocationSelectionId")
												// .hide();
												for (var i = 4; i <= 5; i++) {
													$('.enabledisable' + i)
															.prop('disabled',
																	false);
												}
											}

											$
													.ajax(
															{
																url : "getCircleList.htm?zId="
																		+ zId,
																type : "POST",
																contentType : "application/json",
																success:
															function(data,
																	status, xhr) {
																assignDatatoCircle(xhr.responseText)
															}
															});

										} else {
											$("#primaryLocationShowID").hide();
											$("#primaryLocationId").text("");
											$('#zoneDropDown option[value=0]')
													.remove();

											$("#zoneDropDown")
													.append(
															"<option value='0' selected='selected'>All zones</option>");

											$("#circleDropDown")
													.append(
															"<option value='0' selected='selected'>All circles</option>");
											$("#locationDropDown")
													.append(
															"<option value='0' selected='selected'>All divisions</option>");
										}

									})

					// $('#zoneDropDown').change(function() {
					// var zId = $('#zoneDropDown').val()
					// $('#circleDropDown').text("");
					// $('#locationDropDown').text("");
					// $.ajax({
					// url : "getCircleList.htm?zId=" + zId,
					// type : "POST",
					// contentType : "application/json"
					// }).success(function(data, status, xhr) {
					// assignDatatoCircle(xhr.responseText)
					// });
					// })

					$('#circleDropDown')
							.change(
									function() {
										$('#locationDropDown').text("").val();
										var cId = null;
										var cIdt = $('#circleDropDown').val();
										if (cIdt != null) {
											cId = $('#circleDropDown').val()
													.toString();
											var cIdSplit = cId.split(',');

											var clength = cIdSplit.length;

											if (clength >= 2) {
												for (var j = 0; j < cIdSplit.length; j++) {
													if (cIdSplit[j] == '0') {
														clength = clength - 1;
														$(
																'#circleDropDown option[value='
																		+ cIdSplit[j]
																		+ ']')
																.remove();

														$(
																"#circleDropDown option")
																.eq(0)
																.before(
																		$(
																				"<option></option>")
																				.val(
																						'0')
																				.text(
																						"All circles"));

													}
												}
											}
											if (clength >= 2) {
												$("#primaryLocationShowID")
														.show();
												// $("#multiLocationSelectionId")
												// .show();

												$("#primaryLocationId")
														.text("");
												for (var j = 0; j < cIdSplit.length; j++) {

													$("#primaryLocationId")
															.append(
																	"<option value='"
																			+ cIdSplit[j]
																			+ "' selected='selected'>"
																			+ $(
																					'#circleDropDown option[value='
																							+ cIdSplit[j]
																							+ ']')
																					.text()
																			+ "</option>");

												}

												for (var i = 5; i <= 5; i++) {
													$('.enabledisable' + i)
															.prop('disabled',
																	'true');
												}
											} else {
												$("#primaryLocationShowID")
														.hide();
												$("#primaryLocationId")
														.text("");
												// $("#multiLocationSelectionId")
												// .hide();
												for (var i = 5; i <= 5; i++) {
													$('.enabledisable' + i)
															.prop('disabled',
																	false);
												}
											}

											$
													.ajax(
															{
																url : "getDivisionList.htm?cId="
																		+ cId,
																type : "POST",
																contentType : "application/json",
																success:function(data,
																	status, xhr) {
																assignDatatoLocation(xhr.responseText)
															}
															});

										} else {
											$("#primaryLocationShowID").hide();
											$("#primaryLocationId").text("");
											$('#circleDropDown option[value=0]')
													.remove();

											$("#circleDropDown")
													.append(
															"<option value='0' selected='selected'>All circles</option>");
											$("#locationDropDown")
													.append(
															"<option value='0' selected='selected'>All divisions</option>");
										}

									})

					$('#locationDropDown')
							.change(
									function() {
										// setOffiecrDropDowntoAllOfficer();
										var DivId = null;
										DivId = $('#locationDropDown').val();
										if (DivId != null) {
											diId = $('#locationDropDown').val()
													.toString();
											var dicIdSplit = diId.split(',');

											var divlength = dicIdSplit.length;

											if (divlength >= 2) {
												for (var j = 0; j < divlength; j++) {
													if (dicIdSplit[j] == '0') {
														divlength = divlength - 1;
														$(
																'#locationDropDown option[value='
																		+ dicIdSplit[j]
																		+ ']')
																.remove();

														$(
																"#locationDropDown option")
																.eq(0)
																.before(
																		$(
																				"<option></option>")
																				.val(
																						'0')
																				.text(
																						"All divisions"));

													}
												}
											}

											if (divlength >= 2) {
												$("#primaryLocationShowID")
														.show();
												// $("#multiLocationSelectionId")
												// .show();

												$("#primaryLocationId")
														.text("");
												for (var j = 0; j < dicIdSplit.length; j++) {

													$("#primaryLocationId")
															.append(
																	"<option value='"
																			+ dicIdSplit[j]
																			+ "' selected='selected'>"
																			+ $(
																					'#locationDropDown option[value='
																							+ dicIdSplit[j]
																							+ ']')
																					.text()
																			+ "</option>");

												}

											} else {
												$("#primaryLocationShowID")
														.hide();
												$("#primaryLocationId")
														.text("");
												// $("#multiLocationSelectionId")
												// .hide();
											}

										} else {
											$("#primaryLocationShowID").hide();
											$("#primaryLocationId").text("");
											$(
													'#locationDropDown option[value=0]')
													.remove();

											$("#locationDropDown")
													.append(
															"<option value='0' selected='selected'>All divisions</option>");

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
																success:													function(data,
																	status, xhr) {
																assignDatatoZone(xhr.responseText)
															}
															});

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
															});
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
															});
													
										}
									})

					// $('#circleDropDown').change(function() {
					// var cId = $('#circleDropDown').val()
					// $('#locationDropDown').text("");
					// $.ajax({
					// url : "getDivisionList.htm?cId=" + cId,
					// type : "POST",
					// contentType : "application/json"
					// }).success(function(data, status, xhr) {
					// assignDatatoLocation(xhr.responseText)
					// });
					// })

					$('#updatecancelClick').click(function(e) {

						e.preventDefault();
					});
					$('#updateOkClick').click(function(e) {
						for (var i = 2; i <= 5; i++) {
							$('.enabledisable' + i).prop('disabled', false);
						}
						document.Myform.submit();
					});

					$('#save')
							.click(
									function(e) {
										var res = true;
										res = updateValidations();

										if (res) {
											if (locationMoveFlagIdValue == 'true') {
												var isSelectLevelUser = false;
												var comb, district = "", division = "", zone = "", circle = "";
												var state = $(
														'select[name="stateId"] option:selected')
														.text().trim();
												comb = state;

												if ($('#districtDropDown')
														.val().toString()
														.split(',').length > 1) {
													var disSplit = $(
															'#districtDropDown')
															.val().toString()
															.split(',');
													for (var i = 0; i < disSplit.length; i++) {

														if (i == 0) {
															district = $(
																	'#districtDropDown option[value='
																			+ disSplit[i]
																			+ ']')
																	.text();
														} else {
															district = district
																	+ ","
																	+ $(
																			'#districtDropDown option[value='
																					+ disSplit[i]
																					+ ']')
																			.text();
														}

													}
													isSelectLevelUser = true;
													comb = comb + " / "
															+ district;
												} else {
													if ($(
															'select[name="districtIdMS"] option:selected')
															.val() != 0) {
														district = $(
																'select[name="districtIdMS"] option:selected')
																.text();

														comb = comb + " / "
																+ district;
													}
												}

												if (!isSelectLevelUser) {
													if ($('#zoneDropDown')
															.val().toString()
															.split(',').length > 1) {
														var zoneSplit = $(
																'#zoneDropDown')
																.val()
																.toString()
																.split(',');
														for (var i = 0; i < zoneSplit.length; i++) {

															if (i == 0) {
																zone = $(
																		'#zoneDropDown option[value='
																				+ zoneSplit[i]
																				+ ']')
																		.text();
															} else {

																zone = zone
																		+ ","
																		+ $(
																				'#zoneDropDown option[value='
																						+ zoneSplit[i]
																						+ ']')
																				.text();
															}
														}
														isSelectLevelUser = true;
														comb = comb + " / "
																+ zone;
													} else {
														if ($(
																'select[name="zoneIdMS"] option:selected')
																.val() != 0) {
															zone = $(
																	'select[name="zoneIdMS"] option:selected')
																	.text();

															comb = comb + " / "
																	+ zone;
														}
													}
												}

												if (!isSelectLevelUser) {
													if ($('#circleDropDown')
															.val().toString()
															.split(',').length > 1) {
														var circleSplit = $(
																'#circleDropDown')
																.val()
																.toString()
																.split(',');
														for (var i = 0; i < circleSplit.length; i++) {

															if (i == 0) {
																circle = $(
																		'#circleDropDown option[value='
																				+ circleSplit[i]
																				+ ']')
																		.text();
															} else {
																circle = circle
																		+ ","
																		+ $(
																				'#circleDropDown option[value='
																						+ circleSplit[i]
																						+ ']')
																				.text();
															}
														}
														isSelectLevelUser = true;
														comb = comb + " / "
																+ circle;
													} else {
														if ($(
																'select[name="circleIdMS"] option:selected')
																.val() != 0) {
															circle = $(
																	'select[name="circleIdMS"] option:selected')
																	.text();

															comb = comb + " / "
																	+ circle;
														}
													}

												}

												if (!isSelectLevelUser) {
													if ($('#locationDropDown')
															.val().toString()
															.split(',').length > 1) {
														var divisionSplit = $(
																'#locationDropDown')
																.val()
																.toString()
																.split(',');
														for (var i = 0; i < divisionSplit.length; i++) {

															if (i == 0) {
																division = $(
																		'#locationDropDown option[value='
																				+ divisionSplit[i]
																				+ ']')
																		.text();
															} else {
																division = division
																		+ ","
																		+ $(
																				'#locationDropDown option[value='
																						+ divisionSplit[i]
																						+ ']')
																				.text();
															}
														}
														isSelectLevelUser = true;
														comb = comb + " / "
																+ division;
													} else {
														if ($(
																'select[name="divisionIdMS"] option:selected')
																.val() != 0) {
															division = $(
																	'select[name="divisionIdMS"] option:selected')
																	.text();

															comb = comb + " / "
																	+ division;
														}
													}

												}

												$("#updateUserModelId").modal();
												$("#updateUserModelDisplayId")
														.text(
																"Do you want to transfer officer here ? "
																		+ comb);
												e.preventDefault();

											} else {
												if (!res) {
													e.preventDefault();
												}

											}

										} else {
											for (var i = 2; i <= 5; i++) {
												$('.enabledisable' + i).prop(
														'disabled', false);
											}
											e.preventDefault();
										}
									});

					$('#locManage').click(function() {
						var cId = $('#usrLocIds').val()
						$.ajax({
							url : "getLocationsbyId.htm?userLocIds=" + cId,
							type : "POST",
							contentType : "application/json",
							success:function(data, status, xhr) {
							assignLocationData(xhr.responseText)
						}
						});
					})

				});

function updateValidations() {
	var ress = true;

	$('#firstNameError').text("");
	$('#lastNameError').text("");
	$('#mobileNumberError').text("");
	$('#emailAddresslastNameError').text("");
	$('#passwordError').text("");
	$('#stateIdError').text("");
	$('#profileIdError').text("");
	$('#addLocButtonError').text("");

	var profileid = $('#profileIds').val();

	var str = /^[a-zA-Z ]+$/;
	var num = /^[0-9]*$/;
	var mail = /^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$/;
	var pass = /^(([a-zA-Z0-9]).{6,15})*$/;

	var firstName = document.Myform.firstName.value;
	if (firstName == "" ) {
		document.getElementById("firstNameError").innerHTML = "Please enter first name";
		ress = false;
		return false;
	} else {
		if (!(firstName.match(str)) || firstName.length >30) {
			$('#firstNameError').text("Please enter valid First name");
			ress = false;
			return false;
		}
	}

	var lastName = document.Myform.lastName.value;
	if (lastName == "" ) {
		document.getElementById("lastNameError").innerHTML = "Please enter last name";
		ress = false;
		return false;
	} else {
		if (!(lastName.match(str)) || lastName.length >50) {
			$('#lastNameError').text("Please enter valid last name");
			ress = false;
			return false;
		}
	}

	var mobileNumber = document.Myform.mobileNumber.value;
	if (mobileNumber.length != 10) {

		document.getElementById("mobileNumberError").innerHTML = "Please enter 10 digit mobile number";
		return false;

	}
	if (!(mobileNumber.match(num))) {
		document.getElementById("mobileNumberError").innerHTML = "Invalid mobile number";
		return false;
	}

	/*
	 * var stateId = document.Myform.stateId.value; if (stateId == "0") {
	 * document.getElementById("stateIdError").innerHTML = "Please select
	 * state"; return false; }
	 */

	if (profileid == null || profileid == "") {
		document.getElementById("profileIdError").innerHTML = "Please select user profile";
		return false;
	}

	var Email = document.Myform.emailAddress.value;
	/*if (Email == "") {
		document.getElementById("emailAddresslastNameError").innerHTML = "Please enter email id";
		return false;
	}*/
	if (Email != "" && !(Email.match(mail))) {
		document.getElementById("emailAddresslastNameError").innerHTML = "Please enter valid email address";
		return false;
	}
	var count = $('#selLoc tr').length;
	if (count == 1) {
		document.getElementById("addLocButtonError").innerHTML = "Please select atleast one location.";
		ress = false;
		return false;
	}
	return true;
}

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
	$("#districtDropDown").append(
			"<option value='0' selected='selected'>All districts</option>");
	$.each(d, function(i, item) {
		$("#districtDropDown").append(
				"<option value='" + item['primaryId'] + "'>"
						+ item['districtName'] + "</option>")
	});
	$("#zoneDropDown").append(
			"<option value='0' selected='selected'>All zones</option>");
	$("#circleDropDown").append(
			"<option value='0' selected='selected'>All circles</option>");
	$("#locationDropDown").append(
			"<option value='0' selected='selected'>All divisions</option>");
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
			"<option value='0' selected='selected'>All zones</option>");
	$("#circleDropDown").append(
			"<option value='0' selected='selected'>All circles</option>");
	$("#locationDropDown").append(
			"<option value='0' selected='selected'>All divisions</option>");
}

function assignDatatoZone(data) {
	d = $.parseJSON(data);
	var str = "";
	$("#zoneDropDown").append(
			"<option value='0' selected='selected'>All zones</option>");
	$.each(d, function(i, item) {
		$("#zoneDropDown").append(
				"<option value='" + item['pk_id'] + "'>" + item['zoneName']
						+ "</option>")
	});
	$("#circleDropDown").append(
			"<option value='0' selected='selected'>All circles</option>");
	$("#locationDropDown").append(
			"<option value='0' selected='selected'>All divisions</option>");
}

function assignDatatoCircle(data) {
	d = $.parseJSON(data);
	$("#circleDropDown").append(
			"<option value='0' selected='selected'>All circles</option>");
	$.each(d, function(i, item) {
		$("#circleDropDown").append(
				"<option value='" + item['pk_id'] + "'>" + item['circleName']
						+ "</option>")
	});
	$("#locationDropDown").append(
			"<option value='0' selected='selected'>All divisions</option>");
}

function assignDatatoLocation(data) {
	d = $.parseJSON(data);
	$("#locationDropDown").append(
			"<option value='0' selected='selected'>All divisions</option>");
	$.each(d, function(i, item) {
		$("#locationDropDown").append(
				"<option value='" + item['divisionMasterId'] + "'>"
						+ item['divisionName'] + "</option>")
	});
}
function assignLocationData(data) {

	d = $.parseJSON(data);

	var tableStr = "";
	$("#selLoc").text("");

	$.each(d, function(i, item) {
		tableStr += item
	});
	$("#selLoc").append(tableStr);
}