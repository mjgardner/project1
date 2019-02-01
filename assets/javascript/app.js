var whitePagesKey = "9c1e6a670dcd4f9599686f5057a57543";
var map;
var marker;
var firebaseConfig = {
  apiKey: "AIzaSyAvvvOlr-YOqg3zdrTOeg8Dnmu1Y-A5SBA",
  authDomain: "whos-calling-me-1548382086597.firebaseapp.com",
  databaseURL: "https://whos-calling-me-1548382086597.firebaseio.com",
  projectId: "whos-calling-me-1548382086597",
  storageBucket: "whos-calling-me-1548382086597.appspot.com",
  messagingSenderId: "903989663896"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$(document).ready(function() {
  $("#submitbutton").click(function(event) {
    event.preventDefault();
    var phoneNumber = $("#exampleInputPhoneNumber")
      .val()
      .trim();

    var url = {
      phoneReputation:
        "https://proapi.whitepages.com/3.0/phone_reputation?api_key=" +
        whitePagesKey +
        "&phone=" +
        phoneNumber,
      reversePhone:
        "https://proapi.whitepages.com/3.0/phone?api_key=" +
        whitePagesKey +
        "&phone=" +
        phoneNumber
    };

    var results = {};
    $.ajax({
      url: url.reversePhone,
      method: "GET",
      success: function(response) {
        results["reversePhone"] = response;
        $.ajax({
          url: url.phoneReputation,
          method: "GET",
          success: function(response) {
            results["phoneReputation"] = response;
            console.log(results);

            results.dateAdded = firebase.database.ServerValue.TIMESTAMP;

            database.ref().push(results);

            database.ref().on("value", function(childSnapshot) {
              console.log(childSnapshot.val());

              Object.keys(childSnapshot.val()).forEach(function(key, i) {
                if (i > 9) return;

                var phoneNumber = childSnapshot.val()[key].reversePhone
                  .phone_number;
                var category =
                  childSnapshot.val()[key].phoneReputation.reputation_details &&
                  childSnapshot.val()[key].phoneReputation.reputation_details
                    .category;
                var repLevel = childSnapshot.val()[key].phoneReputation
                  .reputation_level;
                var repScore =
                  childSnapshot.val()[key].phoneReputation.reputation_details &&
                  childSnapshot.val()[key].phoneReputation.reputation_details
                    .score;
                var dateAdded = dayjs(
                  childSnapshot.val()[key].dateAdded
                ).format("MMM D YYYY");

                console.log(
                  phoneNumber,
                  category,
                  repLevel,
                  repScore,
                  dateAdded
                );

                var newRow = $("<tr>").append(
                  $("<td>").text(dateAdded),
                  $("<td>").text(phoneNumber),
                  $("<td>").text(category),
                  $("<td>").text(repLevel),
                  $("<td>").text(repScore)
                );

                $("#savedScores  > tbody").append(newRow);
              });
            });

            var reputationLevel = response.reputation_level;
            var categoryType = response.reputation_details.category;
            var reputationScore = response.reputation_details.score;

            $("#reputation-level-display").html(reputationLevel + "/4");
            console.log(reputationLevel);
            $("#report-score-display").html(reputationScore + "/100");
            console.log(reputationScore);

            if (categoryType === null) {
              $("#category-type-display").html("None");
              console.log("None");
            } else {
              $("#category-type-display").html(categoryType);
              console.log(categoryType);
            }

            function colorDiv() {
              if (reputationScore >= 85 && reputationScore <= 100) {
                $("#report-score-display").css("background-color", "red");
              } else if (reputationScore >= 70 && reputationScore <= 84) {
                $("#report-score-display").css("background-color", "orange");
              } else if (reputationScore >= 50 && reputationScore <= 69) {
                $("#report-score-display").css("background-color", "yellow");
              } else {
                $("#report-score-display").css("background-color", "green");
              }
            }
            colorDiv();

            // set address, map and place marker
            if (results.reversePhone) {
              var address = results.reversePhone.current_addresses[0];
              if (address) {
                $("#address-display").html(
                  (address.street_line_1
                    ? address.street_line_1 + "<br>"
                    : "") +
                    (address.street_line_2
                      ? address.street_line_2 + "<br>"
                      : "") +
                    address.city +
                    ", " +
                    address.state_code +
                    " " +
                    (address.postal_code ? address.postal_code : "") +
                    (address.zip4 ? "-" + address.zip4 : "")
                );
                if (address.lat_long) {
                  var latLong = address.lat_long;

                  map = new google.maps.Map(
                    document.getElementById("map-appears-here"),
                    {
                      center: { lat: latLong.latitude, lng: latLong.longitude },
                      zoom: 8
                    }
                  );
                  marker = new google.maps.Marker({
                    position: { lat: latLong.latitude, lng: latLong.longitude },
                    map: map
                  });
                }
              }
            }
          },
          error: ajaxError
        });
      },
      error: ajaxError
    });
  });
});

function initMap() {
  var houstonTxLatLng = { lat: 29.762778, lng: -95.383056 };
  map = new google.maps.Map(document.getElementById("map-appears-here"), {
    center: houstonTxLatLng,
    zoom: 8
  });
}

function ajaxError(xhr) {
  console.log("error: " + xhr.status);
}
$(document).ready(function() {
  // create a function to hide and display information when info icon is pressed
  $("#reputation-level-info-icon").on("click", function() {
    var x = document.getElementById("reputation-level-info");
    // console.log(x.style)
    if (x.style.display === "none" || !x.style.display) {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  });
  // create a function to hide and display information when info icon is pressed
  $("#category-type-info-icon").on("click", function() {
    var x = document.getElementById("category-type-info");
    // console.log(x.style)
    if (x.style.display === "none" || !x.style.display) {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  });
  // create a function to hide and display information when info icon is pressed
  $("#report-score-info-icon").on("click", function() {
    var x = document.getElementById("report-score-info");
    // console.log(x.style)
    if (x.style.display === "none" || !x.style.display) {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  });
});
