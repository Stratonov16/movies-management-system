$(function () {
  let data = {
    title: "kkk",
    language: "telugu",
    plot: "A tale of two legendary revolutionaries and their journey far away from home.",
    release_date: "xx-02-23",
    month: "February",
    year: 2022,
    rating: 5,
  };
  $.ajax({
    type: "POST",
    url: "http://localhost:3103/add_movie",
    data: data,
    success: function () {
      console.log("done");
    },
    error: () => {
      console.log("error");
    },
  });
});
