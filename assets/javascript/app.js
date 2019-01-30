var whitePagesKey = '382fe41a61544d38a63b00ceec5711d3';
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

$(function() {
  $('#submitbutton').click(function(event) {
    event.preventDefault();
    var phoneNumber = $('#exampleInputPhoneNumber').val().trim();

    var url = {
      phoneReputation:
        'https://proapi.whitepages.com/3.0/phone_reputation?api_key=' +
        whitePagesKey +
        '&phone=' +
        phoneNumber,
      reversePhone:
        'https://proapi.whitepages.com/3.0/phone?api_key=' +
        whitePagesKey +
        '&phone=' +
        phoneNumber
    };

    var results = {};
    $.ajax({
      url: url.reversePhone,
      method: 'GET',
      success: function(response) {
        results['reversePhone'] = response;
        $.ajax({
          url: url.phoneReputation,
          method: 'GET',
          success: function(response) {
            results['phoneReputation'] = response;
            console.log(results);
           
            results.dateAdded = firebase.database.ServerValue.TIMESTAMP;

            database.ref().push(results);
            
            database.ref().on("child_added", function(childSnapshot) {
              console.log(childSnapshot.val());

              var phoneNumber = childSnapshot.val().reversePhone.phone_number;
              var category = childSnapshot.val().phoneReputation.reputation_details.category;
              var repLevel = childSnapshot.val().phoneReputation.reputation_level;
              var repScore = childSnapshot.val().phoneReputation.reputation_details.score;
              var dateAdded = dayjs(childSnapshot.val().dateAdded).format('MM D YYYY');

              var newRow = $("<tr>").append(
                $("<td>").text(dateAdded),
                $("<td>").text(phoneNumber),
                $("<td>").text(category),
                $("<td>").text(repLevel),
                $("<td>").text(repScore)
              );
              
              $("#savedScores  > tbody").append(newRow);
            });  
            

             var reputationLevel = response.reputation_level;
             var categoryType = response.reputation_details.category;
             var reputationScore = response.reputation_details.score; 

              $("#reputation-level-display").html(repuationLevel);
              console.log(reputationLevel);
              $("#report-score-display").html(reputationScore);
              console.log(reputationScore);
        
              if (categoryType === null) {
              $("#category-type-display").html("None")
              console.log("None");
               }
               
              else {
                $("#category-type-display").html(categoryType);
                console.log(categoryType);
                }


            // set address, map and place marker
            if (results.reversePhone) {
              var address = results.reversePhone.current_addresses[0];
              if (address) {
                $('#address-display').html(
                  address.street_line_1 + '<br>' +
                  (address.street_line_2 ? address.street_line_2 + '<br>' : '') +
                  address.city + ', ' + address.state_code + ' ' + address.postal_code +
                  (address.zip4 ? '-' + address.zip4 : '')
                );
                if (address.lat_long) {
                  var latLong = address.lat_long;

                  map = new google.maps.Map(document.getElementById('map-appears-here'), {
                    center: {lat: latLong.latitude, lng: latLong.longitude},
                    zoom: 8
                  });
                  marker = new google.maps.Marker({
                    position: {lat: latLong.latitude, lng: latLong.longitude},
                    map: map,
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
  var houstonTxLatLng = {lat: 29.762778, lng: -95.383056};
  map = new google.maps.Map(document.getElementById('map-appears-here'), {
    center: houstonTxLatLng,
    zoom: 8
  });
}

function ajaxError(xhr) {
  console.log('error: ' + xhr.status);
}
$(document).ready(function(){

  // create a function to hide and display information when info icon is pressed
  $("#reputation-level-info-icon").on("click", function(){
      var x = document.getElementById("reputation-level-info");
      // console.log(x.style)
      if (x.style.display === "none" || !x.style.display) { 
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
  })
  // create a function to hide and display information when info icon is pressed
  $("#category-type-info-icon").on("click", function(){
      var x = document.getElementById("category-type-info");
      // console.log(x.style)
      if (x.style.display === "none" || !x.style.display) {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
      })
  // create a function to hide and display information when info icon is pressed
  $("#report-score-info-icon").on("click", function(){
      var x = document.getElementById("report-score-info");
      // console.log(x.style)
      if (x.style.display === "none" || !x.style.display) {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
  })
})

