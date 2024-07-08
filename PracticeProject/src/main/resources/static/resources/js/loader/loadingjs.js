$('body').on('beforeSubmit', 'form', function() {
   $.blockUI({ message: $("#domMessage")});
   return true;
});

$(document).ajaxStart(function() {
	$.blockUI({ message: $("#domMessage")});
}).ajaxStop(function() {
	$("#myModal").modal('hide');
});