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
  });
}
