// Adam Crawford
// ASD 0313 Week 1

$('#home').on('pageinit', function () {
	console.log("Home loaded.");
	localStorage.clear();
	console.log("Local Storage Cleared");
	var loadJSON = function () {
		localStorage.clear();
		console.log("Local Storage Cleared");
		$.each(json, function (index, wo) {
	        var guid = Math.floor(Math.random() * 100001),
	         	data = JSON.stringify(wo);
	        localStorage.setItem(guid, data);
			})
		},
		viewDetails = function (woID) {
			$.mobile.changePage('#details')
		},
		loadXML = function () {
			localStorage.clear();
			console.log("Local Storage Cleared");
			var url = "xml/wo.xml"
				xml = new JKL.ParseXML(url),
				data = xml.parse();
			console.log(data);
			$.each(data.root.wo, function (index, wo) {
				console.log(wo);
				var guid = Math.floor(Math.random() * 100001),
	         	data = JSON.stringify(wo);
	        	localStorage.setItem(guid, data);
			});
		};
	$('#json').on('click', function(){
		console.log("loadJSON clicked");
		$('#home ul').empty();
		loadJSON();
		for (var i= 0, j=localStorage.length; i<j ; i++){
            var key = localStorage.key(i),
            	match = JSON.parse(localStorage.getItem(key));
            var makeSubList = $("<li></li>");
            var makeSubLi = $( "<h3>"+ /*Due Date*/ + " " + /*Due Time*/+"</h3>"+
                "<p><strong>"+/*Subject*/+"</strong></p>");
            /*var makeLink = $("<a href='#details' id='"+key+"'>Show Details</a>");
            makeLink.html(makeSubLi);
            If rush=true
            makeSubList.append(makeLink).appendTo("#rush");
            else
            makeSubList.append(makeLink).appendTo("#reg");*/
        };
        $("#home ul").listview('refresh');
	})
	$('#xml').on('click', function(){
		console.log("loadXML clicked");
		$('#home ul').empty();
		loadXML();
		for (var i= 0, j=localStorage.length; i<j ; i++){
            var key = localStorage.key(i),
            	match = JSON.parse(localStorage.getItem(key));
            var makeSubList = $("<li></li>");
            var makeSubLi = $( "<h3>"+ /*Due Date*/ + " " + /*Due Time*/+"</h3>"+
                "<p><strong>"+/*Subject*/+"</strong></p>");
            /*var makeLink = $("<a href='#details' id='"+key+"'>Show Details</a>");
            makeLink.html(makeSubLi);
            If rush=true
            makeSubList.append(makeLink).appendTo("#rush");
            else
            makeSubList.append(makeLink).appendTo("#reg");*/
        };
        $("#home ul").listview('refresh');
	})
});

$('#add').on('pageinit', function () {
	console.log("Add loaded.")
});

$('#details').on('pageinit', function () {
	console.log("Details loaded.")
})