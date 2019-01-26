<<<<<<< HEAD
var whitePagesKey = '382fe41a61544d38a63b00ceec5711d3';
var map;
var marker;

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
=======


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAvvvOlr-YOqg3zdrTOeg8Dnmu1Y-A5SBA",
    authDomain: "whos-calling-me-1548382086597.firebaseapp.com",
    databaseURL: "https://whos-calling-me-1548382086597.firebaseio.com",
    projectId: "whos-calling-me-1548382086597",
    storageBucket: "",
    messagingSenderId: "903989663896"
  };
  firebase.initializeApp(config);
 
var api_key = {
  whitepages: "382fe41a61544d38a63b00ceec5711d3",
};

function lookup(phoneNumber) {
  var url = {
    phone_reputation:
      "https://proapi.whitepages.com/3.0/phone_reputation?api_key=" +
      api_key.whitepages +
      "&phone=" +
      phoneNumber,
    reverse_phone:
      "https://proapi.whitepages.com/3.0/phone?api_key=" +
      api_key.whitepages +
      "&phone=" +
      phoneNumber
  };

  var results = {};
  $.ajax({
    url: url.reverse_phone,
    method: "GET",
    success: function(response) {
      results["reverse_phone"] = response;
      $.ajax({
        url: url.phone_reputation,
        method: "GET",
        success: function(response) {
          results["phone_reputation"] = response;
          console.log(results);
        },
        error: function(xhr) {
          console.log("error: " + xhr.status);
        }
      });
    },
    error: function(xhr) {
      console.log("error: " + xhr.status);
    }
>>>>>>> pull from master
  });
});

function ajaxError(xhr) {
  console.log('error: ' + xhr.status);
}

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
