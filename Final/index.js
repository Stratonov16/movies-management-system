// const { create } = require("domain");
const express = require("express");
const mysql = require("mysql");

const app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.disable("etag");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234567890",
  database: "Movie_Management",
});

let producers_in_movie = [];
let genre_of_movie;

db.connect((err) => {
  if (err) throw err;
  else console.log("Connection Established.....");
});

let present = 0;

app.listen("3103", () => {
  console.log("Server started on port 3103");
});

app.get("/create_table_movie", (req, res) => {
  let sql =
    "CREATE TABLE Movie(id int AUTO_INCREMENT ,title VARCHAR(255),language VARCHAR(255),plot VARCHAR(255),release_date DATE,month VARCHAR(255),year int,rating int, PRIMARY KEY(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    else console.log(result);
    return res.send("Movie table created");
  });
});

// format of date in mysql is YYYY-MM-DD

// app.get("/movie_in_db",(req,res)=>{
//   let sql =`SELECT Movie_id from Movie where title=${req.body.title}`;
// }
let platform = [];
app.post("/add_movie", async (req, res) => {
  platform = await req.body.platform;
  console.log(req.body);
  let movie = {
    title: req.body.title,
    language: req.body.language,
    plot: req.body.plot,
    release_date: req.body.release_date,
    month: req.body.month,
    year: req.body.year,
    rating: req.body.rating,
    url: req.body.url,
  };
  genre_of_movie = await req.body.genre;
  console.log(genre_of_movie);
  let sql = "INSERT into Movie SET ?";
  let query = db.query(sql, movie, (err, res) => {
    if (err) console.log(err);
    else console.log("Movie added");
  });
  for (let i = 0; i < platform.length; i++) {
    let plat = {
      Platform_Name: platform[i],
    };
    let resp;
    let sql1 = "SELECT Platform_id from Platforms where ?";
    let query1 = db.query(sql1, plat, async (err, res) => {
      if (err) console.log(err);
      else console.log("");
      resp = await res;
      console.log(resp, " resp");
      if (resp.length == 0) {
        let plat_dets = {
          Platform_Name: platform[i],
          Cost_Per_Month: 299,
        };
        let sql2 = "INSERT INTO Platforms SET ?";
        let query2 = db.query(sql2, plat_dets, async (err, res) => {
          if (err) console.log(err);
          else console.log("");
        });
      }
    });
    // setTimeout(() => {

    // }, 1000);
  }
});
app.get("/get_movies", (req, res) => {
  let sql = "SELECT * from Movie order by(rating)";
  let query = db.query(sql, async (err, resp) => {
    if (err) console.log(err);
    else {
      //console.log(await resp);
      return res.send(await resp);
    }
  });
});

app.post("/delete_movie", (req, res) => {
  console.log(req.body);
  let movie = {
    id: req.body.id,
  };
  let sql = "DELETE from Movie where ?";
  let query = db.query(sql, movie, (err, res) => {
    if (err) console.log(err);
    else console.log("Movie deleted");
  });
});

app.post("/check_movie_in_db", (req, res) => {
  let movie_title = {
    title: req.body.title,
  };
  //movie_title.toUpperCase();
  console.log(req.body.title + " from server");
  let sql = "SELECT id from Movie where ?";
  let query = db.query(sql, movie_title, (err, res) => {
    if (err) console.log(err);
    else console.log("DB checked");
    console.log(res);
    if (res[0] == undefined) present = 0;
    else present = 1;
    console.log("present = ", present);
  });
});

app.get("/present_val", (req, res) => {
  return res.send(present.toString());
});

