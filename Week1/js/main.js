// Adam Crawford
// ASD 0313 Week 1


	var displayStorage = function () {
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
	        	$("#rush").listview('refresh');
	        	$("#reg").listview('refresh');
			};
	//Home loaded
	$('#home').on('pageinit', function () {
		console.log("Home loaded.");
		var loadJSON = function () {
				localStorage.clear();
				console.log("Local Storage Cleared");
				$.each(workOrders, function (index, wo) {
			        var guid = Math.floor(Math.random() * 100001),
			         	data = JSON.stringify(wo);
			        localStorage.setItem(guid, data);
				})
			},
			loadXML = function () {
				localStorage.clear();
				console.log("Local Storage Cleared");
				var url = "xml/wo.xml"
					xml = new JKL.ParseXML(url),
					data = xml.parse();
				$.each(data.root.wo, function (index, wo) {
					var guid = Math.floor(Math.random() * 100001),
		         	data = JSON.stringify(wo);
		        	localStorage.setItem(guid, data);
				});
			};
    
		//Click Add
		$('a[href="#add"]').on('click', function(e){
			e.preventDefault();
			console.log("add clicked");
			$.mobile.changePage("#add");
		})

		//Click JSON button
		$('#json').on('click', function(){
			console.log("loadJSON clicked");
			$('#home section ul').empty();
			loadJSON();
			console.log("JSON Data Loaded");
		});

		//Click XML Button
		$('#xml').on('click', function(){
			console.log("loadXML clicked");
			$('#home section ul').empty();
			loadXML();
			console.log("XML Loaded");
			displayStorage();
		});

	});
	
	//Add Loaded
	$('#add').on('pageinit', function () {
		console.log("Add loaded.");
		var form = $("#add form"),
			storeData = function (data) {
				var UUID = Math.floor(Math.random()*100001),
					values = {}; 
				for (i=0, j=data.length; i<j; i++) {
					var key = data[i].name,
						val = data[i].value;
					values[key] = val;
				};
				localStorage.setItem(UUID, JSON.stringify(values));
			};
		form.validate({
			errorPlacement: function(error, element) {
				error.insertBefore($(element).parent());
			},

			submitHandler: function() {
				var data = form.serializeArray();
				storeData(data);
				$.mobile.changePage("#home");
				displayStorage();

			}
		});
		$("#reset").on('click', function (e) {
			$(this).parent().removeClass("ui-btn-active")
			e.stopPropagation();
		})
	});

	//Details Loaded
	$('#details').on('pageinit', function () {
		console.log("Details loaded.");
	});



