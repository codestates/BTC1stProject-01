var createError = require("http-errors");
var path = require("path");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var mongoose = require("mongoose");
var dotenv = require("dotenv");
var env = process.env;
dotenv.config();

mongoose
  .connect(`mongodb+srv://NMM:${env.DB_PASSWORD}@cluster0.qzh54.mongodb.net/harmony-testnet?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) //몽고디비접속
  .then(() => {
    app.listen(app.get("port"), () => {
      console.log(`app is listening in http://localhost:${app.get("port")}`);
    });
  })
  .catch((err) => console.log(err));

var app = express();
var indexRouter = require("./routes/index");
var SearchRouter = require("./routes/search");
const port = 3001;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use("/", indexRouter);
app.use("/search", SearchRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use((req, res) => {
  res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.set("port", port);

module.exports = app;
