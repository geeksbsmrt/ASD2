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
                    makeLink = $("<a href='#' id='"+key+"'>Show Details</a>");
                makeLink.on('click', createDetails);
                makeLink.on('click', function () {
                    $.mobile.changePage("#details", {changeHash: false})
                })
                makeLink.html(makeSubLi);
                if (wo.priority === "on") {
                    makeSubList.append(makeLink).appendTo("#rush");
                } else {
                    makeSubList.append(makeLink).appendTo("#reg");
                };
            };
            $("#rush").listview('refresh');
            $("#reg").listview('refresh');
        },
        buildAdd = function () { 
            $("<p>All fields required</p>" +
                    "<form action='#' method='post'>" +
                        "<fieldset>" +
                            "<legend>Client Information</legend>" +
                            "<label for='fName'>First Name: </label><input type='text' id='fName' name='fName' data-mini='true' class='required' />"+
                            "<label for='lName'>Last Name: </label><input type='text' id='lName' name='lName' data-mini='true' class='required' />"+
                            "<label for='phone'>Phone Number: </label><input type='tel' id='phone' name='phone' placeholder='555-555-5555' data-mini='true' class='required'/>"+
                            "<label for='email'>Email: </label><input type='email' id='email' name='email' placeholder='email@domain.com' data-mini='true' class='required email' />"+
                        "</fieldset>"+
                        "<fieldset>"+
                            "<legend>Work Order Details</legend>"+
                            "<input type='checkbox' id='priority' name='priority' data-mini='true' /><label for='priority'>Rush</label>"+
                            "<label for='date'>Due Date:</label>"+
                            "<input type='date' name='date' id='date' data-mini='true' value='' class='required'>"+
                            "<label for='time'>Due Time:</label>"+
                            "<input type='time' name='time' id='time' data-mini='true' class='required'>"+
                            "<label for='subject'>Subject:</label>"+
                            "<input type='text' name='subject' id='subject' data-mini='true' class='required'>"+
                            "<label for='description'>Description:</label>"+
                            "<textarea name='description' id='description'></textarea>"+
                        "</fieldset>"+
                        "<fieldset>"+
                            "<input type='submit' value='Submit' id='save' data-mini='true' data-theme='b' />"+
                            "<input type='reset' value='Reset' id='reset' data-mini='true' data-theme='a' />"+
                        "</fieldset>"+
                    "</form>").appendTo("#add section").trigger('create');
                $("#save").button('refresh');
                $("#reset").button('refresh');
            };
    //Home loaded
    $('#home').on('pageshow', function () {
        console.log("Home loaded.");
        var loadJSON = function (data) {
                localStorage.clear();
                console.log("Local Storage Cleared");
                $.each(data, function (index, wo) {
                    var guid = Math.floor(Math.random() * 100001),
                        sing = JSON.stringify(wo);
                    localStorage.setItem(guid, sing);
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
        $('#new').on('click', function(e){
            console.log("add clicked");
            $("#add section").html("")
            buildAdd();
            $.mobile.changePage("#add",{changeHash: false});

        });

        //Click JSON button
        $('#json').on('click', function(){
            console.log("loadJSON clicked");
            $.ajax({
                url: 'XHR/json.php',
                async: false,
                type: 'GET',
                dataType: 'json',
                success: function(data){
                    loadJSON(data);
                }
            })
            //loadJSON();
            console.log("JSON Data Loaded");
            displayStorage();
            //$("#home").trigger('refresh');
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
        });

        //Click details
        $("#home ul a").on('click', function (e) {
            e.preventDefault();
            $.mobile.changePage("#details",{changeHash: false})
        })

    });
    
    //Add Loaded
    $('#add').on('pageshow', function (id) {
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
                localStorage.setItem(UUID, JSON.stringify(values));
            };
			
		form.validate({
            errorPlacement: function(error, element) {
                error.insertBefore($(element).parent());
            },

            submitHandler: function() {
                var data = form.serializeArray(),
                    key = $("#add #save").prop("key");
                storeData(data, key);
                displayStorage();
                $.mobile.changePage("#home",{changeHash: false});
                
                $("#add section").html("");
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
            $("#add section").html("")
            buildAdd();
            $.each(data, function (key, input) {
                var field = $("#add #" + key);
                if ( field.attr("id") === "priority" && input === "on") {
                    field.attr("checked",true)
                } else if ( field.attr("id") === "priority" && input === "false") {
                    field.removeAttr("checked")
                } else {
                field.val(input)
                }
            });
            $.mobile.loadPage("#add", {changeHash: false})
            $("#add #save").val("Save");
            $("#add #save").prop("key", id).button('refresh');
            $("#add #priority").checkboxradio("refresh");
            $.mobile.changePage("#add",{changeHash: false});

        });
        $("#close").on('click', function () {
        	var key = $(this).attr("key");
        	localStorage.removeItem(key);
        	$.mobile.changePage("#home",{changeHash: false});
        	displayStorage();
        });
    });
