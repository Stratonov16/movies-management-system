$(function () {
  // let staff;
  // fetch("http://localhost:3103/show_staff")
  //   .then((response) => response.text())
  //   .then((response) => {
  //     console.log(typeof response + " lol");
  //     staff = response.toString();
  //     staff = JSON.parse(staff);
  //     console.log(staff + " staff");
  //     console.log(typeof staff[0]);
  //   })
  //   .catch((err) => console.log("err"));

  let first_name = $("#firstName");
  let last_name = $("#lastName");
  let date = $("#date");
  let month = $("#month");
  let year = $("#year");
  let street = $("#street");
  let city = $("#city");
  let state = $("#state");
  let pin = $("#pin");

  document.getElementById("add_db").onclick = function () {
    let name = {
      first_name: first_name.val().toUpperCase(),
      last_name: last_name.val().toUpperCase(),
      street: street.val(),
      city: city.val(),
      state: state.val(),
      pin: parseInt(pin.val()),
    };
    $.ajax({
      type: "POST",
      url: "http://localhost:3103/check_producer",
      data: name,
      success: function () {
        console.log("done");
      },
      error: () => {
        console.log("error");
      },
    });
    setTimeout(() => {
      location.reload();
    }, 1000);
  };

  // setTimeout(() => {
  //   let present = 0;
  //   document.getElementById("add_db").onclick = function () {
  //     for (let i in staff) {
  //       console.log(
  //         first_name.val(),
  //         " ",
  //         staff[i].First_name,
  //         last_name.val(),
  //         " ",
  //         staff[i].Last_name
  //       );
  //       if (
  //         first_name.val() == staff[i].First_name &&
  //         last_name.val() == staff[i].Last_name
  //       ) {
  //         present = 1;
  //         console.log("present");

  //         break;
  //       }
  //     }
  //     if (present == 0) {
  //       let data = {
  //         first_name: first_name.val(),
  //         last_name: last_name.val(),
  //         date: date.val(),
  //         month: month.val(),
  //         year: year.val(),
  //         staff_type: job,
  //         role: comment.val(),
  //       };
  //      // console.log(data);

  //       // $.ajax({
  //       //   type: "POST",
  //       //   url: "http://localhost:3103/add_staff",
  //       //   data: data,
  //       //   success: function () {
  //       //     console.log("done");
  //       //   },
  //       //   error: () => {
  //       //     console.log("error");
  //       //   },
  //       // });
  //     }
  //   };
  // }, 2000);
  document.getElementById("submit").onclick = () => {
    $.ajax({
      type: "POST",
      url: "http://localhost:3103/produced_by",
      data: name,
      success: function () {
        console.log("done");
      },
      error: () => {
        console.log("error");
      },
    });
    setTimeout(() => {
      window.location = "movie.html";
    }, 1000);
  };
});
