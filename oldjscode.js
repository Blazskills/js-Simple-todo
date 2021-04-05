//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const date = require(__dirname + "/date.js");

const app = express();


app.set("view engine", 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(express.static('public'))



mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const userSchema = new mongoose.Schema({
  name: String,
  age: Number,

});


const User = mongoose.model("User", userSchema);

const user = new User({
  name: "adebare",
  age: 21
});

// user.save()



User.find(function (err, users) {
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.close();
    users.forEach(function (user) {
      console.log(user.name);


    });

  }
})


let items = ['Buy food', 'Code', 'Decagon Project'];
let workItems = [];











//Index route
app.get("/", function (req, res) {
  let day = date.getDate();

  res.render("list", {
    listTitle: day,
    newListItems: items,

  });
});



app.post("/", function (req, res) {

  let item = req.body.newItem;
  if (req.body.newItem === '') {
    console.log('empty data')
    res.redirect('/');
  } else {
    if (req.body.list === 'Work') {
      workItems.push(item);
      res.redirect('/work');
    } else {

      items.push(item);
      res.redirect('/');
    }
  }

});



//Work Route
app.get("/work", function (req, res) {
  res.render('list', {
    listTitle: "Work",
    newListItems: workItems
  });
});


app.post("/work", function (req, res) {

  let item = req.body.newItem;

  workItems.push(item);
  res.redirect('/work');
});








app.listen(3000, function () {
  console.log("Server started on port 3000.");
});