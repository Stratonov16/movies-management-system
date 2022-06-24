$(function () {
  $.ajax({
    // Our sample url to make request
    url: `http://localhost:3103/get_decs/${localStorage.getItem("movie_name")}`,

    type: "GET",

    success: function (data) {
      console.log("fetching decs page and the data is ", data);
      document.getElementById(
        "image_movie"
      ).style.backgroundImage = `url('${data[0][0].url}')`;
      document.getElementById("movie_desc").textContent = data[0][0].plot;
      let d = "";
      for (let i = 0; i < 10; i++) d += data[0][0].release_date[i];
      document.getElementById("date").textContent = d;
      document.getElementById("rating").textContent = data[0][0].rating;
      document.getElementById("name").textContent = data[0][0].title;

      document.getElementById("f1").textContent = data[1][0].First_name;
      document.getElementById("l1").textContent = data[1][0].Second_name;
      document.getElementById("f2").textContent = data[2][0].First_name;
      document.getElementById("l2").textContent = data[2][0].Second_name;
      document.getElementById("genre").textContent =
        data[3][0].Genre + " , " + data[3][1].Genre;
    },
    error: function (error) {
      console.log(`Error ${error}`);
    },
  });
  localStorage.clear();
  document.getElementById("back").onclick = () => {
    window.location = "user.html";
  };
});
