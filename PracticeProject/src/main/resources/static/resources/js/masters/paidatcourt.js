
//  CR # 2020-1152  addedd date picker functinality
$(document)
		.ready(
				function() {
					
					$("#date").datepicker({
						changeMonth : 'true',
						changeYear : 'true',
						dateFormat : 'dd-mm-yy',
						// dateFormat : 'yy-mm-dd',
						maxDate : '0'
					});
					
				});

function validation() {
	
	
	$('#dateError').text("");
	$('#courtNameError').text("");
	$('#fineError').text("");
	$('#rmarkError').text("");
	$('#imageError').text("");
	
	
		if ($('#date').val()=='') {
			document.getElementById("dateError").innerHTML = "Select date";
			return false;
		}else{
			if ($('#courtName').val()=='') {
				document.getElementById("courtNameError").innerHTML = "Enter court name";
				return false;
			}else{
				if ($('#fine').val()=='') {
					document.getElementById("fineError").innerHTML = "Enter fine";
					return false;
				}else{
					
					var fine=$('#fine').val();
					if (isNaN(parseInt(fine)) || !(fine.match(/^\d+$/))) {
						$('#fineError').text("");
						document.getElementById("fineError").innerHTML = "Enter valid amount";
						$('#fine').val("");
						return false;
					}else{
						if ($('#remark').val()=='') {
							document.getElementById("rmarkError").innerHTML = "Enter remark";
							return false;
						}else{
							if ($('#image').val()=='') {
								document.getElementById("imageError").innerHTML = "Select Image";
								return false;
							}
						}
					}
					
				}
			}
		}
	
}


