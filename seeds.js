var mongoose = require("mongoose")
var Campground = require("./models/campground");
var comment = require("./models/comment");
var data = [
  {
    name: "Crystal Camp",
    image: "http://photosforclass.com/download/5012190187",
    description: "blah blah blah"
  },

  {
    name: "Mesa Camp",
    image: "http://photosforclass.com/download/15269411879",
    description: "blah blah blah 2 blah"
  },

  {
    name: "Cloud Camp",
    image: "http://photosforclass.com/download/3061351079",
    description: "blah blah blah 3 blah"
  }

]

function seedDB() {
  Campground.remove({}, function(err){
      if(err) {
        console.log(err);
      }
      console.log("removed all campgrounds.");
      //add a few campgrounds
      data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
          if(err) {
            console.log(err);
          } else {
            console.log("add a campground");
            //create a comments
            Comment.create(
              {
                text: "This place is great",
                author: "Homer"
              }, function(err, comment) {
                if (err) {
                  console.log(err);
                } else {
                  campground.comments.push(comment);
                  campground.save();
                  console.log("Created new comment")
                }
              });
          }
        });
      });
  });
  //add a few comments

}

module.exports = seedDB;
