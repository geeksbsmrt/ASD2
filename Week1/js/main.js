// Adam Crawford
// ASD 0313 Week 1

    var createDetails =  function () {
		var data = JSON.parse(localStorage.getItem(this.id));
            $('#details section').html(
                "<h2>Work Order " + this.id + "</h2>" + 
                "<div><h3>Client Information:</h3><ul><li>"+ data.fName + " " + data.lName + "</li><li>"+ data.phone + "</li><li>"+ data.email + "</li></ul></div>" +
                "<div><h3>Work Order Details:</h3><ul><li><p>"+ data.subject + "</p></li><li>" + data.description +"</li></ul></div>" +
                "<div><a href='#' data-role='button' key='"+ this.id + "' id='edit'>Edit WO</a><a href='#' data-role='button' key='"+ this.id + "' id='close'>Close WO</a>"
                ).trigger('create');
        	},

		displayStorage = function () {
			$('#home section ul').empty();
            for (var i= 0, j=localStorage.length; i<j ; i++){
                var key = localStorage.key(i),
                    wo = JSON.parse(localStorage.getItem(key)),
                    makeSubList = $("<li></li>"),
                    makeSubLi = $( "<h3>"+ wo.date + " " + wo.time +"</h3>"+
                        "<p><strong>"+wo.subject+"</strong></p>"),
                    makeLink = $("<a href='#details' id='"+key+"'>Show Details</a>");
                makeLink.on('click', createDetails);
                makeLink.html(makeSubLi);
                if (wo.priority === "on") {
                    makeSubList.append(makeLink).appendTo("#rush");
                } else {
                    makeSubList.append(makeLink).appendTo("#reg");
                };
            };
            $("#rush").listview('refresh');
            $("#reg").listview('refresh');
        };
    //Home loaded
    $('#home').on('pageshow', function () {
        console.log("Home loaded.");
        var loadJSON = function () {
                localStorage.clear();
                console.log("Local Storage Cleared");
                $.each(workOrders, function (index, wo) {
                    var guid = Math.floor(Math.random() * 100001),
                         data = JSON.stringify(wo);
                    localStorage.setItem(guid, data);
                });
            },
            loadXML = function () {
                localStorage.clear();
                console.log("Local Storage Cleared");
                var url = "xml/wo.xml",
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
        });

        //Click JSON button
        $('#json').on('click', function(){
            console.log("loadJSON clicked");
            loadJSON();
            console.log("JSON Data Loaded");
            displayStorage();
            $("#home").trigger('refresh');
        });

        //Click XML Button
        $('#xml').on('click', function(){
            console.log("loadXML clicked");
            loadXML();
            console.log("XML Loaded");
            displayStorage();
        });

        //Click Clear
        $("#clear").on('click', function () {
        	localStorage.clear()
        	console.log("local storage cleared")
        })

    });
    
    //Add Loaded
    $('#add').on('pageshow', function () {
        console.log("Add loaded.");
        var form = $("#add form"),
            storeData = function (data, id) {
            	if (!id) {
            		var UUID = Math.floor(Math.random()*100001);
            	} else {
                	UUID = id
            	}
                var  values = {}; 
                for (i=0, j=data.length; i<j; i++) {
                    var key = data[i].name,
                        val = data[i].value;
                    	values[key] = val;
                };
                console.log(values)
                localStorage.setItem(UUID, JSON.stringify(values));
            };
			
			form.validate({
            errorPlacement: function(error, element) {
                error.insertBefore($(element).parent());
            },

            submitHandler: function() {
                var data = form.serializeArray();
                storeData(data, $("#add #submit").prop("key"));
                $.mobile.changePage("#home");
                displayStorage();
            }
        });
        $("#reset").on('click', function (e) {
            $(this).parent().removeClass("ui-btn-active");
            e.stopPropagation();
        });
    });

    //Details Loaded
    $('#details').on('pageshow', function () {
        console.log("Details loaded.");

        $("#edit").on('click', function () {
        	var id = $(this).attr("key"),
        		data = JSON.parse(localStorage.getItem(id));

        	$.each(data, function (key, input) {
        		var field = $("#add #" + key);
        		if ( field.attr("id") === "priority" && input === "on") {
        			field.attr("checked",true)
        		} else if ( field.attr("id") === "priority" && input === "false") {
        			field.removeAttr("checked")
        		} else {
        		field.val(input)
        		}
        	})
        	$("#add #submit").val("Save")
        	$("#add #submit").prop("key", id)
        	$.mobile.changePage("#add")
        	$("#add #priority").checkboxradio("refresh");

        });
        $("#close").on('click', function () {
        	var key = $(this).attr("key");
        	localStorage.removeItem(key);
        	$.mobile.changePage("#home");
        	displayStorage();
        });
    });