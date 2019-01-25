var whitePagesKey = "382fe41a61544d38a63b00ceec5711d3";

function lookup(phoneNumber) {
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
        },
        error: ajaxError
      });
    },
    error: ajaxError
  });
}

function ajaxError(xhr) {
  console.log('error: ' + xhr.status);
}
