$(function () {
  function goToDecs(movie_name) {
    console.log(movie_name);
    localStorage.setItem("movie_name", movie_name);
    window.location = "desc.html";
  }
  function seen(movie_name) {
    console.log("iheiwb");
  }
  window.goToDecs = goToDecs;
  let movies;
  $.ajax({
    // Our sample url to make request
    url: "http://localhost:3103/get_movies",

    type: "GET",

    success: function (data) {
      var x = data;
      //console.log(x);
      movies = x;
      console.log(movies);
      var titlearray = [];
      var rating = [];
      let url = [];
      for (let i = 0; i < movies.length; i++) {
        titlearray.push(movies[i].title);
        rating.push(movies[i].rating);
        url.push(movies[i].url);
      }

      var dynamic = document.querySelector(".container");
      for (var i = 0; i < titlearray.length; i++) {
        var fetch = document.querySelector(".container").innerHTML;
        dynamic.innerHTML =
          `<div id="cards${i}" class="boxes" onClick="goToDecs('${titlearray[i]}')">
      <div class="box-content">
        <h2>${titlearray[i]}</h2>
        <p>
          ${rating[i]}
        </p>
        <a class="showmore" href="#">ReadMore</a>
       
      </div>
    </div>` + fetch;
        var bgimg = document.getElementById(`cards${i}`);
        bgimg.style.backgroundImage = `url(${url[i]})`;
      }
    },
    error: function (error) {
      console.log(`Error ${error}`);
    },
  });
});