app.get("/show_staff", (req, res) => {
  let sql = "SELECT * from Staff";
  var staff;
  db.query(sql, (err, res) => {
    if (err) console.log(err);
    else console.log("Staff");
    staff = res;
    //console.log(staff);
    //res.send(JSON.stringify(res));
  });
  setTimeout(() => {
    console.log(staff);
    return res.send(JSON.stringify(staff));
  }, 500);
});
// app.post("/add_staff", (req, res) => {
//   console.log(req.body);
//   let movie = {
//     First_name: req.body.first_name,
//     Second_name: req.body.last_name,
//     Date: req.body.date,
//     Month: req.body.month,
//     Year: req.body.year,
//   };
//   let sql = "INSERT into Staff SET ?";
//   let query = db.query(sql, movie, (err, res) => {
//     if (err) console.log(err);
//     else console.log("Staff added");
//   });
//   setTimeout(() => {
//     let sql = "SELECT MAX( id ) FROM Movie";
//     let movie_id;
//     let query = db.query(sql, movie, (err, res) => {
//       if (err) console.log(err);
//       else movie_id = JSON.parse(JSON.stringify(res));
//       console.log(Object.values(movie_id[0])[0]);
//       movie_id = Object.values(movie_id[0])[0];
//     });
//   }, 1000);
// });
//Function that check if staff is already there in db
//If not then add that in db
app.post("/check_staff", async (req, res) => {
  let roleDesc = await req.body.role;
  let job = await req.body.staff_type;
  console.log(job);
  let name = {
    First_name: await req.body.first_name,
    Second_name: await req.body.last_name,
    Date: parseInt(await req.body.date),
    Month: parseInt(await req.body.month),
    Year: parseInt(await req.body.year),
  };
  let mini = {
    First_name: await req.body.first_name,
    Second_name: await req.body.last_name,
  };
  console.log(typeof mini.First_name, " type of name");
  console.log("hit");
  //check if it's already there, if not then add
  let sql =
    "SELECT Staff_id from Staff where First_name = ? and Second_name = ?";
  let query = db.query(
    sql,
    [mini.First_name, mini.Second_name],
    async (err, res) => {
      if (err) console.log(err);
      // else console.log("Staff added");

      let data = await res;

      //console.log(res[0].Staff_id);

      if (res.length === 0) {
        let sql = `INSERT INTO STAFF SET ?`;
        let query = db.query(sql, name, (err, res) => {
          if (err) console.log(err);
          else console.log("Staff is added in table");
        });
      } else console.log("Person is already in Staff table");
    }
  );

  setTimeout(() => {
    let staffId, movieId;
    //get staff id
    let sql1 =
      "SELECT Staff_id from Staff where First_name = ? and Second_name = ?";
    let query1 = db.query(
      sql1,
      [mini.First_name, mini.Second_name],
      async (err, res) => {
        if (err) console.log(err);
        // else console.log("Staff added");
        let data = await res;
        console.log(data[0].Staff_id);
        staffId = data[0].Staff_id;
        console.log("staff id upr wala ", staffId);
      }
    );

    //get movie id
    let sql2 = "SELECT MAX( id ) FROM Movie";
    let query2 = db.query(sql2, async (err, res) => {
      if (err) console.log(err);
      // else console.log("Staff added");
      let data = await res;
      movieId = JSON.parse(JSON.stringify(await res));
      //console.log(Object.values(movieId[0])[0]);
      movieId = Object.values(movieId[0])[0];
    });

    //put this in obj
    setTimeout(() => {
      let role = {
        Movie_id: movieId,
        Staff_id: staffId,
        Role: roleDesc,
      };
      //try to put in acts table
      console.log("Staff_id ", role.Staff_id);
      console.log("movie_id ", role.Movie_id);
      console.log("Role ", role.Role);
      let sql3 = `INSERT INTO Acts SET ?`;
      let query3 = db.query(sql3, role, (err, res) => {
        if (err) console.log(err);
        else console.log("Role is added in Acts table");
      });
      for (let i = 0; i < genre_of_movie.length; i++) {
        let genre_date = {
          Genre: genre_of_movie[i],
          Movie_id: movieId,
        };
        let sql_genre = "INSERT INTO Genre SET ?";
        let query_genre = db.query(sql_genre, genre_date, (err, res) => {
          if (err) console.log(err);
          else console.log("Genre is added in Gnere table");
        });
      }
      genre_of_movie = [];
      for (let i = 0; i < platform.length; i++) {
        let avaliability = {
          Platform_Name: platform[i],
        };
        let sql_plat_id = "SELECT Platform_id FROM Platforms where ?";
        let query_plat_id = db.query(
          sql_plat_id,
          avaliability,
          async (err, res) => {
            if (err) console.log(err);
            else console.log("Avaliability is added in Availability table");
            let aval = {
              Platform_id: await res[0].Platform_id,
              Movie_id: movieId,
            };
            console.log(await res[0].Platform_id, " this is plat id");
            let sql_aval = "INSERT INTO Availability SET ?";

            let query_aval = db.query(sql_aval, aval, (err, res) => {
              if (err) console.log(err);
              else console.log("Avaliability is added in Availability table");
            });
          }
        );
      }
    }, 1500);
    setTimeout(() => {
      for (let i = 0; i < job.length; i++) {
        let role = {
          Movie_id: movieId,
          Staff_id: staffId,
          Staff_Type: job[i],
        };
        //try to put in acts table
        console.log("Staff_id ", role.Staff_id);
        console.log("movie_id ", role.Movie_id);
        let sql3 = `INSERT INTO Acts_Type SET ?`;
        let query3 = db.query(sql3, role, (err, res) => {
          if (err) console.log(err);
          else console.log("Acts_Type updated");
        });
      }
    }, 1500);
  }, 1500);
  //Put role in acts table
});

