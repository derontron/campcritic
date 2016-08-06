var express    = require("express"),
    ejs        = require("ejs"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost/campcritic")
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//       {
//         name: "Granite Hill",
//         image: "https://farm4.staticflickr.com/3248/2794463440_a2fbc0b5de.jpg",
//         description: "This is a huge granite hill. No bathrooms. Now water. Beautiful granite."
//       }, function(err, campground) {
//         if(err){
//           console.log(err)
//         } else {
//           console.log("Newly created campground");
//           console.log(campground);
//         }
//       });

var campgrounds = [
  {name: "Salmon Creek", image: "https://farm3.staticflickr.com/2180/2240973954_dc348325c0.jpg"},
  {name: "Granite Hill", image: "https://farm4.staticflickr.com/3248/2794463440_a2fbc0b5de.jpg"},
  {name: "Mountain Goat's Rest", image: "https://farm3.staticflickr.com/2630/4089140779_fc5cd0c694.jpg"},
  {name: "Salmon Creek", image: "https://farm3.staticflickr.com/2180/2240973954_dc348325c0.jpg"},
  {name: "Granite Hill", image: "https://farm4.staticflickr.com/3248/2794463440_a2fbc0b5de.jpg"},
  {name: "Mountain Goat's Rest", image: "https://farm3.staticflickr.com/2630/4089140779_fc5cd0c694.jpg"},
  {name: "Salmon Creek", image: "https://farm3.staticflickr.com/2180/2240973954_dc348325c0.jpg"},
  {name: "Granite Hill", image: "https://farm4.staticflickr.com/3248/2794463440_a2fbc0b5de.jpg"},
  {name: "Mountain Goat's Rest", image: "https://farm3.staticflickr.com/2630/4089140779_fc5cd0c694.jpg"}
];

app.get("/", function(req, res){
  res.render("landing");
});

app.get("/campgrounds", function(req, res){
  // Get all campgrounds
  Campground.find({}, function(err, allCampgrounds){
    if(err) {
      console.log("error");
      console.log(err)
    } else {
      res.render("index", {campgrounds: allCampgrounds});
    }
  });
});

// Show form to create new campground

app.get("/campgrounds/new", function(req, res){
  res.render("new");
});

app.post("/campgrounds", function(req, res){
  //get data from form
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCampGround = {name: name, image: image, description: description};
  Campground.create(newCampGround, function(err, newlyCreated){
    if(err) {
      console.log(err);
    } else {
      // redirect back to campground
      res.redirect("/campgrounds");
    }
  });
});

app.get("/campgrounds/:id", function(req, res){
  // find the campground with provided id
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err) {
      console.log(err);
    } else {
      // render show template with that campground
      res.render("show", {campground: foundCampground});
    }
  });
});

app.listen("5235", "localhost", function(){
  console.log("This server has started");
});
