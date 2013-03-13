// Adam Crawford
// ASD 0313 Week 1

	//Home loaded
	$('#home').on('pageinit', function () {
		console.log("Home loaded.");
		localStorage.clear();
		console.log("Local Storage Cleared");
		var loadJSON = function () {
			localStorage.clear();
			console.log("Local Storage Cleared");
			$.each(workOrders, function (index, wo) {
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
    
		//Click JSON button
		$('#json').on('click', function(){
			console.log("loadJSON clicked");
			$('#home ul').empty();
			loadJSON();
			console.log("JSON Data Loaded");
			for (var i= 0, j=localStorage.length; i<j ; i++){
	            var key = localStorage.key(i),
	            	wo = JSON.parse(localStorage.getItem(key)),
	            	makeSubList = $("<li></li>"),
	            	makeSubLi = $( "<h3>"+ wo.date + " " + wo.time +"</h3>"+
	                	"<p><strong>"+wo.subject+"</strong></p>"),
	            	makeLink = $("<a href='#details' id='"+key+"'>Show Details</a>");
	            makeLink.on('click', function(){
	            	var data = JSON.parse(localStorage.getItem(this.id));
	            	$('#details section').html(
	            		"<h2>Work Order " + this.id + "</h2>" + 
	            		"<div><h3>Client Information:</h3><ul><li>"+ data.fName + " " + data.lName + "</li><li>"+ data.phone + "</li><li>"+ data.email + "</li></ul></div>" +
	            		"<div><h3>Work Order Details:</h3><ul><li><p>"+ data.subject + "</p></li><li>" + data.description +"</li></ul></div>"
	            		)
            	});
	            makeLink.html(makeSubLi);
	            if (wo.priority=== "true") {
	            	makeSubList.append(makeLink).appendTo("#rush");
	            } else {
	            	makeSubList.append(makeLink).appendTo("#reg");
	            };
	        };
	        $("#reg").listview('refresh');
	        $("#rush").listview('refresh');
		});

		//Click XML Button
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
	        $("#reg").listview('refresh');
	        $("#rush").listview('refresh');
		});

	});
	
	//Add Loaded
	$('#add').on('pageinit', function () {
		console.log("Add loaded.");
		var form = $("#add form");
		form.validate({
			errorPlacement: function(error, element) {
				error.insertBefore($(element).parent());

				},

			// invalidHandler: function(form, validator) {

			// };
			submitHandler: function() {
				// var data = myForm.serializeArray();
				// storeData(data);
				// window.location = "#home";
				// window.location.reload();
			}
		});
	});

	//Details Loaded
	$('#details').on('pageinit', function () {
		console.log("Details loaded.");
	});