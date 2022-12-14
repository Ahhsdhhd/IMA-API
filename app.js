const express = require("express");

const path = require("path");

var fs = require("fs");

const url =
  "mongodb+srv://abhinav:UX9pfpf8NmpUMT6Z@leetwolf-e0.vquxe.mongodb.net/billing?retryWrites=true&w=majority";

const port = process.env.port || 3000;

//heroku

const ReportForm = require("./routes/Reports-routes");

const authRoute = require("./routes/auth-route");

var courseRoute = require("./routes/addCourse-route");

var gcformRoute = require("./routes/gcform-route");

var expenditureFormRoute = require("./routes/expenditureForm-route");

var billingFormRoute = require("./routes/billingForm-route");

var cdaFormRoute = require("./routes/cda-route");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const cors = require("cors");

const cert = fs.readFileSync("./ssl/cert.crt");

const ca = fs.readFileSync("./ssl/ca.crt");

const key = fs.readFileSync("./ssl/private.key");

var https = require("https");
const { db } = require("./models/user");

mongoose.connect(url, (err, db) => {
  if (err) throw err;
});

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

//auth route

app.use("/auth", authRoute);

app.use(express.static("frontend"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/index.html"));
});

//for netlify

//courses route

app.use("/courses", courseRoute);

//cadets info route
app.use("/gcform", gcformRoute);

//expenditureForm Route

app.use("/expenditureForm", expenditureFormRoute);

//billingform route
app.use("/billingForm", billingFormRoute);

//cda form
app.use("/cdaForm", cdaFormRoute);

//reports

app.use("/reportsForm", ReportForm);

/////ssl

////let options = {
///  cert: cert, // fs.readFileSync('./ssl/example.crt');
////  ca: ca, // fs.readFileSync('./ssl/example.ca-bundle');
///  key: key // fs.readFileSync('./ssl/example.key');
///};

// also okay: https.createServer({cert, ca, key}, (req, res) => { ...
////const httpsServer = https.createServer(options,app);

// httpsServer.listen(port, ()=>{

//console.log("conn" ,port)
////})

///404 Error handler

///app.use((req,res,next)=>{

// next(createError(404));
//});
//base route
app.get("/", (req, res) => {
  res.send("invalid endpoint");
});

//app.use(function(err, req ,res, next){

//console.error(err.message);
//if(!err.statusCode) err.statusCode =500;
//res.status(err.statusCode).send(err.message);

//});

//delete this local host
app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});

//create port
