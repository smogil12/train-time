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
  });
});

db.collection("trains").onSnapshot(function(collectionSnap) {
  console.log("[DEBUG] train was added to firebase");
  var trainRows = collectionSnap.docs.forEach(function(doc) {
    var trainData = doc.data();
    console.log(trainData);
    var trainTable = trainData.trainName;
    var tableDesintation = trainData.destination;
    var tableFrequency = trainData.trainFrequency;
    console.log(trainTable);
    console.log(tableDesintation);
    // create row using train data
    // append that row to the train table

    var newRow = $("<tr>").append(
      $("<td>").text(trainTable),
      $("<td>").text(tableDesintation),
      $("<td>").text(tableFrequency)
    );
    $("#train-table > tbody").append(newRow);
  });
});
