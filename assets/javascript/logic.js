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
    let destination = childSnapshot.val().dest;
    let firstTrainTime = childSnapshot.val().first;
    let frequency = childSnapshot.val().freq;
  
    // Employee Info
    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);
  
    // Set the time
    var trainSetTime = moment(firstTrainTime, "kmm").format("hh:mm A");
    console.log(trainSetTime);
  
    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
    frequency + "</td><td>" + trainSetTime + "</td></tr>");
  });

}); // DOCUMENT READY CLOSING