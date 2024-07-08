$(document).ready(function() {
// 	$(".selectpicker").multiselect();
						$(".progControlSelect2").select2({
						placeholder : "All"
						});
	
	var oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
	
	  $("#startDate").datepicker({
	        changeMonth: true,
	        changeYear: true,
	        dateFormat: 'yy-mm-dd',
	        minDate: '01-01-2016',
	        maxDate:'0'
	    });
	  
	  $("#endDate").datepicker({
	        changeMonth: true,
	        changeYear: true,
	        dateFormat: 'yy-mm-dd',
	        minDate: '01-01-2016',
	        maxDate: oneDayAgo
	    });
	  
	  $('#districtDropdown').change(function(){
			var did = $('#districtDropdown').val();
			if(did == ""){
				$("#districtDropdown option[value = '0']").remove();
				$("#districtDropdown").append("<option value = '0' selected = 'selected'>All Districts</option>");
			}
			if(did != "" && did != "0"){
				$("#districtDropdown option[value = '0']").remove();
				$("#districtDropdown").append("<option value = '0'>All Districts</option>");
			}
			
			$("#zoneDropdown option[value = '0']").remove();
			$("#zoneDropdown").append("<option value = '0' selected = 'selected'>All Zones</option>");
			alert(did);
			$.ajax({
				url: "zoneDetails.htm?districtid=" + did,
				type : "POST",
				contentType : "application/json",
				success:function(data, status, xhr) {
					assignDataToZone(xhr.responseText);
				}		
			});
			
			$("#officerDropdown").text("<option value = '0' selected = 'selected'>All officers</option>");
			
			$.ajax({
				url: "officerList.htm?districtid=" + did,
				type : "POST",
				contentType : "application/json",
				success:function(data, status, xhr) {
					assignOfficerData(xhr.responseText);
				}		
			});
			
		});
	  
	  
	  $('#zoneDropdown').change(function(){
			var zid = $('#zoneDropdown').val();
			var did = $("#districtDropdown").val();
			
			if(zid == ""){
				$("#zoneDropdown option[value = '0']").remove();
				$("#zoneDropdown").append("<option value = '0' selected = 'selected'>All Zones</option>");
				zid = 0;
				did = $('#districtDropdown').val();
			}
			if(zid != "" && zid != "0"){
				$("#zoneDropdown option[value = '0']").remove();
				$("#zoneDropdown").append("<option value = '0'>All Zones</option>");
				zid = $("#zoneDropdown").val();
			}
			
			$("#circleDropdown").text("<option value = '0' selected = 'selected'>All Circles</option>");
			
			$.ajax({
					url : "circleDetails.htm?zoneid=" + zid,
					type : "POST",
					contentType : "application/json",
					success:function(data, status, xhr) {
					assignDatatoCircle(xhr.responseText)
				}
			});
			
			$("#officerDropdown").text("<option value = '0' selected = 'selected'>All officers</option>");
			
			$.ajax({
				url: "officerList.htm?zoneid=" + zid + "&districtid="+ did,
				type : "POST",
				contentType : "application/json",
				success:function(data, status, xhr) {
					assignOfficerData(xhr.responseText);
				}		
			});
			
		});
	  
	  $('#circleDropdown').change(function(){
			
			var cid = $('#circleDropdown').val();
			var zid = $("#zoneDropdown").val();
			
			if(cid == ""){
				$("#circleDropdown option[value = '0']").remove();
				$("#circleDropdown").append("<option value = '0' selected = 'selected'>All Circles</option>");
				cid = 0;
				zid = $("#zoneDropdown").val();
			}
			if(cid != "" && cid != "0"){
				$("#circleDropdown option[value = '0']").remove();
				$("#circleDropdown").append("<option value = '0'>All Circles</option>");
				cid = $("#circleDropdown").val();
			}
			
			$("#divisionDropdown").text("<option value = '0' selected = 'selected'>All Divisions</option>");
			
			$.ajax({
				url : "divisionDetails.htm?circleid=" + cid,
				type : "POST",
				contentType : "application/json",
				success:function(data, status, xhr) {
				assignDataToDivision(xhr.responseText)
			}
			});
			
			$("#officerDropdown").text("<option value = '0' selected = 'selected'>All officers</option>");
			
			$.ajax({
				url: "officerList.htm?circleid=" + cid + "&zoneid=" + zid,
				type : "POST",
				contentType : "application/json",
				success:function(data, status, xhr) {
					assignOfficerData(xhr.responseText);
				}		
			});
		});
	  
	  $("#divisionDropdown").change(function(){
		  var divid = $('#divisionDropdown').val();
		  var cid = $("#circleDropdown").val();
		  
		  if(divid == ""){
				$("#divisionDropdown option[value = '0']").remove();
				$("#divisionDropdown").append("<option value = '0' selected = 'selected'>All Divisions</option>");
				cid = $("#circleDropdown").val();
			}
			if(divid != "" && divid != "0"){
				$("#divisionDropdown option[value = '0']").remove();
				$("#divisionDropdown").append("<option value = '0'>All Divisions</option>");
				divid = $("#divisionDropdown").val();
			}
			
			$.ajax({
				url: "officerList.htm?divisionid=" + divid + "&circleid=" + cid,
				type : "POST",
				contentType : "application/json",
				success:function(data, status, xhr) {
					assignOfficerData(xhr.responseText);
				}		
			});
			
	  });
	  
	  $("#sectionDropdown").change(function(){
		  var section = $("#sectionDropdown").val();
		  
		  if(section == ""){
			  $("#sectionDropdown").append("<option value = '0' selected = 'selected'>All Sections</option>");
		  }
		  
		  if(section != "0" && section != ""){
			  $("#sectionDropdown option[value = '0']").remove();
			  $("#sectionDropdown").append("<option value = '0'>All Sections</option>");
				section = $("#sectionDropdown").val();
		  }
	  });
	  
	  $("#vehicleDropdown").change(function(){
		  var vehicle = $("#vehicleDropdown").val();
		  
		  if(vehicle == ""){
			  $("#vehicleDropdown").append("<option value = '0' selected = 'selected'>All Types</option>");
		  }
		  
		  if(vehicle != "0" && vehicle != ""){
			  $("#vehicleDropdown option[value = '0']").remove();
			  $("#vehicleDropdown").append("<option value = '0'>All Types</option>");
			  vehicle = $("#vehicleDropdown").val();
		  }
	  });
	  
	  $("#paymentStatus").change(function(){
		  var payment = $("#paymentStatus").val();
		  
		  if(payment == ""){
			  $("#paymentStatus option[value = '0']").remove();
			  $("#paymentStatus").append("<option value = '0' selected = 'selected'>All</option>");
		  }
		  
		  if(payment != "0" && payment != ""){
			  $("#paymentStatus option[value = '0']").remove();
			  $("#paymentStatus").append("<option value = '0'>All</option>");
			  payment = $("#paymentStatus").val();
		  }
	  });
	  
	  $("#evidenceType").change(function(){
		  var evidence = $("#evidenceType").val();
		  
		  if(evidence == ""){
			  $("#evidenceType option[value = '0']").remove();
			  $("#evidenceType").append("<option value = '0' selected = 'selected'>All</option>");
		  }
		  
		  if(evidence != "0" && evidence != ""){
			  $("#evidenceType option[value = '0']").remove();
			  $("#evidenceType").append("<option value = '0'>All</option>");
			  evidence = $("#evidenceType").val();
		  }
	  })
	  
	  
});