app.post("/check_producer", async (req, res) => {
  let prod_data = {
    First_Name: await req.body.first_name,
    Second_Name: await req.body.last_name,
    Street: await req.body.street,
    City: await req.body.city,
    State: await req.body.state,
    Pin: await req.body.pin,
  };
  let mini = {
    First_Name: await req.body.first_name,
    Second_Name: await req.body.last_name,
  };
  console.log(typeof mini.First_Name, " type of name");
  console.log("hit");
  //check if it's already there, if not then add
  let sql =
    "SELECT Producer_id from Producer where First_Name = ? and Second_Name = ?";
  let query = db.query(
    sql,
    [mini.First_Name, mini.Second_Name],
    async (err, res) => {
      if (err) console.log(err);
      // else console.log("Staff added");

      let data = await res;
      producers_in_movie.push(mini.First_Name);
      producers_in_movie.push(mini.Second_Name);
      //console.log(res[0].Staff_id);

      if (data.length === 0) {
        let sql = `INSERT INTO Producer SET ?`;
        let query = db.query(sql, prod_data, (err, res) => {
          if (err) console.log(err);
          else console.log("Staff is added in table");
        });
      } else console.log("Person is already in Staff table");
    }
  );
});

app.post("/produced_by", async (req, res) => {
  let sql2 = "SELECT MAX( id ) FROM Movie";
  let query2 = db.query(sql2, async (err, res) => {
    if (err) console.log(err);
    let movie_id = parseInt(Object.values(await res[0])[0]);
    console.log(parseInt(Object.values(res[0])[0]), " produced_by");
    console.log(producers_in_movie);
    let prod_ids;
    // setTimeout(() => {
    for (let i = 0; i < producers_in_movie.length; i += 2) {
      let sql3 =
        "SELECT Producer_id FROM Producer where First_Name= ? and Second_Name=?";
      let query3 = db.query(
        sql3,
        [producers_in_movie[i], producers_in_movie[i + 1]],
        async (err, res) => {
          console.log(await res, " res in produced_by");
          prod_ids = await res[0].Producer_id;
          // insert into produced_by here only
          let final_data = {
            Movie_id: movie_id,
            Producer_id: prod_ids,
          };
          let sql4 = "INSERT INTO Produced_By SET ?";
          let query4 = db.query(sql4, final_data, async (err, res) => {
            if (err) console.log(err);
            else console.log("deed done", " ", prod_ids, " ", movie_id);
          });
        }
      );
    }
    // }, 500);
    console.log(prod_ids);
    producers_in_movie = [];
  });
});

