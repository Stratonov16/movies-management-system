$(function () {
  $.ajax({
    // Our sample url to make request
    url: `http://localhost:3103/get_all_movies`,

    type: "GET",

    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        $("#movie_list").append(
          `<li style="font-size:30px;">${data[i].id} - ${data[i].title}</li>`
        );
      }
    },
    error: function (error) {
      console.log(`Error ${error}`);
    },
  });
  document.getElementById("delete").onclick = function () {
    let del_movie = { id: document.getElementById("movie_id").value };
    $.ajax({
      // Our sample url to make request
      url: `http://localhost:3103/delete_movie`,

      type: "POST",
      data: del_movie,
      success: function (data) {},
      error: function (error) {
        console.log(`Error ${error}`);
      },
    });
    setTimeout(() => {
      location.reload();
    }, 500);
  };
});