function assignDataToZone(data){
	d = $.parseJSON(data);
	$("#zoneDropdown").append("<option value='0'>All Zones</option>");
	$.each(d, function(i, item) {
		$("#zoneDropdown").append(	"<option value='" + item['pk_id'] + "'>" + item['zoneName']	+ "</option>");	
		
	});
}

function assignDatatoCircle(data) {
	d = $.parseJSON(data);
	
	$("#circleDropdown").append("<option value='0' selected = 'selected'>All Circles</option>");
	$.each(d, function(i, item) {
		$("#circleDropdown").append(
				"<option value='" + item['pk_id'] + "'>" + item['circleName']
						+ "</option>")
	});
}

function assignDataToDivision(data) {
	d = $.parseJSON(data);
	
	$("#divisionDropdown").text("<option value='0' selected = 'selected'>All Divisions</option>");
	
	$.each(d, function(i, item) {
		$("#divisionDropdown").append(
				"<option value='" + item['divisionMasterId'] + "'>" + item['divisionName']
						+ "</option>")
	});

}

function assignOfficerData(data){
	d = $.parseJSON(data);
	alert(data);
	$("#officerDropdown").append("<option value = '0' selected = 'selected'>All Officers</option>");
	$.each(d, function(i, item){
		$("#officerDropdown").append(
			"<option value='" + item['policeuserMasterId'] + "'>" + item['firstName'] + " " + item['lastName'] + "</option>")	
	});
}


function primaryRadio(){
	if(document.getElementById('history').checked){
		location.href = "reportHandler.htm?primaryRadio=history";
	}
	if(document.getElementById('today').checked){
		location.href = "reportHandler.htm?primaryRadio=today";
	}
}

function secondaryRadio(){
	if(document.getElementById('history').checked){
		if(document.getElementById('detailedReport').checked){
		//	alert("Detailed");
			location.href = "reportHandler.htm?primaryRadio=history&&secondaryRadio=detailed";
		}
		if(document.getElementById('summaryReport').checked){
		//	alert("Summary");
			location.href = "reportHandler.htm?primaryRadio=history&&secondaryRadio=summary";
		}
		if(document.getElementById('graphReport').checked){
		//	alert("Graph");
			location.href = "reportHandler.htm?primaryRadio=history&&secondaryRadio=graph";
		}
	}
	if(document.getElementById('today').checked){
		if(document.getElementById('detailedReport').checked){
			location.href = "reportHandler.htm?primaryRadio=today&&secondaryRadio=detailed";
		}
		if(document.getElementById('summaryReport').checked){
			location.href = "reportHandler.htm?primaryRadio=today&&secondaryRadio=summary";
		}
		if(document.getElementById('graphReport').checked){
			location.href = "reportHandler.htm?primaryRadio=today&&secondaryRadio=graph";
		}
	}
}

function checkbox(){
		var menueIds = new Array();
		$('#menuBody').find('input[type="checkbox"]').each(function() {
			var checkBoxId = $(this).attr('id');

			if ($("#" + checkBoxId).is(":checked")) {
				menueIds.push(checkBoxId);
			}
		});
		$('#selectedHeadings').val(JSON.stringify(menueIds));
}

function validate(){
	$("#startDateErr").text("");
	$("#endDateErr").text("");
	
	
	
	
	
	var startDate = $("#startDate").val()
	if(startDate == ""){
		$("#startDateErr").text("Enter Start Date");
		return false;
	}
	
	var endDate = $("#endDate").val();
	if(endDate == ""){
		$("#endDateErr").text("Enter End Date");
		return false;
	}
}