app.get("/get_decs/:movie", (req, res) => {
  let page_html;
  let movie_data;
  let final_data = [];
  console.log(req.params.movie);
  let data = { title: req.params.movie };
  let sql = "SELECT * from Movie where ?";
  var staff;
  db.query(sql, data, async (err, res_in) => {
    if (err) console.log(err);
    else console.log("data");
    staff = await res_in;
    console.log(await res_in[0].id);
    movie_data = await res_in[0];
    let arr = [];
    arr.push(movie_data);
    final_data.push(arr);

    let staff_data = {
      Movie_id: await res_in[0].id,
    };
    let staff_ids = [];
    console.log(staff_data.Movie_id, " movie id from staff_data");
    let acts_sql = "SELECT * from Acts where ?";
    db.query(acts_sql, staff_data, async (err, res_acts) => {
      if (err) console.log(err);
      else console.log("data");

      console.log(await res_acts);
      for (let i = 0; i < (await res_acts.length); i++) {
        staff_ids.push(res_acts[i].Staff_id);
      }
      console.log(staff_ids);
      let staff_names_sql = "SELECT * from Staff where ?";
      let staff_names = [];
      for (let i = 0; i < staff_ids.length; i++) {
        let staff_name_data = {
          Staff_id: staff_ids[i],
        };
        db.query(staff_names_sql, staff_name_data, async (err, res_staff) => {
          if (err) console.log(err);
          else console.log("data");

          console.log(await res_staff);
          let tarr = [];
          for (let i = 0; i < (await res_staff.length); i++) {
            staff_names.push(await res_staff[i].First_name);
            staff_names.push(await res_staff[i].Second_name);
            tarr.push(await res_staff[i]);
            console.log(await res_staff[i], " this is res_staff[i]");
            final_data.push(tarr);
            tarr = [];
          }
          console.log(staff_data.Movie_id, "this is movie id");
          console.log(final_data.length, " this is the final data");
          let genre_query = "SELECT * FROM Genre where ?";
          let garr = [];
          setTimeout(() => {
            db.query(genre_query, staff_data, async (err, res_genre) => {
              for (let i = 0; i < (await res_genre.length); i++)
                garr.push(res_genre[i]);
              console.log(await res_genre, "this is genre data");
              final_data.push(garr);
            });
          }, 600);

          setTimeout(() => {
            res.status(200).send(final_data);
          }, 1000);
          //return;
        });
      }
    });

    //save the staff id and get the staff names from Staff table
    // Render the HTML Page
  });
});

app.post("/add_user", (req, res) => {
  console.log(req.body);
  let user_data = {
    Password: req.body.Password,
    First_Name: req.body.First_Name,
    last_Name: req.body.last_Name,
    Day: req.body.Day,
    Month: req.body.Month,
    Year: req.body.Year,
    Email: req.body.Email,
  };
  let sql = "INSERT into USER SET ?";
  let query = db.query(sql, user_data, (err, res) => {
    if (err) console.log(err);
    else console.log("USER ADDED");
  });
});
app.get("/check_user/:name1/:name2", (req, res) => {
  console.log(req.params);

  let check_user_data = {
    First_Name: req.params.name1,
    Last_Name: req.params.name2,
  };
  let sql = "SELECT User_id from USER where First_Name=? and Last_Name=?";
  console.log("out");
  let query = db.query(
    sql,
    [check_user_data.First_Name, check_user_data.Last_Name],
    async (err, resp) => {
      console.log("in");
      if (err) console.log(err);
      else console.log(await resp.length, "lolollllo");
      let ans = "1";

      if ((await resp.length) == 0) ans = "0";
      res.send(ans);
      return;
    }
  );
});
app.get("/login", (req, res) => {
  console.log(req.query);
  let login_details = {
    Email: req.query.Email,
    password: req.query.password,
  };

  let sql = "SELECT User_id from USER where Email=? and password=?";
  console.log("out");
  let query = db.query(
    sql,
    [login_details.Email, login_details.password],
    async (err, resp) => {
      console.log("in");
      if (err) console.log(err);
      else console.log(await resp.length, "lolollllo");
      let aans = "1";
      if ((await resp.length) == 0) aans = "0";
      res.send(aans);
      return;
    }
  );
});

app.get("/get_all_movies", (req, res) => {
  let sql = "SELECT * from Movie";
  let query = db.query(sql, async (err, resp) => {
    console.log(await resp);
    res.send(resp);
    return;
  });
});
