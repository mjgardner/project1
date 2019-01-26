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
            
             $("#reputation-level-display").empty(); 
             $("#report-score-display").empty(); 
             $("#category-type-display").empty(); 


            // set map and place marker
            if (results.reversePhone) {
              if (results.reversePhone.current_addresses[0]) {
                if (results.reversePhone.current_addresses[0].lat_long) {
                  var latLong = results.reversePhone.current_addresses[0].lat_long;

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
