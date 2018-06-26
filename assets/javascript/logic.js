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

  // Pushes data to Firebase
  database.ref().push(newTrain);

  // Alert
  $(".lead").html("The train has been added!")
  setTimeout(function() {
    let originalText = "Enter the train name, destination, first time it arrived, and the frequency below to add a train to the table.";
    $(".lead").html(originalText);
  }, 5000)

  // Clears the text-boxes
  $("#train-name-input").val("");
  $("#dest-input").val("");
  $("#first-train-input").val("");
  $("#freq-input").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    // Store everything into a variable.
    let trainName = childSnapshot.val().name;
    let destination = childSnapshot.val().dest;
    let firstTrainTime = childSnapshot.val().first;
    let frequency = childSnapshot.val().freq;
  
    // Set the time with conversion from military to 12-hour
    let trainSetTime = moment(firstTrainTime, "kmm").format("hh:mm A");

    // Convert time
    let firstTimeConverted = moment(trainSetTime, "kmm").subtract(1, "years");

    // Grab time difference between now and first train
    let diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // Figure out the time apart
    let remainTime = diffTime % frequency;

    // Figure out the time away
    let arrivalTime = frequency - remainTime;

    // Figure out when the next train is
    let nextTrain = moment().add(arrivalTime, "minutes");

    // Convert the nextTrain time
    let nextTrainConverted = moment(nextTrain).format("hh:mm A")

  
    // Add each train's data into table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
    frequency + "</td><td>" + nextTrainConverted + "</td><td>" + arrivalTime + "</td></tr>");
  });

}); // DOCUMENT READY CLOSING