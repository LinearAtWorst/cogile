$(document).ready(function() {
  $("button").click(function() {
    $.get({
      url: "demo_test.txt",
      success: function(result) {
        $("#div1").html(result);
      }
    });
  });
});