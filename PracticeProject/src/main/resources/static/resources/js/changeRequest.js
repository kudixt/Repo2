var noOfRecordsPerPage = 10;
var noOfPages = null;
var searchStringGlobal = null;
var isSearch = false;
var countUrl = null;
var getNextRecordsUrl = null;
var count = 0;

//CR No 2021-1041: maintain challan related change request

function userListinitialize(countUrlLocal, getNextRecordsUrlLocal) {
	
	countUrl = countUrlLocal;
	getNextRecordsUrl = getNextRecordsUrlLocal;
	getNoOfUserRecords(searchStringGlobal);
}

function pagination(noOfRecords) {
	noOfPages = Math.ceil(noOfRecords * 1.0 / noOfRecordsPerPage)
	$('.pagination').bootpag({
		total : noOfPages,
		maxVisible : 10,
		leaps : true,
		firstLastUse : true,
		first : '←',
		last : '→',
		wrapClass : 'pagination',
		activeClass : 'active',
		disabledClass : 'disabled',
		nextClass : 'next',
		prevClass : 'prev',
		lastClass : 'last',
		firstClass : 'first'
	}).on("page", function(event, num) {
		if (num != 1) {
			var start = Number(num * noOfRecordsPerPage - noOfRecordsPerPage);
		} else {
			var start = 0;
		}
		getNextRecords(searchStringGlobal, start);
	});
}

function getNoOfUserRecords(searchString, start) {
	
	$.ajax({
		type : "POST",
		url : countUrl,
		data : {
			searchString : searchString
		}
	}).done(function(result) {
		if (result != null) {
			if (result > noOfRecordsPerPage) {
				pagination(result);
				$('.pagination').show();
			} else
				$('.pagination').hide();
			
			searchStringGlobal = searchString;
			isSearch = true;
			count = count + 1;
			if (count > 1)
				getNextRecords(searchString, 0);
		} else {
			searchStringGlobal = null;
			isSearch = false;
		}
	}).fail(function() {

	});
}

function getNextRecords(searchString, start) {
	
	$.ajax({
		type : "POST",
		url : getNextRecordsUrl,
		data : {
			offset : start,
			searchString : searchString
		}
	}).done(function(result) {
		$(".data").remove();
		$("#tableBody").append(result);
	}).fail(function() {

	});
}


//CR No 2021-1041: maintain challan related change request