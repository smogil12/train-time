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
    console.log(trainName, destinationName, trainTime, trainFrequency);

    var newObj = {
      "train name": trainName,
      destination: destinationName,
      "train time": trainTime,
      "train frequency": trainFrequency
    };

    db.collection("trains").add({
      newObj
    });
  });
});
