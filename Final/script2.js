$(function () {
  let data = {
    title: "Don2",
  };
  $.ajax({
    type: "POST",
    url: "http://localhost:3103/delete_movie",
    data: data,
    success: function () {
      console.log("done");
    },
    error: () => {
      console.log("error");
    },
  });
});
