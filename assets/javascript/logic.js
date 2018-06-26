$(document).ready(function() { // DOCUMENT READY OPENING

var config = {
    apiKey: "AIzaSyBOQCI22eh_JRFqj1wjjTasZATxwKk591k",
    authDomain: "train-schedule-18b48.firebaseapp.com",
    databaseURL: "https://train-schedule-18b48.firebaseio.com",
    projectId: "train-schedule-18b48",
    storageBucket: "",
    messagingSenderId: "867496002486"
  };
  firebase.initializeApp(config);

  let database = firebase.database();

  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

  // Grabs user input
  let trainName = $("#train-name-input").val().trim();
  let destination = $("#dest-input").val().trim();
  let firstTrainTime = $("#first-train-input").val().trim();
  let frequency = $("#freq-input").val().trim();

  let newTrain = {
      name: trainName,
      dest: destination,
      first: firstTrainTime,
      freq: frequency,
  }

  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.first);
  console.log(newTrain.freq);

  // Alert
  alert("train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#dest-input").val("");
  $("#first-train-input").val("");
  $("#freq-input").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    let trainName = childSnapshot.val().name;
    let destination = childSnapshot.val().role;
    let firstTrainTime = childSnapshot.val().start;
    let frequency = childSnapshot.val().rate;
  
    // Employee Info
    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);
  
    // Set the time
    var trainSetTime = moment.unix(firstTrainTime).format("hh:mm A");
  
    // Add each train's data into the table
    $("#employee-table > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" +
    empStartPretty + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");
  });

}); // DOCUMENT READY CLOSING