// Adam Crawford
// ASD 0313 Week 1

    $(document).on('pagebeforeshow', '#home', function () {
        $('#home section ul').empty();
            $.couch.db("asdwo").view("asdwo/workorders", {
                success: function (data) {
                    $.each(data.rows, function (index, wo) {
                        var key = wo.value._id,
                            fName = wo.value.fName,
                            lName = wo.value.lName,
                            priority = wo.value.priority,
                            subject = wo.value.subject,
                            date = wo.value.date,
                            email = wo.value.email,
                            description = wo.value.description,
                            phone = wo.value.phone,
                            time = wo.value.time,
                            num = wo.value.num;
                        if (wo.value.type === "HP") {
                            $("#rush").append(
                                $('<li>').append(
                                    $('<a>').attr("href", "details.html" + num).attr("id", key)
                                        .html("<h3>" + date + " " + time + "</h3> " + "<p>" + subject + "</p>")
                                        .on("click", function (e) {
                                            e.preventDefault()
                                            $.mobile.changePage("details.html?id=" + key, {dataUrl: "details?wo=" + num })
                                        })
                                )
                            )
                        } else if (wo.value.type === "LP") {
                            $("#reg").append(
                                $('<li>').append(
                                    $('<a>').attr("href", "details.html?wo=" + num)
                                        .html("<h3>" + date + " " + time + "</h3> " + "<p>" + subject + "</p>")
                                        .on("click", function (e) {
                                            e.preventDefault()
                                            $.mobile.changePage("details.html?id=" + key, {dataUrl: "details.html?wo=" + num })
                                        })
                                )
                            )
                        } else {
                            $("#comp").append(
                                $("<li>").append(
                                    $('<a>').attr("href", "details.html?wo=" + num)
                                        .html("<h3>" + date + " " + time + "</h3> " + "<p>" + subject + "</p>")
                                        .on("click", function (e) {
                                            e.preventDefault()
                                            $.mobile.changePage("details.html?id=" + key, {dataUrl: "details.html?wo=" + num })
                                        })
                                )
                            )
                        }
                    })
                    $("#home section ul").listview('refresh')
                }
            });
            console.log("CouchDB Data Loaded");
            $("#home").trigger('refresh');
    })
    //Home loaded
    $('#home').on('pageshow', function () {
        console.log("Home loaded.");
        $("#home section ul").listview('refresh')
        $("#home").trigger('refresh')

        //Click Couch button
        $('#db').on('click', function(){
            console.log("loadCouch clicked");
            // $('#home section ul').empty();
            // $.couch.db("asdwo").view("asdwo/workorders", {
            //     success: function (data) {
            //         $.each(data.rows, function (index, wo) {
            //             var key = wo.value._id,
            //                 fName = wo.value.fName,
            //                 lName = wo.value.lName,
            //                 priority = wo.value.priority,
            //                 subject = wo.value.subject,
            //                 date = wo.value.date,
            //                 email = wo.value.email,
            //                 description = wo.value.description,
            //                 phone = wo.value.phone,
            //                 time = wo.value.time,
            //                 num = wo.value.num;
            //             if (wo.value.type === "HP") {
            //                 $("#rush").append(
            //                     $('<li>').append(
            //                         $('<a>').attr("href", "details.html" + num).attr("id", key)
            //                             .html("<h3>" + date + " " + time + "</h3> " + "<p>" + subject + "</p>")
            //                             .on("click", function (e) {
            //                                 e.preventDefault()
            //                                 $.mobile.changePage("details.html?id=" + key, {dataUrl: "details?wo=" + num })
            //                             })
            //                     )
            //                 )
            //             } else if (wo.value.type === "LP") {
            //                 $("#reg").append(
            //                     $('<li>').append(
            //                         $('<a>').attr("href", "details.html?wo=" + num)
            //                             .html("<h3>" + date + " " + time + "</h3> " + "<p>" + subject + "</p>")
            //                             .on("click", function (e) {
            //                                 e.preventDefault()
            //                                 $.mobile.changePage("details.html?id=" + key, {dataUrl: "details.html?wo=" + num })
            //                             })
            //                     )
            //                 )
            //             } else {
            //                 $("#comp").append(
            //                     $("<li>").append(
            //                         $('<a>').attr("href", "details.html?wo=" + num)
            //                             .html("<h3>" + date + " " + time + "</h3> " + "<p>" + subject + "</p>")
            //                             .on("click", function (e) {
            //                                 e.preventDefault()
            //                                 $.mobile.changePage("details.html?id=" + key, {dataUrl: "details.html?wo=" + num })
            //                             })
            //                     )
            //                 )
            //             }
            //         })
            //         $("#home section ul").listview('refresh')
            //     }
            // });
            // console.log("CouchDB Data Loaded");
            // $("#home").trigger('refresh');
        });
    });
    

    //Before Details Load
    $(document).on('pagebeforeshow', "#details", function () {
        console.log("@ Details BeforePageShow")
        console.log("Details loaded.");
        var id = $(this).data("url").split("=")[1];
        $.couch.db("asdwo").openDoc(id, {
            success: function (data) {
                $("#display").html("<h2>Work Order " + data.num + "</h2>" + 
                "<div><h3>Client Information:</h3><ul><li>"+ data.fName + " " + data.lName + "</li><li>"+ data.phone + "</li><li>"+ data.email + "</li></ul></div>" +
                "<div><h3>Work Order Details:</h3><ul><li><p>"+ data.subject + "</p></li><li>" + data.description +"</li></ul></div>" +
                "<div><a href='#' data-role='button' key='"+ data._id + "' id='edit' num='" + data.num + "'>Edit WO</a><a href='#' data-rel='popup' data-position-to='window' data-role='button' data-transition='pop' data-icon='delete' data-theme='a' key='"+ data._id + "' id='close' num='" + data.num + "'>Close WO</a>"
                ).trigger('create');
            }        
        })
    });

    //Details Loaded
    $(document).on('pageshow', '#details', function () {
        $("#edit").on("click", function (e) {
            e.preventDefault();
            var key = $(this).attr("key"),
                num = $(this).attr("num");
            $.mobile.changePage("add.html?id=" + key, {dataUrl: "edit?wo=" + num})
        })
        $("#close").on("click", function (e) {
            console.log("Close clicked")
            // $( "#confirmDelete" ).popup()
            $('#delete').attr("key", $(this).attr("key"))
            $('#confirmDelete').popup("open")
        })
        $("#delete").on("click", function (e) {
            var key = $(this).attr("key");
            $.couch.db("asdwo").openDoc(key, {
                success: function (data) {
                    var rev = data._rev;
                    console.log("Removing ID: " + key + " and Rev: " + rev);
                    $.couch.db("asdwo").removeDoc({_id:key, _rev: rev}) 
                }
            })
            $("#home section ul").listview('refresh');
            $.mobile.changePage("#home").trigger('refresh')
        })
    })

    //Before Add Loaded
    $(document).on('pagebeforeshow', "#add", function () {
        console.log("@ Add BeforePageShow")
        var id = $(this).data("url").split("=")[1];
        if (id) {
            $("#save").attr("key", id)
            $.couch.db("asdwo").openDoc(id, {
                success: function (data) {
                    $.each(data, function (key, input) {
                        var field = $("#add #" + key);
                        if ( field.attr("id") === "priority" && input === "on") {
                            field.attr("checked","")
                        } else if ( field.attr("id") === "priority" && input === "false") {
                            field.removeAttr("checked")
                        } else {
                        field.val(input)
                        }
                    });
                    $("#add #priority").checkboxradio("refresh");
                }
            })
        } else {
            console.log("No ID Passed.")
        }
    })

    //Add Loaded
    $(document).on('pageshow', "#add", function () {
        console.log("Add loaded.");
        var form = $("#add form"),
        storeData = function (data, id, rev) {
                var  values = {}; 
                for (i=0, j=data.length; i<j; i++) {
                    var key = data[i].name,
                        val = data[i].value;
                    values[key] = val;
                    if (data[i].name === 'priority' && data[i].value === "on") {
                        values["type"] = "HP"
                    } else if (data[i].name === 'priority') {
                        values["type"] = "LP"
                    } else {
                        continue
                    }
                };
                if (id) {
                    values["_id"] = id;
                    values["_rev"] = rev;
                }
                $.couch.db("asdwo").saveDoc(values, {
                    success: function () {
                        $.mobile.changePage('#home')
                    }
                })
            };
        $("#save").on("click", function () {
            form.validate({
                errorPlacement: function(error, element) {
                    error.insertBefore($(element).parent());
                },

                submitHandler: function() {
                    var data = form.serializeArray(),
                        key = $("#save").attr("key");
                    if (!key) {
                        storeData(data)
                    } else {
                        $.couch.db("asdwo").openDoc(key, {
                            success: function (returned) {
                                var rev = returned._rev;
                                storeData(data, key, rev);
                            }
                        })
                    }
                }
            })
            
        });
        $("#reset").on('click', function (e) {
            $(this).parent().removeClass("ui-btn-active");
            e.stopPropagation();
        });
    })