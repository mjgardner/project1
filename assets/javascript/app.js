<<<<<<< HEAD


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
 
=======
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
>>>>>>> 9b582bd68f3ae2c5d8e94155073bf3f0589a69c3
