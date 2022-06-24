$(function () {
  var present;
  let add_db = $("#add_db");
  add_db.click(function () {
    let data = {
      title: document.getElementById("movieTitle").value,
    };
    console.log(data.title);

    $.ajax({
      type: "POST",
      url: "http://localhost:3103/check_movie_in_db",
      data: data,
      success: function () {
        console.log("done");
      },
      error: () => {
        console.log("error");
      },
    });

    setTimeout(() => {
      fetch("http://localhost:3103/present_val")
        .then((response) => response.text())
        .then((response) => {
          console.log(typeof response + " lol");
          present = response.toString();
          console.log(present + " present");
        })
        .catch((err) => console.log("err"));
    }, 400);
    setTimeout(() => {
      let language = "";
      if ($("#hindi").is(":checked")) language += "Hindi ";
      if ($("#english").is(":checked")) language += "English ";
      if ($("#punjabi").is(":checked")) language += "Punjabi ";
      if ($("#marathi").is(":checked")) language += "Marathi ";
      if ($("#telugu").is(":checked")) language += "Telugu ";
      if ($("#tamil").is(":checked")) language += "Tamil ";
      if ($("#kannada").is(":checked")) language += "Kannada ";
      console.log(language);
      let genre = [];
      if ($("#thriller").is(":checked")) genre.push("Thriller");
      if ($("#horror").is(":checked")) genre.push("Horror");
      if ($("#comedy").is(":checked")) genre.push("Comedy");

      if ($("#romance").is(":checked")) genre.push("Romance");
      if ($("#sci-fi").is(":checked")) genre.push("Sci-Fi");
      if ($("#psycological").is(":checked")) genre.push("Psycological");
      if ($("#fiction").is(":checked")) genre.push("Fiction");
      if ($("#action").is(":checked")) genre.push("action");
      if ($("#adventure").is(":checked")) genre.push("Adventure");
      if ($("#sports").is(":checked")) genre.push("Sports");
      if ($("#biopic").is(":checked")) genre.push("Biopic");
      if ($("#documentry").is(":checked")) genre.push("Documentry");

      let platform = [];
      if ($("#netflix").is(":checked")) platform.push("NETFLIX");
      if ($("#amazon").is(":checked")) platform.push("Amazon Prime");
      if ($("#youtube").is(":checked")) platform.push("Youtube");
      if ($("#imdb").is(":checked")) platform.push("IMDB TV");
      if ($("#hotstar").is(":checked")) platform.push("Hotstar");
      if ($("#sonyliv").is(":checked")) platform.push("Sony Liv");
      if ($("#hbo").is(":checked")) platform.push("HBO max");
      if ($("#hulu").is(":checked")) platform.push("Hulu");
      console.log(platform);

      let plot = $("#comment").val();
      let popularity = $("#popularity").val();
      let rating = parseInt($("#number").val());
      let datee = $("#date").val();
      let monthh = $("#month").val();
      let yearr = $("#year").val();
      datee =
        yearr.toString() + "-" + monthh.toString() + "-" + datee.toString();
      console.log(typeof present + "kkkk");
      if (present === "0") {
        console.log("in here");
        let data = {
          title: document.getElementById("movieTitle").value,
          language: language,
          plot: plot,
          release_date: datee,
          month: monthh,
          year: yearr,
          rating: rating,
          platform: platform,
          genre: genre,
          url: $("#url_img").val(),
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
      }
    }, 1000);
    setTimeout(function () {
      console.log("clicked");
      window.location.href = "staff.html";
    }, 1500);
  });
});
