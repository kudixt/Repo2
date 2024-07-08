var issubmenuLoad = true;

$(document).ready(function() {
	/*2019-1155*/
	$('#appCategory').click(function(){
		issubmenuLoad = true;
		resetMenuLst();
	});
	
	function resetMenuLst(){
		$("#menuCategory").text("");
		$("#menuCategory").append("<option value='' selected='selected'>Non</option>");
	}
	
	$('#menuCategory').focus(function(){
		if (issubmenuLoad) {
			try{
				addMenuLst();
			}catch(e){
				alert(e.message);
			}
		}
	});
	
});

function addMenuLst(){
	var applicationtype = $('#appCategory').val();
	if (applicationtype != "") {
		$.ajax({
				 url : "getListOfParentMenu.htm?applicationtype="+ applicationtype,
				 type : "POST",
				 contentType : "application/json",
				async : false,
				success:
					function(data, status, xhr) {
					issubmenuLoad = false;
					if (!data) {
					} else {
						assignDatatomenuaccess(xhr.responseText);
					}
			}
			});
	}
}

function assignDatatomenuaccess(data) {
	$("#menuCategory").text("");
	$("#menuCategory").append("<option value='' selected='selected'>Non</option>");
	d = $.parseJSON(data);
	$.each(d, function(i, item) {
		$("#menuCategory").append("<option value='" + item['pkid'] + "'>" + item['menuname']
						+ "</option>")
	});
	
}








