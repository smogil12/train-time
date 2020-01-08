$(document).ready(function() {
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#train-name-input")
      .val()
      .trim();
    var destinationName = $("#destination-input")
      .val()
      .trim();
    var trainTime = $("#train-time-input")
      .val()
      .trim();
    var trainFrequency = $("#frequency-input")
      .val()
      .trim();

    console.log(`[DEBUG] adding new train to firebase :: `, {
      trainName,
      destinationName,
      trainTime,
      trainFrequency
    });

    db.collection("trains").add({
      trainName: trainName,
      destination: destinationName,
      trainTime: parseInt(trainTime),
      trainFrequency: parseInt(trainFrequency)
    });

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#train-time-input").val("");
    $("#frequency-input").val("");
  });

  db.collection("trains").onSnapshot(function(collectionSnap) {
    $("#train-table > tbody").empty();
    console.log("[DEBUG] train was added to firebase");
    var trainRows = collectionSnap.docs.forEach(function(doc) {
      var trainData = doc.data();
      console.log(trainData);
      var trainTable = trainData.trainName;
      var tableDesintation = trainData.destination;
      var tableFrequency = trainData.trainFrequency;
      var tableTime = trainData.trainTime;
      var trainTimeConvert = moment(tableTime, "HH:mm").subtract(1, "years");
      console.log(trainTable);
      console.log(tableDesintation);
      console.log("trainTimeConvert", trainTimeConvert);
      var currentTime = moment();
      var diffTime = moment().diff(trainTimeConvert, "minutes");
      var remainder = diffTime % tableFrequency;
      var timeRemain = tableFrequency - remainder;
      var newTrainTime = moment().add(timeRemain, "minutes");
      var newTrainTimeFormat = moment(newTrainTime).format("HH:mm");

      var newRow = $("<tr>").append(
        $("<td>").text(trainTable),
        $("<td>").text(tableDesintation),
        $("<td>").text(tableFrequency),
        $("<td>").text(newTrainTimeFormat),
        $("<td>").text(timeRemain)
      );
      $("#train-table > tbody").append(newRow);
    });
  });
});
