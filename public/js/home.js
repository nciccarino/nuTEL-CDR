$(document).ready(function(){

  $.get("/api/user_data").then(function(data) {
    console.log("logged in")
    //$("#loginID").html("<h4> Logged in as <b>" + data.email + "</h4>").addClass("loggedInID");
  });

  $("#logoutBtn").on("click", handleLogout); 

  function handleLogout() {
    $.get("/logout").then(function() {
      window.location.href = "/admin";
      console.log("logging out")
    })
  }

  var currentContainer = $('.currentBody'); 

  var pastContainer= $('.pastBody');

  var addArray= [];

  //store value when user updates Notes
  var changedTitle;
  var changedDate;
  var changedNotes;
  var changedCategory;

  var updateObj;
  var id;

  $('#addReport').on("click", function() {
      console.log("add click")
     $('#modelWindow').modal('show');
  });

  //event listener for when user adds movie to the database
  $("#modalSubmit").on("click", handleSubmit);

  $("#deleteReportBtn").on("click", handleDelete);

  $(document.body).on("click", '.block', handleMyReport);

  $(".buttonEdit").on("click", function(){
    event.preventDefault();
    $("#report-form").css("display", "block"); 
    $("#report-delete").css("display", "none");
  });

  $(".buttonDelete").on("click", function(){
    event.preventDefault();
    $("#report-form").css("display", "none"); 
    $("#report-delete").css("display", "block");
  });

  $("#updateReportTitle").on("click", handleUpdateTitle);
  $("#updateReportClient").on("click", handleUpdateTitle);
  $("#updateReportDate").on("click", handleUpdateDate);
  $("#updateReportNotes").on("click", handleUpdateNotes);
  $("#updateReportCategory").on("click", handleUpdateCategory); 

  reportCreator();
  //ajax request to pull data from the database/server
  //Then calls function to populate it on the page
function reportCreator(){
    $.ajax({
        method: 'GET',
        url: '/api/reports'
    }).done(function(data){
        console.log(data);

        $(".futureBody").empty();
        //populate movies onto front end
        for(var i = 0; i< data.length; i++){
   
            var futureDiv = $("<div>").addClass("eventBlocks");
            futureDiv.addClass("futureDiv" +i);
            futureDiv.addClass("block");

            var showDate = moment(data[i].date).add(4, 'hours').format('LLL');

            var titleDiv = $("<h4>" + data[i].title + "</h4>").addClass("textEntry");
            var clientDiv = $("<h5>" + data[i].client + "</h5>").addClass("textEntry");
            var tableDiv = $("<h5>" + data[i].table + "</h5>").addClass("textEntry");
            var dateDiv = $("<h5>" + showDate + "</h5>").addClass("textEntry");
            var notesDiv = $("<p>" + data[i].notes + "</p>").addClass("textEntry");

            futureDiv.append(titleDiv);
            futureDiv.append(clientDiv); 
            futureDiv.append(locationDiv);
            futureDiv.append(dateDiv);
            futureDiv.append(notesDiv);
            titleDiv.append(urlDiv);

            futureDiv.data("clickedData", data[i]);

          if(data[i].category=="current"){
            currentContainer.append(futureDiv);
          }
          else if(data[i].category=="finished"){
            finishedContainer.append(futureDiv);
          }
        }
    })
  }

  function handleMyReport(){
      var clickedData = $(this).data("clickedData")
      id = $(this).data("clickedData").id;

      console.log(id);
      console.log(typeof id);

      //show the modal
      $("#reportModal").modal("show");

      //show the movie title
      $("#myReportTitle").html(clickedData.title);

      //display current notes on the movis
      $(".notesBody").html(clickedData.notes);

      //hiddien once user clicks edit
      $("#editNotes").html(clickedData.notes);
  }

//---------------- update stuff -------------------------------------

  function handleUpdateTitle(){

    changedTitle = $("#editTitle").val().trim();

    updateObj ={
      title: changedTitle,
      id: id
    }

    $.ajax({
      method: "PUT",
      url: "/api/reports/title",
      data: updateObj
    })
    .done(function() {
      console.log("put worked")
     window.location.href = "/home";
    });
  }

  function handleUpdateClient(){

    changedClient = $("#editClient").val().trim();

    updateObj ={
      title: changedClient,
      id: id
    }

    $.ajax({
      method: "PUT",
      url: "/api/reports/client",
      data: updateObj
    })
    .done(function() {
      console.log("put worked")
     window.location.href = "/home";
    });
  }  

  function handleUpdateDate(){

    changedDate = $("#editDate").val().trim();

    updateObj ={
      title: changedDate,
      id: id
    }

    $.ajax({
      method: "PUT",
      url: "/api/reports/date",
      data: updateObj
    })
    .done(function() {
      console.log("put worked")
     window.location.href = "/home";
    });
  }

  function handleUpdateNotes(){

    changedNotes = $("#editNotes").val().trim();

    updateObj ={
      title: changedNotes,
      id: id
    }

    $.ajax({
      method: "PUT",
      url: "/api/reports/notes",
      data: updateObj
    })
    .done(function() {
      console.log("put worked")
     window.location.href = "/home";
    });
  } 

  function handleUpdateCategory(){

    changedCategory = $("#editCategory").val().trim();

    updateObj ={
      title: changedCategory,
      id: id
    }

    $.ajax({
      method: "PUT",
      url: "/api/reports/category",
      data: updateObj
    })
    .done(function() {
      console.log("put worked")
     window.location.href = "/home";
    });
  }   

//---------------------------------------------------------------------

  function handleDelete(){

    console.log(id)

    updateObj ={
      id: id
    }

    $.ajax({
      method: "DELETE",
      url: "/api/reports/delete",
      data: updateObj
    })
    .done(function() {
      console.log("delete worked")
      window.location.href = "/home";
    });
  }

  function handleSubmit(event) {
    event.preventDefault(); 

    //getting info for columns 
    var theTitle = $("#reportTitle").val().trim();
    var theClient = $("#reportClient").val().trim();
    var theDate = $("#reportDate").val();
    var theNotes = $("#reportNotes").val().trim();
    var theTable = $("#reportTable").val().trim();
    var theURL = $("#reportCategory").val().trim();

    addArray.push(theTitle, theClient, theDate, theNotes, theTable, theCategory);

    console.log(addArray);

    var newReport = {
      title: addArray[0], 
      client: addArray[1],
      date: addArray[2],
      notes: addArray[3],
      table: addArray[4]
      category: addArray[5]
    }; 

    console.log("\nNEW EVENT OBJECT CREATED:")
    console.log(newEvent);

    if (!addArray[0] || !addArray[2] || !addArray[4] || !addArray[5]) {
      alert("Missing Required Information")
      window.location.reload()
      return; 
    } else {
      submitReport(newReport); 
    } 

  } // handleSubmit 


  function submitReport(Report) {
    $.ajax({
      type: 'POST',
      url:'/api/reports',
      data: Report
    }).done(function(){
      console.log("posted data"); 

      //redirects us back to the movies html
      window.location.href = "/home";

    })
  }

});

