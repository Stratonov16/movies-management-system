$(function () {
  //Now only shlok knows this what he has written
  const signUpButton = document.getElementById("signUp");
  const signInButton = document.getElementById("signIn");
  const container = document.getElementById("container");

  signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
  });

  signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
  });

  document.getElementById("sign_up").onclick = function () {
    let fn = document.getElementById("fn");
    let ln = document.getElementById("ln");
    let email = document.getElementById("email_id");
    let pass = document.getElementById("password");
    let day = document.getElementById("day");
    let month = document.getElementById("month");

    let year = document.getElementById("year");

    let first_name = fn.value;
    let last_name = ln.value;
    let email_address = email.value;
    let password = pass.value;
    let confirm_pass = document.getElementById("confirm_pass");
    if (password != confirm_pass.value) {
      alert("Passwords Dont match");
    } else {
      let datau = {
        Password: password,
        First_Name: first_name,
        last_Name: last_name,
        Day: day.value,
        Month: month.value,
        Year: year.value,
        Email: document.getElementById("email_id").value,
      };
      document.getElementById("sign_up").onclick = function () {
        let user_name = {
          First_Name: first_name,
          Last_Name: last_name,
        };
        let user_there = 0;
        $.ajax({
          type: "GET",
          url: `http://localhost:3103/check_user/${first_name}/${last_name}`,
          success: function (data) {
            console.log("done AND DATA IS", data);
            if (data === "1") {
              user_there = 1;
              alert("User is already Signed UP");
              location.reload();
            } else {
              $.ajax({
                type: "POST",
                url: "http://localhost:3103/add_user",
                data: datau,
                success: function () {
                  console.log("done");
                },
                error: () => {
                  console.log("error");
                },
              });
            }
            console.log(data, " data is");
            console.log(user_there, " user_thers is");
          },
          error: () => {
            console.log("error");
          },
        });
        console.log("user_there val ", user_there);
      };
    }
  };
  document.getElementById("sign_in").onclick = function () {
    let email = document.getElementById("login_email").value;
    let password = document.getElementById("login_password").value;
    let login_details = {
      Email: email,
      password: password,
    };
    console.log(login_details);

    $.ajax({
      type: "GET",
      url: "http://localhost:3103/login",
      data: login_details,

      success: function (data) {
        console.log("done");
        if (data == "0") {
          alert("wrong email or password");
          location.reload();
        } else {
          if (email == "Admin@Admin") window.location = "admin-dashboard.html";
          else window.location = "user.html";
        }
      },
      error: () => {
        console.log("error");
      },
    });
  };
});
